"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiBarChart, FiUsers, FiEye, FiShoppingCart, FiHeart, FiRefreshCw, FiExternalLink } from "react-icons/fi";

export default function AnalyticsPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(new Date());

  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) {
      fetchAnalyticsData();
    }
  }, [user]);

  const fetchAnalyticsData = async () => {
    setIsLoading(true);
    try {
      // Try real API first, fallback to mock if it fails
      const response = await fetch('/api/analytics');
      const data = await response.json();
      
      if (data.error) {
        // Fallback to mock data if real API fails
        const mockResponse = await fetch('/api/analytics/mock');
        const mockData = await mockResponse.json();
        setAnalyticsData({ ...mockData, isLive: false });
      } else {
        setAnalyticsData({ ...data, isLive: true });
      }
      
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Failed to fetch analytics:', error);
      // Use mock data as fallback
      try {
        const mockResponse = await fetch('/api/analytics/mock');
        const mockData = await mockResponse.json();
        setAnalyticsData({ ...mockData, isLive: false });
      } catch (mockError) {
        console.error('Failed to fetch mock data:', mockError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-white dark:bg-stone-900">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-stone-200 border-t-stone-600"></div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100 mb-2">
              Analytics Dashboard
            </h1>
            <div className="flex items-center space-x-2">
              <p className="text-stone-600 dark:text-stone-400">
                Track your website performance and user engagement
              </p>
              {analyticsData && (
                <span className={`px-2 py-1 text-xs rounded-full ${
                  analyticsData.isLive 
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' 
                    : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200'
                }`}>
                  {analyticsData.isLive ? 'Live Data' : 'Demo Data'}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center space-x-4 mt-4 sm:mt-0">
            <p className="text-sm text-stone-500 dark:text-stone-400">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </p>
            <button
              onClick={fetchAnalyticsData}
              disabled={isLoading}
              className="flex items-center space-x-2 px-4 py-2 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 disabled:opacity-50"
            >
              <FiRefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Refresh</span>
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-4 border-stone-200 border-t-stone-600 mx-auto mb-4"></div>
              <p className="text-stone-600 dark:text-stone-400">Loading analytics data...</p>
            </div>
          </div>
        ) : analyticsData ? (
          <>
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-blue-500 mr-4">
                    <FiUsers className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Total Users</p>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{analyticsData.users}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-green-500 mr-4">
                    <FiEye className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Page Views</p>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{analyticsData.pageviews}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-purple-500 mr-4">
                    <FiBarChart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Sessions</p>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{analyticsData.sessions}</p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 hover:scale-105">
                <div className="flex items-center">
                  <div className="p-3 rounded-lg bg-orange-500 mr-4">
                    <FiHeart className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-stone-600 dark:text-stone-400">Bounce Rate</p>
                    <p className="text-2xl font-bold text-stone-900 dark:text-stone-100">{analyticsData.bounceRate}%</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Top Pages and Device Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              {/* Top Pages */}
              <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700">
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
                  Top Pages
                </h3>
                <div className="space-y-3">
                  {analyticsData.topPages?.slice(0, 5).map(([page, views], index) => (
                    <div key={page} className="flex items-center justify-between p-3 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">
                      <div className="flex items-center">
                        <span className="w-6 h-6 bg-stone-200 dark:bg-stone-600 rounded-full flex items-center justify-center text-xs font-bold mr-3">
                          {index + 1}
                        </span>
                        <span className="text-stone-900 dark:text-stone-100 font-medium">{page}</span>
                      </div>
                      <span className="text-stone-600 dark:text-stone-400 font-semibold">{views}</span>
                    </div>
                  )) || (
                    <p className="text-stone-500 dark:text-stone-400 text-center py-8">No page data available</p>
                  )}
                </div>
              </div>

              {/* Device Stats */}
              <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700">
                <h3 className="text-lg font-semibold text-stone-900 dark:text-stone-100 mb-4">
                  Device Breakdown
                </h3>
                <div className="space-y-3">
                  {analyticsData.deviceStats?.map(([device, sessions], index) => (
                    <div key={device} className="flex items-center justify-between p-3 hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">
                      <div className="flex items-center">
                        <div className="w-3 h-3 rounded-full mr-3 bg-blue-500"></div>
                        <span className="text-stone-900 dark:text-stone-100 capitalize">{device}</span>
                      </div>
                      <span className="text-stone-600 dark:text-stone-400 font-semibold">{sessions}</span>
                    </div>
                  )) || (
                    <p className="text-stone-500 dark:text-stone-400 text-center py-8">No device data available</p>
                  )}
                </div>
              </div>
            </div>

            {/* External Analytics Links */}
            <div className="bg-white dark:bg-stone-800 p-6 border border-stone-200 dark:border-stone-700">
              <h2 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                External Analytics Platforms
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <a
                  href="https://analytics.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-3">
                    <FiBarChart className="w-8 h-8 text-blue-600" />
                    <FiExternalLink className="w-4 h-4 text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-semibold text-blue-600 mb-1">Google Analytics</p>
                  <p className="text-xs text-blue-500">Detailed traffic insights</p>
                </a>
                
                <a
                  href="https://tagmanager.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 hover:bg-green-100 dark:hover:bg-green-900/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-3">
                    <FiShoppingCart className="w-8 h-8 text-green-600" />
                    <FiExternalLink className="w-4 h-4 text-green-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-semibold text-green-600 mb-1">Tag Manager</p>
                  <p className="text-xs text-green-500">Manage tracking tags</p>
                </a>
                
                <a
                  href="https://insights.hotjar.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 hover:bg-orange-100 dark:hover:bg-orange-900/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-3">
                    <FiEye className="w-8 h-8 text-orange-600" />
                    <FiExternalLink className="w-4 h-4 text-orange-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-semibold text-orange-600 mb-1">Hotjar</p>
                  <p className="text-xs text-orange-500">User behavior recordings</p>
                </a>
                
                <a
                  href="https://search.google.com/search-console"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 hover:bg-purple-100 dark:hover:bg-purple-900/30 transition-all duration-300 hover:scale-105"
                >
                  <div className="flex items-center justify-between mb-3">
                    <FiHeart className="w-8 h-8 text-purple-600" />
                    <FiExternalLink className="w-4 h-4 text-purple-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
                  <p className="font-semibold text-purple-600 mb-1">Search Console</p>
                  <p className="text-xs text-purple-500">SEO performance</p>
                </a>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-20">
            <FiBarChart className="w-16 h-16 text-stone-400 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
              Unable to Load Analytics
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-6">
              There was an issue fetching your analytics data.
            </p>
            <button
              onClick={fetchAnalyticsData}
              className="px-6 py-3 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300"
            >
              Try Again
            </button>
          </div>
        )}
      </div>
    </div>
  );
}