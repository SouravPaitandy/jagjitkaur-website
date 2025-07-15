"use client";
import { useState } from "react";
import { auth } from "@/lib/firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const login = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    try {
      await signInWithEmailAndPassword(auth, email, password);
      router.push("/admin/dashboard");
    } catch (err) {
      setError("Invalid credentials. Please try again.");
    }
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-4">
      <div className="absolute inset-0 opacity-5 dark:opacity-10">
        <div className="absolute inset-0 bg-stone-400 dark:bg-stone-600"></div>
      </div>
      
      <div className="relative w-full max-w-md">
        <div className="bg-white dark:bg-stone-800 rounded-lg shadow-2xl p-8 border border-stone-200 dark:border-stone-700">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-stone-700 dark:bg-stone-300 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-white dark:text-stone-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="font-fira-sans text-3xl font-bold text-stone-900 dark:text-white mb-2">
              Admin Portal
            </h1>
            <p className="text-stone-600 dark:text-stone-300">
              Welcome back to Jagjit Kaur Admin
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={login} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
                <input
                  type="email"
                  placeholder="admin@jagjitkaur.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 dark:border-stone-600 rounded-md bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:ring-4 focus:ring-stone-300/30 dark:focus:ring-stone-500/30 focus:border-stone-400 dark:focus:border-stone-500 transition-all duration-300"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-stone-700 dark:text-stone-300 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="w-5 h-5 text-stone-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-stone-300 dark:border-stone-600 rounded-md bg-stone-50 dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:ring-4 focus:ring-stone-300/30 dark:focus:ring-stone-500/30 focus:border-stone-400 dark:focus:border-stone-500 transition-all duration-300"
                  required
                />
              </div>
            </div>

            {error && (
              <div className="bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-md p-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="text-red-600 dark:text-red-400 text-sm font-medium">{error}</p>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="cursor-pointer w-full bg-stone-700 dark:bg-stone-300 hover:bg-stone-800 dark:hover:bg-stone-200 disabled:bg-stone-400 disabled:dark:bg-stone-500 text-white dark:text-stone-900 font-semibold py-3 px-6 rounded-md transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white dark:text-stone-900" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing In...
                </>
              ) : (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1" />
                  </svg>
                  Sign In to Admin Panel
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-8 text-center">
            <p className="text-stone-500 dark:text-stone-400 text-sm">
              Protected by Jagjit Kaur & Firebase Security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}