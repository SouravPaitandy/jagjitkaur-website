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
  FiTrendingDown,
  FiAlertCircle,
  FiSmartphone,
  FiMonitor,
  FiTablet,
  FiGlobe,
  FiActivity,
} from "react-icons/fi";

export default function AnalyticsPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [mounted, setMounted] = useState(false);

  // Fix hydration issues
  useEffect(() => {
    setMounted(true);
    setLastUpdated(new Date());
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
    setIsLoading(true);
    setError(null);

    try {
      // Added timeout to prevent hanging
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);

      const response = await fetch("/api/analytics", {
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON");
      }

      const data = await response.json();

      if (data.error && !data.users) {
        throw new Error(data.error);
      }

      setAnalyticsData({
        ...data,
        isLive: data.isLive !== false && !data.error,
      });
      setLastUpdated(new Date());
    } catch (error) {
      console.error("Failed to fetch analytics:", error);
      setError(error.message);

      try {
        const mockResponse = await fetch("/api/analytics/mock");
        const mockData = await mockResponse.json();
        setAnalyticsData({ ...mockData, isLive: false });
        setLastUpdated(new Date());
        setError(null);
      } catch (mockError) {
        console.error("Failed to fetch mock data:", mockError);
        setError(`Both real and mock APIs failed: ${mockError.message}`);
        setAnalyticsData(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Safely format numbers
  const formatNumber = (value) => {
    if (!value) return "0";
    const num = typeof value === "string" ? parseInt(value.replace(/[^\d]/g, "")) : value;
    return isNaN(num) ? "0" : num.toLocaleString();
  };

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-stone-50 to-stone-100">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-stone-50 to-stone-100">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-stone-600 font-medium">
            Loading Analytics Dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const StatCard = ({ icon: Icon, title, value, change, changeType, color, delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div className={`flex items-center text-sm font-semibold ${
            changeType === "positive" ? "text-green-600" : "text-red-600"
          }`}>
            {changeType === "positive" ? (
              <FiTrendingUp className="w-4 h-4 mr-1" />
            ) : (
              <FiTrendingDown className="w-4 h-4 mr-1" />
            )}
            {change}%
          </div>
        )}
      </div>
      <div>
        <p className="text-sm font-medium text-stone-600 mb-1">
          {title}
        </p>
        <p className="text-3xl font-bold text-stone-900">
          {formatNumber(value)}
        </p>
      </div>
    </motion.div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-xl p-6 shadow-lg mb-8"
        >
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <FiBarChart className="w-8 h-8 text-blue-600" />
                <h1 className="text-3xl font-bold text-stone-900">
                  Analytics Dashboard
                </h1>
                {analyticsData && (
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    analyticsData.isLive
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}>
                    {analyticsData.isLive 
                      ? "🟢 Live Data" 
                      : analyticsData.error 
                        ? "🔴 Error - Demo Data"
                        : "🟡 Demo Data"
                    }
                  </span>
                )}
              </div>
              <p className="text-stone-600">
                Real-time insights into your website performance
              </p>
            </div>

            <div className="flex items-center space-x-4 mt-4 lg:mt-0">
              <button
                onClick={fetchAnalyticsData}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-all duration-200"
              >
                <FiRefreshCw className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`} />
                <span>Refresh</span>
              </button>

              <div className="text-right">
                <p className="text-xs text-stone-500">Last updated</p>
                <p className="text-sm font-medium text-stone-700">
                  {lastUpdated ? lastUpdated.toLocaleTimeString() : 'Never'}
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <h3 className="text-sm font-semibold text-red-800">
                  Analytics Error
                </h3>
                <p className="text-sm text-red-700 mt-1">
                  {error} - Showing fallback data instead.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-blue-600 mx-auto mb-4"></div>
              <p className="text-stone-600 font-medium">
                Loading analytics data...
              </p>
            </div>
          </div>
        ) : analyticsData ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={FiUsers}
                title="Total Users"
                value={analyticsData.users}
                change="12.5"
                changeType="positive"
                color="bg-gradient-to-r from-blue-500 to-blue-600"
                delay={0.1}
              />
              <StatCard
                icon={FiEye}
                title="Page Views"
                value={analyticsData.pageviews}
                change="8.2"
                changeType="positive"
                color="bg-gradient-to-r from-green-500 to-green-600"
                delay={0.2}
              />
              <StatCard
                icon={FiBarChart}
                title="Sessions"
                value={analyticsData.sessions}
                change="5.1"
                changeType="positive"
                color="bg-gradient-to-r from-purple-500 to-purple-600"
                delay={0.3}
              />
              <StatCard
                icon={FiTarget}
                title="Bounce Rate"
                value={`${analyticsData.bounceRate || 0}%`}
                change="3.2"
                changeType="negative"
                color="bg-gradient-to-r from-orange-500 to-orange-600"
                delay={0.4}
              />
            </div>

            {/* Simple Data Tables */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Top Pages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-stone-900">
                    Top Pages
                  </h3>
                  <FiEye className="w-5 h-5 text-stone-500" />
                </div>
                <div className="space-y-3">
                  {analyticsData.topPages && analyticsData.topPages.length > 0 ? (
                    analyticsData.topPages.slice(0, 5).map(([page, views], index) => (
                      <div key={`${page}-${index}`} className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 transition-colors">
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <span className="text-stone-900 font-medium text-sm">
                            {typeof page === 'string' && page.length > 25 
                              ? `${page.substring(0, 25)}...` 
                              : String(page)}
                          </span>
                        </div>
                        <span className="text-stone-900 font-bold">
                          {formatNumber(views)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-stone-500 text-center py-8">
                      No page data available
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Device Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-stone-900">
                    Device Types
                  </h3>
                  <FiSmartphone className="w-5 h-5 text-stone-500" />
                </div>
                <div className="space-y-4">
                  {analyticsData.deviceStats && analyticsData.deviceStats.length > 0 ? (
                    analyticsData.deviceStats.map(([device, sessions], index) => (
                      <div key={`${device}-${index}`} className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {device === "mobile" && <FiSmartphone className="w-4 h-4 text-blue-600" />}
                          {device === "desktop" && <FiMonitor className="w-4 h-4 text-green-600" />}
                          {device === "tablet" && <FiTablet className="w-4 h-4 text-purple-600" />}
                          <span className="text-sm text-stone-700 capitalize">
                            {String(device)}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-stone-900">
                          {formatNumber(sessions)}
                        </span>
                      </div>
                    ))
                  ) : (
                    <p className="text-stone-500 text-center py-8">
                      No device data available
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Recent Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-stone-900">
                    Recent Activity
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">
                      Live
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {analyticsData.recentEvents && analyticsData.recentEvents.length > 0 ? (
                    analyticsData.recentEvents.map((event, index) => (
                      <div key={`event-${index}`} className="flex items-center space-x-3 p-2 hover:bg-stone-50 rounded transition-colors">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <div className="flex-1">
                          <p className="text-sm font-medium text-stone-900">
                            {typeof event.type === 'string' ? event.type.replace('_', ' ').toUpperCase() : 'UNKNOWN EVENT'}
                          </p>
                          <p className="text-xs text-stone-600">
                            {String(event.product || 'Unknown')} - {String(event.time || 'Unknown time')}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-stone-500 text-center py-8">
                      No recent events
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* External Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 }}
              className="bg-white rounded-xl p-6 shadow-lg"
            >
              <h2 className="text-2xl font-bold text-stone-900 mb-6">
                External Analytics Platforms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: "Google Analytics",
                    description: "Detailed traffic insights",
                    url: "https://analytics.google.com/",
                    icon: FiBarChart,
                  },
                  {
                    name: "Google Search Console", 
                    description: "SEO performance data",
                    url: "https://search.google.com/search-console",
                    icon: FiGlobe,
                  },
                  {
                    name: "Tag Manager",
                    description: "Manage tracking tags",
                    url: "https://tagmanager.google.com/",
                    icon: FiTarget,
                  },
                  {
                    name: "Hotjar",
                    description: "User behavior insights",
                    url: "https://insights.hotjar.com/",
                    icon: FiActivity,
                  },
                ].map((platform, index) => (
                  <a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-4 border border-stone-200 rounded-lg hover:shadow-lg transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <platform.icon className="w-6 h-6 text-blue-600" />
                      <span className="text-xs text-stone-500 opacity-0 group-hover:opacity-100 transition-opacity">
                        External Link
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-900 mb-1">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-stone-600">
                      {platform.description}
                    </p>
                  </a>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          <div className="text-center py-20">
            <FiBarChart className="w-24 h-24 text-stone-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-stone-900 mb-4">
              Unable to Load Analytics
            </h3>
            <p className="text-stone-600 mb-8 max-w-md mx-auto">
              There was an issue fetching your analytics data. Please try again.
            </p>
            <button
              onClick={fetchAnalyticsData}
              className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 font-medium"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
