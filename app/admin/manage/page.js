"use client";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import AdminManagement from "@/components/AdminManagement";
import {Loading} from "@/components/Loading";

export default function AdminManagePage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <Loading type="page" message="Loading admin panel..." />;
  }

  if (!user) {
    return null;
  }

  // Check if user is super admin
  if (user.email !== process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
    return (
      <div className="min-h-screen bg-stone-50 dark:bg-stone-900 flex items-center justify-center p-4">
        <div className="bg-white dark:bg-stone-800 p-8 rounded-lg shadow-xl text-center">
          <h1 className="text-xl font-bold text-stone-900 dark:text-white mb-4">
            Access Denied
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            You don't have permission to access admin management.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="container mx-auto px-4 py-8">
        <AdminManagement />
      </div>
    </div>
  );
}