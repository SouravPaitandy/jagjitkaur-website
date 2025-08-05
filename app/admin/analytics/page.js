"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FiBarChart, FiUsers, FiEye, FiShoppingCart, FiHeart } from "react-icons/fi";

export default function AnalyticsPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>;
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-8">
          Analytics Dashboard
        </h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700">
            <div className="flex items-center">
              <FiUsers className="w-8 h-8 text-blue-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Total Visitors</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">Coming Soon</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700">
            <div className="flex items-center">
              <FiEye className="w-8 h-8 text-green-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Page Views</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">Coming Soon</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700">
            <div className="flex items-center">
              <FiShoppingCart className="w-8 h-8 text-orange-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Add to Cart</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">Coming Soon</p>
              </div>
            </div>
          </div>
          
          <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700">
            <div className="flex items-center">
              <FiHeart className="w-8 h-8 text-red-500 mr-3" />
              <div>
                <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Wishlist Adds</p>
                <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700">
          <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-4">
            External Analytics Links
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <a
              href="https://analytics.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <FiBarChart className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-semibold text-blue-600">Google Analytics</p>
            </a>
            
            <a
              href="https://www.facebook.com/analytics/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <FiBarChart className="w-6 h-6 text-blue-600 mb-2" />
              <p className="font-semibold text-blue-600">Meta Business</p>
            </a>
            
            <a
              href="https://tagmanager.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors"
            >
              <FiBarChart className="w-6 h-6 text-green-600 mb-2" />
              <p className="font-semibold text-green-600">Tag Manager</p>
            </a>
            
            <a
              href="https://insights.hotjar.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-colors"
            >
              <FiBarChart className="w-6 h-6 text-orange-600 mb-2" />
              <p className="font-semibold text-orange-600">Hotjar</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}