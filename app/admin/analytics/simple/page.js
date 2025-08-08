"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiBarChart,
  FiUsers,
  FiEye,
  FiTarget,
  FiRefreshCw,
  FiTrendingUp,
  FiAlertCircle,
} from "react-icons/fi";

export default function SimpleAnalyticsPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user && mounted) {
      fetchAnalyticsData();
    }
  }, [user, mounted]);

  const fetchAnalyticsData = async () => {
    if (!mounted) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/analytics/mock");
      const data = await response.json();
      setAnalyticsData(data);
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  if (!mounted || loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-stone-50 to-stone-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-lg mb-8">
          <div className="flex items-center space-x-3">
            <FiBarChart className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
              Analytics Dashboard (Simple)
            </h1>
            <button
              onClick={fetchAnalyticsData}
              disabled={isLoading}
              className="ml-auto flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-all duration-200"
            >
              <FiRefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6">
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <p className="text-red-700">{error}</p>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-blue-600"></div>
          </div>
        ) : analyticsData ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Simple Stat Cards */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <FiUsers className="w-8 h-8 text-blue-600" />
                <FiTrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-stone-700 mb-1">Total Users</h3>
              <p className="text-3xl font-bold text-stone-900">
                {analyticsData.users || '0'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <FiEye className="w-8 h-8 text-green-600" />
                <FiTrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-stone-700 mb-1">Page Views</h3>
              <p className="text-3xl font-bold text-stone-900">
                {analyticsData.pageviews || '0'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <FiBarChart className="w-8 h-8 text-purple-600" />
                <FiTrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-stone-700 mb-1">Sessions</h3>
              <p className="text-3xl font-bold text-stone-900">
                {analyticsData.sessions || '0'}
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <FiTarget className="w-8 h-8 text-orange-600" />
                <FiTrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-stone-700 mb-1">Bounce Rate</h3>
              <p className="text-3xl font-bold text-stone-900">
                {analyticsData.bounceRate || '0'}%
              </p>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-stone-600">No analytics data available</p>
          </div>
        )}
      </div>
    </div>
  );
}