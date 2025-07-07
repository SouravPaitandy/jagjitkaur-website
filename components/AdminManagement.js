"use client";
import { React, useState, useEffect } from "react";
import { auth, db } from "@/lib/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  query,
  where,
  setDoc,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import {
  FiPlus,
  FiTrash2,
  FiUser,
  FiMail,
  FiKey,
  FiShield,
  FiEye,
  FiEyeOff,
  FiAlertTriangle,
  FiSend,
  FiCopy,
} from "react-icons/fi";
import { generateEmailContent } from "@/utils/adminUtils";

export default function AdminManagement() {
  const [user] = useAuthState(auth);
  const [isLoading, setIsLoading] = useState(false);
  const [admins, setAdmins] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [showPasswords, setShowPasswords] = useState({});
  const [showCredentials, setShowCredentials] = useState(null);
  const [superAdminCredentials, setSuperAdminCredentials] = useState({
    email: "",
    password: "",
  });
  const [showSuperAdminPrompt, setShowSuperAdminPrompt] = useState(false);
  const [showEmailSentModal, setShowEmailSentModal] = useState(false);
  const [newAdmin, setNewAdmin] = useState({
    email: "",
    password: "",
    name: "",
    role: "admin",
  });

  // Generate secure password
  const generatePassword = () => {
    const length = 12;
    const charset =
      "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*";
    let password = "";
    for (let i = 0; i < length; i++) {
      password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setNewAdmin((prev) => ({ ...prev, password }));
  };

  // Copy credentials to clipboard
  const copyCredentials = async (email, password) => {
    const credentials = `Email: ${email}\nPassword: ${password}`;
    try {
      await navigator.clipboard.writeText(credentials);
      alert("Credentials copied to clipboard!");
    } catch (err) {
      console.error("Failed to copy credentials:", err);
      alert("Failed to copy credentials. Please copy manually.");
    }
  };

  // Send email with credentials
  const sendCredentialsEmail = (adminName, adminEmail, adminPassword) => {
    const { subject, body } = generateEmailContent(
      adminName,
      adminEmail,
      adminPassword
    );
    const mailtoLink = `mailto:${adminEmail}?subject=${subject}&body=${body}`;
    window.open(mailtoLink);
  };

  // Fetch all admins from Firestore
  const fetchAdmins = async () => {
    try {
      const adminsCollection = collection(db, "admins");
      const snapshot = await getDocs(adminsCollection);
      const adminsList = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setAdmins(adminsList);
    } catch (error) {
      console.error("Error fetching admins:", error);
    }
  };

  // Handle create admin form submission - STEP 1: Send email first
 const handleCreateAdmin = (e) => {
  e.preventDefault();
  
  try {
    const emailContent = generateEmailContent(
      newAdmin.name,
      newAdmin.email,
      newAdmin.password
    );
    
    const subject = encodeURIComponent(emailContent.subject);
    const body = encodeURIComponent(emailContent.body);
    const mailtoLink = `mailto:${newAdmin.email}?subject=${subject}&body=${body}`;
    
    // Use window.location.href instead of window.open
    window.location.href = mailtoLink;
    
    // Small delay then show modal
    setTimeout(() => {
      setShowEmailSentModal(true);
    }, 100);
    
  } catch (error) {
    console.error("Error in handleCreateAdmin:", error);
    alert("Failed to open email client. Please copy the credentials manually.");
    // Still show the modal so user can copy credentials
    setShowEmailSentModal(true);
  }
};

  // Continue to super admin prompt after email is sent
  const continueToSuperAdminPrompt = () => {
    setShowEmailSentModal(false);
    setShowSuperAdminPrompt(true);
  };

  // Create new admin with re-authentication - STEP 2: Create admin
  const createAdmin = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Store values before async operations
    const adminData = {
      name: newAdmin.name,
      email: newAdmin.email,
      password: newAdmin.password,
      role: newAdmin.role,
    };

    const superAdminEmail = superAdminCredentials.email;
    const superAdminPassword = superAdminCredentials.password;
    const currentAdminEmail = user.email;

    try {
      // Create Firebase Auth user (this will automatically sign them in and sign out current user)
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        adminData.email,
        adminData.password
      );

      const newUserUid = userCredential.user.uid;

      // Store admin details in Firestore while new user is signed in
      await setDoc(doc(db, "admins", newUserUid), {
        email: adminData.email,
        name: adminData.name,
        role: adminData.role,
        createdBy: currentAdminEmail,
        createdAt: new Date().toISOString(),
        uid: newUserUid,
        isActive: true,
        passwordChangedAt: null,
      });

      // Sign out the newly created admin
      await signOut(auth);

      // Wait a moment for signOut to complete
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Re-authenticate the super admin
      await signInWithEmailAndPassword(
        auth,
        superAdminEmail,
        superAdminPassword
      );

      // Show success modal with credentials (email already sent)
      setShowCredentials({
        name: adminData.name,
        email: adminData.email,
        password: adminData.password,
        emailSent: true, // Flag to indicate email was already sent
      });

      // Reset forms
      setNewAdmin({ email: "", password: "", name: "", role: "admin" });
      setSuperAdminCredentials({ email: "", password: "" });
      setShowSuperAdminPrompt(false);

      // Refresh admin list
      await fetchAdmins();
    } catch (error) {
      console.error("Error creating admin:", error);

      // Show user-friendly error message
      let errorMessage = "Failed to create admin account. ";
      if (error.code === "auth/email-already-in-use") {
        errorMessage += "This email is already registered.";
      } else if (error.code === "auth/weak-password") {
        errorMessage += "Password is too weak.";
      } else if (error.code === "auth/invalid-email") {
        errorMessage += "Invalid email address.";
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/user-not-found"
      ) {
        errorMessage += "Invalid super admin credentials.";
      } else {
        errorMessage += error.message;
      }
      alert(errorMessage);

      // Try to re-authenticate super admin if we have credentials
      if (superAdminEmail && superAdminPassword) {
        try {
          await signOut(auth); // Make sure we're signed out first
          await new Promise((resolve) => setTimeout(resolve, 500));
          await signInWithEmailAndPassword(
            auth,
            superAdminEmail,
            superAdminPassword
          );
        } catch (reAuthError) {
          console.error("Failed to re-authenticate super admin:", reAuthError);
          alert(
            "Authentication error. Please refresh the page and log in again."
          );
          window.location.href = "/admin/login";
        }
      }
    }

    setIsLoading(false);
  };

  // Cancel super admin prompt
  const cancelSuperAdminPrompt = () => {
    setShowSuperAdminPrompt(false);
    setSuperAdminCredentials({ email: "", password: "" });
  };

  // Cancel email sent modal
  const cancelEmailSentModal = () => {
    setShowEmailSentModal(false);
  };

  // Delete admin
  const deleteAdmin = async (adminId, adminEmail) => {
    if (!confirm(`Are you sure you want to delete admin: ${adminEmail}?`)) {
      return;
    }

    try {
      await deleteDoc(doc(db, "admins", adminId));
      alert("Admin deleted successfully!");
      fetchAdmins();
    } catch (error) {
      console.error("Error deleting admin:", error);
      alert("Error deleting admin: " + error.message);
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (adminId) => {
    setShowPasswords((prev) => ({
      ...prev,
      [adminId]: !prev[adminId],
    }));
  };

  // Close credentials modal and form
  const closeCredentialsModal = () => {
    setShowCredentials(null);
    setShowForm(false);
  };

  // Load admins on component mount
  useEffect(() => {
    fetchAdmins();
  }, []);

  // Check if current user is super admin
  const isSuperAdmin = user?.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  if (!isSuperAdmin) {
    return (
      <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg p-6 text-center">
        <FiShield className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <h3 className="text-lg font-semibold text-red-700 dark:text-red-300 mb-2">
          Access Restricted
        </h3>
        <p className="text-red-600 dark:text-red-400">
          Only the super administrator can manage admin accounts.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-stone-900 dark:text-white font-fira-sans">
            Admin Management
          </h2>
          <p className="text-stone-600 dark:text-stone-400 mt-1">
            Create and manage administrator accounts
          </p>
        </div>
        <button
          onClick={() => setShowForm(!showForm)}
          className="inline-flex items-center px-4 py-2 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
        >
          <FiPlus className="w-4 h-4 mr-2" />
          Add New Admin
        </button>
      </div>

      {/* Email Sent Confirmation Modal */}
      {showEmailSentModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiSend className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
                Email Sent!
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm">
                Credentials email has been sent to {newAdmin.email}. You can
                also copy the credentials below.
              </p>
            </div>

            {/* Show credentials for copying */}
            <div className="bg-stone-50 dark:bg-stone-700 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-stone-900 dark:text-white mb-3 flex items-center">
                <FiKey className="w-4 h-4 mr-2" />
                Login Credentials
              </h4>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Email:
                  </span>
                  <span className="text-stone-900 dark:text-white font-medium">
                    {newAdmin.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Password:
                  </span>
                  <span className="text-stone-900 dark:text-white font-medium">
                    {newAdmin.password}
                  </span>
                </div>
              </div>

              {/* Copy button */}
              <button
                onClick={() =>
                  copyCredentials(newAdmin.email, newAdmin.password)
                }
                className="w-full mt-3 inline-flex items-center justify-center px-4 py-2 bg-stone-600 hover:bg-stone-700 text-white rounded-md transition-colors"
              >
                <FiCopy className="w-4 h-4 mr-2" />
                Copy Credentials
              </button>
            </div>

            <div className="flex space-x-3">
              <button
                onClick={continueToSuperAdminPrompt}
                className="flex-1 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 py-2 px-4 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
              >
                Continue Creating Admin
              </button>
              <button
                onClick={cancelEmailSentModal}
                className="px-4 py-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-md hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Super Admin Password Prompt Modal */}
      {showSuperAdminPrompt && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 p-6 max-w-md w-full">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiKey className="w-8 h-8 text-amber-600 dark:text-amber-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
                Confirm Super Admin Identity
              </h3>
              <p className="text-stone-600 dark:text-stone-400 text-sm">
                Creating a new admin will temporarily log you out. Please enter
                your credentials to continue.
              </p>
            </div>

            <form onSubmit={createAdmin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Your Email
                </label>
                <div className="relative">
                  <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                  <input
                    type="email"
                    value={superAdminCredentials.email}
                    onChange={(e) =>
                      setSuperAdminCredentials((prev) => ({
                        ...prev,
                        email: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-2 border border-stone-300 dark:border-stone-600 rounded-md bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                    placeholder="Enter your admin email"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Your Password
                </label>
                <div className="relative">
                  <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                  <input
                    type="password"
                    value={superAdminCredentials.password}
                    onChange={(e) =>
                      setSuperAdminCredentials((prev) => ({
                        ...prev,
                        password: e.target.value,
                      }))
                    }
                    className="w-full pl-10 pr-4 py-2 border border-stone-300 dark:border-stone-600 rounded-md bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                    placeholder="Enter your admin password"
                    required
                  />
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 py-2 px-4 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? "Creating Admin..." : "Create Admin"}
                </button>
                <button
                  type="button"
                  onClick={cancelSuperAdminPrompt}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-md hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>

            <div className="mt-4 p-3 bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-md">
              <p className="text-xs text-blue-600 dark:text-blue-400">
                <strong>Why this is needed:</strong> Creating a new admin
                automatically logs in the new user. We need your credentials to
                log you back in after the process completes.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Credentials Success Modal */}
      {showCredentials && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <FiUser className="w-8 h-8 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-xl font-bold text-stone-900 dark:text-white mb-2">
                Admin Created Successfully!
              </h3>
              <p className="text-stone-600 dark:text-stone-400">
                New administrator "{showCredentials.name}" has been created.
              </p>
              {showCredentials.emailSent && (
                <p className="text-green-600 dark:text-green-400 text-sm mt-2">
                  ✅ Email with credentials has been sent to the admin.
                </p>
              )}
            </div>

            {/* Credentials Display */}
            <div className="bg-stone-50 dark:bg-stone-700 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-stone-900 dark:text-white mb-3 flex items-center">
                <FiKey className="w-4 h-4 mr-2" />
                Login Credentials
              </h4>
              <div className="space-y-2 font-mono text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Email:
                  </span>
                  <span className="text-stone-900 dark:text-white font-medium">
                    {showCredentials.email}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-stone-600 dark:text-stone-400">
                    Password:
                  </span>
                  <span className="text-stone-900 dark:text-white font-medium">
                    {showCredentials.password}
                  </span>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3">
              <div className="flex space-x-3">
                {/* Show different button text if email was already sent */}
                <button
                  onClick={() =>
                    sendCredentialsEmail(
                      showCredentials.name,
                      showCredentials.email,
                      showCredentials.password
                    )
                  }
                  className="flex-1 inline-flex items-center justify-center px-4 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
                >
                  <FiSend className="w-4 h-4 mr-2" />
                  {showCredentials.emailSent
                    ? "Send Email Again"
                    : "Send Email with Credentials"}
                </button>

                <button
                  onClick={() =>
                    copyCredentials(
                      showCredentials.email,
                      showCredentials.password
                    )
                  }
                  className="px-4 py-3 bg-stone-600 hover:bg-stone-700 text-white rounded-md transition-colors"
                  title="Copy credentials"
                >
                  <FiCopy className="w-4 h-4" />
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={closeCredentialsModal}
                  className="px-6 py-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-md hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  Done
                </button>
              </div>
            </div>

            {/* Updated Security Warning */}
            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-md">
              <div className="flex items-start">
                <FiAlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                <div>
                  <h5 className="text-sm font-medium text-amber-700 dark:text-amber-300 mb-1">
                    Security Reminder
                  </h5>
                  <p className="text-xs text-amber-600 dark:text-amber-400">
                    {showCredentials.emailSent
                      ? "Email has been sent to the admin. Make sure they received it and instruct them to change their password after first login."
                      : "Make sure to share these credentials through secure channels only. Instruct the new admin to change their password immediately after first login."}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Create Admin Form */}
      {showForm &&
        !showCredentials &&
        !showSuperAdminPrompt &&
        !showEmailSentModal && (
          <div className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700 p-6">
            <h3 className="text-lg font-semibold text-stone-900 dark:text-white mb-4">
              Create New Administrator
            </h3>

            <form onSubmit={handleCreateAdmin} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <FiUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                    <input
                      type="text"
                      value={newAdmin.name}
                      onChange={(e) =>
                        setNewAdmin((prev) => ({
                          ...prev,
                          name: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-4 py-2 border border-stone-300 dark:border-stone-600 rounded-md bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                      placeholder="Enter full name"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <FiMail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                    <input
                      type="email"
                      value={newAdmin.email}
                      onChange={(e) =>
                        setNewAdmin((prev) => ({
                          ...prev,
                          email: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-4 py-2 border border-stone-300 dark:border-stone-600 rounded-md bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-stone-500 focus:border-stone-500"
                      placeholder="admin@example.com"
                      required
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-stone-700 dark:text-stone-300 mb-2">
                  Password
                </label>
                <div className="flex space-x-2">
                  <div className="relative flex-1">
                    <FiKey className="absolute left-3 top-1/2 transform -translate-y-1/2 text-stone-400 w-4 h-4" />
                    <input
                      type="text"
                      value={newAdmin.password}
                      onChange={(e) =>
                        setNewAdmin((prev) => ({
                          ...prev,
                          password: e.target.value,
                        }))
                      }
                      className="w-full pl-10 pr-4 py-2 border border-stone-300 dark:border-stone-600 rounded-md bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white focus:ring-2 focus:ring-stone-500 focus:border-stone-500 font-mono"
                      placeholder="Enter password"
                      required
                    />
                  </div>
                  <button
                    type="button"
                    onClick={generatePassword}
                    className="px-4 py-2 bg-stone-600 text-white rounded-md hover:bg-stone-700 transition-colors"
                  >
                    Generate
                  </button>
                </div>
              </div>

              <div className="flex space-x-3 pt-4">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex-1 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 py-2 px-4 rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 disabled:opacity-50 transition-colors"
                >
                  {isLoading ? "Creating..." : "Send Email & Create Admin"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-md hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
                >
                  Cancel
                </button>
              </div>
            </form>

            {/* Warning about logout */}
            <div className="mt-4 p-3 bg-amber-50 dark:bg-amber-900/30 border border-amber-200 dark:border-amber-800 rounded-md">
              <div className="flex items-start">
                <FiAlertTriangle className="w-4 h-4 text-amber-600 dark:text-amber-400 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-xs text-amber-600 dark:text-amber-400">
                  <strong>Process:</strong> First, email will be sent to the
                  admin, then you'll be prompted for your credentials to create
                  the account.
                </p>
              </div>
            </div>
          </div>
        )}

      {/* ...rest of existing code... */}
      {/* Admins List */}
      <div className="bg-white dark:bg-stone-800 rounded-lg border border-stone-200 dark:border-stone-700">
        <div className="p-6 border-b border-stone-200 dark:border-stone-700">
          <h3 className="text-lg font-semibold text-stone-900 dark:text-white">
            Current Administrators ({admins.length})
          </h3>
        </div>

        <div className="divide-y divide-stone-200 dark:divide-stone-700">
          {admins.map((admin) => (
            <div
              key={admin.id}
              className="p-6 flex items-center justify-between"
            >
              <div className="flex-1">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center">
                    <FiUser className="w-5 h-5 text-stone-600 dark:text-stone-400" />
                  </div>
                  <div>
                    <h4 className="font-medium text-stone-900 dark:text-white">
                      {admin.name}
                    </h4>
                    <p className="text-sm text-stone-600 dark:text-stone-400">
                      {admin.email}
                    </p>
                    <div className="flex items-center space-x-4 mt-1">
                      <p className="text-xs text-stone-500 dark:text-stone-500">
                        Created by {admin.createdBy} •{" "}
                        {new Date(admin.createdAt).toLocaleDateString()}
                      </p>

                      {/* Password Status */}
                      {admin.passwordChangedAt ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                          <FiKey className="w-3 h-3 mr-1" />
                          Password Updated
                        </span>
                      ) : (
                        <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-300">
                          <FiAlertTriangle className="w-3 h-3 mr-1" />
                          Default Password
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300">
                  {admin.role}
                </span>

                {admin.email !== user?.email && (
                  <button
                    onClick={() => deleteAdmin(admin.id, admin.email)}
                    className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors"
                    title="Delete admin"
                  >
                    <FiTrash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {admins.length === 0 && (
            <div className="p-8 text-center text-stone-500 dark:text-stone-400">
              No administrators found. Create the first admin account.
            </div>
          )}
        </div>
      </div>

      {/* Security Guidelines */}
      <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
        <h4 className="font-semibold text-blue-700 dark:text-blue-300 mb-2">
          Security Guidelines for New Admins
        </h4>
        <ul className="text-sm text-blue-600 dark:text-blue-400 space-y-1">
          <li>
            • Share credentials through secure channels (encrypted email,
            Signal, etc.)
          </li>
          <li>
            • Instruct new admins to change their password immediately after
            first login
          </li>
          <li>• Passwords should be unique and not used for other accounts</li>
          <li>
            • Monitor admin activity and remove access when no longer needed
          </li>
        </ul>
      </div>
    </div>
  );
}
