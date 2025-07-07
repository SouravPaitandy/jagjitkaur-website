"use client";
import { useState } from "react";
import { auth, db } from "@/lib/firebase";
import { updatePassword, reauthenticateWithCredential, EmailAuthProvider } from "firebase/auth";
import { doc, updateDoc, setDoc, getDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { FiKey, FiEye, FiEyeOff, FiCheck, FiX, FiLock } from "react-icons/fi";

export default function ChangePassword() {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false
  });
  const [passwords, setPasswords] = useState({
    current: "",
    new: "",
    confirm: ""
  });
  const [errors, setErrors] = useState({});
  const [success, setSuccess] = useState(false);

  // Password validation
  const validatePassword = (password) => {
    const minLength = 8;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    return {
      minLength: password.length >= minLength,
      hasUpperCase,
      hasLowerCase,
      hasNumbers,
      hasSpecialChar,
      isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers && hasSpecialChar
    };
  };

  const passwordValidation = validatePassword(passwords.new);

  // Toggle password visibility
  const togglePasswordVisibility = (field) => {
    setShowPasswords(prev => ({
      ...prev,
      [field]: !prev[field]
    }));
  };

  // Handle input change
  const handleInputChange = (field, value) => {
    setPasswords(prev => ({ ...prev, [field]: value }));
    setErrors({});
    setSuccess(false);
  };

  // Change password - FIXED VERSION
  const changePassword = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate inputs
      if (!passwords.current) {
        throw new Error("Please enter your current password");
      }

      if (!passwordValidation.isValid) {
        throw new Error("New password doesn't meet security requirements");
      }

      if (passwords.new !== passwords.confirm) {
        throw new Error("New passwords don't match");
      }

      if (passwords.current === passwords.new) {
        throw new Error("New password must be different from current password");
      }

      // Reauthenticate user with current password
      const credential = EmailAuthProvider.credential(user.email, passwords.current);
      await reauthenticateWithCredential(user, credential);

      // Update password in Firebase Auth
      await updatePassword(user, passwords.new);

      // Ensure admin document exists and update password change timestamp
      const adminDocRef = doc(db, "admins", user.uid);
      
      try {
        // Check if document exists
        const adminDoc = await getDoc(adminDocRef);
        
        if (adminDoc.exists()) {
          // Update existing document
          await updateDoc(adminDocRef, {
            passwordChangedAt: new Date().toISOString(),
            lastPasswordChangeBy: user.email
          });
        } else {
          // Create new document if it doesn't exist
          await setDoc(adminDocRef, {
            email: user.email,
            name: user.displayName || user.email.split('@')[0],
            role: "admin",
            createdBy: "self-registration",
            createdAt: new Date().toISOString(),
            uid: user.uid,
            isActive: true,
            passwordChangedAt: new Date().toISOString(),
            lastPasswordChangeBy: user.email
          });
        }
      } catch (firestoreError) {
        console.warn("Couldn't update Firestore document, but password was changed:", firestoreError);
        // Don't throw error here since password was successfully changed
      }

      setSuccess(true);
      setPasswords({ current: "", new: "", confirm: "" });
      
      // Show success message
      setTimeout(() => {
        setSuccess(false);
      }, 5000);

    } catch (error) {
      console.error("Error changing password:", error);
      if (error.code === "auth/wrong-password") {
        setErrors({ current: "Current password is incorrect" });
      } else if (error.code === "auth/weak-password") {
        setErrors({ new: "Password is too weak" });
      } else {
        setErrors({ general: error.message });
      }
    }

    setIsLoading(false);
  };

  // Generate secure password suggestion
  const generateSecurePassword = () => {
    const length = 12;
    const charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    
    // Ensure at least one character from each required type
    password += "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[Math.floor(Math.random() * 26)]; // Uppercase
    password += "abcdefghijklmnopqrstuvwxyz"[Math.floor(Math.random() * 26)]; // Lowercase
    password += "0123456789"[Math.floor(Math.random() * 10)]; // Number
    password += "!@#$%^&*"[Math.floor(Math.random() * 8)]; // Special char
    
    // Fill the rest randomly
    for (let i = 4; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    // Shuffle the password
    password = password.split('').sort(() => Math.random() - 0.5).join('');
    
    setPasswords(prev => ({ ...prev, new: password, confirm: password }));
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 p-6">
        {/* Header */}
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mr-4">
            <FiLock className="w-6 h-6 text-stone-600 dark:text-stone-400" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-stone-900 dark:text-white font-fira-sans">
              Change Password
            </h2>
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              Update your account password for better security
            </p>
          </div>
        </div>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 dark:bg-green-900/30 border border-green-200 dark:border-green-800 rounded-md">
            <div className="flex items-center">
              <FiCheck className="w-5 h-5 text-green-600 dark:text-green-400 mr-2" />
              <span className="text-green-700 dark:text-green-300 font-medium">
                Password changed successfully!
              </span>
            </div>
          </div>
        )}

        {/* General Error */}
        {errors.general && (
          <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md">
            <div className="flex items-center">
              <FiX className="w-5 h-5 text-red-600 dark:text-red-400 mr-2" />
              <span className="text-red-700 dark:text-red-300">{errors.general}</span>
            </div>
          </div>
        )}

        {/* Form */}
        <form onSubmit={changePassword} className="space-y-6">
          {/* Current Password */}
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Current Password
            </label>
            <div className="relative">
              <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type={showPasswords.current ? "text" : "password"}
                value={passwords.current}
                onChange={(e) => handleInputChange("current", e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border rounded-md bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-stone-500 focus:border-stone-500 ${
                  errors.current ? "border-red-300 dark:border-red-600" : "border-stone-300 dark:border-stone-600"
                }`}
                placeholder="Enter your current password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("current")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              >
                {showPasswords.current ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
            {errors.current && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.current}</p>
            )}
          </div>

          {/* New Password */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
                New Password
              </label>
              <button
                type="button"
                onClick={generateSecurePassword}
                className="text-xs text-stone-600 dark:text-stone-400 hover:text-stone-700 dark:hover:text-stone-300 underline"
              >
                Generate Secure Password
              </button>
            </div>
            <div className="relative">
              <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type={showPasswords.new ? "text" : "password"}
                value={passwords.new}
                onChange={(e) => handleInputChange("new", e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border rounded-md bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-stone-500 focus:border-stone-500 ${
                  errors.new ? "border-red-300 dark:border-red-600" : "border-stone-300 dark:border-stone-600"
                }`}
                placeholder="Enter your new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("new")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              >
                {showPasswords.new ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
            {errors.new && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.new}</p>
            )}

            {/* Password Requirements */}
            {passwords.new && (
              <div className="mt-3 p-3 bg-stone-50 dark:bg-stone-700 rounded-md">
                <p className="text-xs font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Password Requirements:
                </p>
                <div className="space-y-1">
                  {[
                    { key: "minLength", text: "At least 8 characters" },
                    { key: "hasUpperCase", text: "One uppercase letter" },
                    { key: "hasLowerCase", text: "One lowercase letter" },
                    { key: "hasNumbers", text: "One number" },
                    { key: "hasSpecialChar", text: "One special character (!@#$%^&*)" }
                  ].map(req => (
                    <div key={req.key} className="flex items-center text-xs">
                      {passwordValidation[req.key] ? (
                        <FiCheck className="w-3 h-3 text-green-600 dark:text-green-400 mr-2" />
                      ) : (
                        <FiX className="w-3 h-3 text-red-600 dark:text-red-400 mr-2" />
                      )}
                      <span className={passwordValidation[req.key] ? "text-green-700 dark:text-green-300" : "text-red-700 dark:text-red-300"}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
              Confirm New Password
            </label>
            <div className="relative">
              <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
              <input
                type={showPasswords.confirm ? "text" : "password"}
                value={passwords.confirm}
                onChange={(e) => handleInputChange("confirm", e.target.value)}
                className={`w-full pl-10 pr-12 py-3 border rounded-md bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-stone-500 focus:border-stone-500 ${
                  passwords.new && passwords.confirm && passwords.new !== passwords.confirm 
                    ? "border-red-300 dark:border-red-600" 
                    : "border-stone-300 dark:border-stone-600"
                }`}
                placeholder="Confirm your new password"
                required
              />
              <button
                type="button"
                onClick={() => togglePasswordVisibility("confirm")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300"
              >
                {showPasswords.confirm ? <FiEyeOff className="w-4 h-4" /> : <FiEye className="w-4 h-4" />}
              </button>
            </div>
            {passwords.new && passwords.confirm && passwords.new !== passwords.confirm && (
              <p className="mt-1 text-sm text-red-600 dark:text-red-400">Passwords don't match</p>
            )}
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button
              type="submit"
              disabled={isLoading || !passwordValidation.isValid || passwords.new !== passwords.confirm}
              className="w-full bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 py-3 px-4 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors font-medium"
            >
              {isLoading ? "Changing Password..." : "Change Password"}
            </button>
          </div>
        </form>

        {/* Security Note */}
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md">
          <div className="flex items-start">
            <FiLock className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0" />
            <div>
              <h4 className="text-sm font-medium text-blue-700 dark:text-blue-300 mb-1">
                Security Recommendation
              </h4>
              <p className="text-xs text-blue-600 dark:text-blue-400">
                For maximum security, change your password immediately after receiving your initial credentials. 
                Use a unique password that you don't use for any other accounts.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}