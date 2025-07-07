"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import ChangePassword from "@/components/ChangePassword";
import {Loading} from "@/components/Loading";
import Link from "next/link";
import { FiArrowLeft } from "react-icons/fi";

export default function ChangePasswordPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading type="page" message="Loading..." />;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      {/* Header */}
      <div className="bg-white dark:bg-stone-800 border-b border-stone-200 dark:border-stone-700">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-4">
            <Link
              href="/admin/upload"
              className="p-2 text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-md transition-colors"
            >
              <FiArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-xl font-bold text-stone-900 dark:text-white font-fira-sans">
                Account Security
              </h1>
              <p className="text-stone-600 dark:text-stone-400">
                Manage your password and security settings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <ChangePassword />
      </div>
    </div>
  );
}