"use client";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

// Dynamically import heavy components to prevent SSR issues
const CountUp = dynamic(() => import("react-countup"), {
  ssr: false,
  loading: () => <span>0</span>
});

const ResponsiveContainer = dynamic(
  () => import("recharts").then((mod) => mod.ResponsiveContainer),
  { ssr: false }
);

const ComposedChart = dynamic(
  () => import("recharts").then((mod) => mod.ComposedChart),
  { ssr: false }
);

const PieChart = dynamic(
  () => import("recharts").then((mod) => mod.PieChart),
  { ssr: false }
);

const BarChart = dynamic(
  () => import("recharts").then((mod) => mod.BarChart),
  { ssr: false }
);

// Import other recharts components similarly
const LineChart = dynamic(() => import("recharts").then((mod) => mod.LineChart), { ssr: false });
const Line = dynamic(() => import("recharts").then((mod) => mod.Line), { ssr: false });
const XAxis = dynamic(() => import("recharts").then((mod) => mod.XAxis), { ssr: false });
const YAxis = dynamic(() => import("recharts").then((mod) => mod.YAxis), { ssr: false });
const CartesianGrid = dynamic(() => import("recharts").then((mod) => mod.CartesianGrid), { ssr: false });
const Tooltip = dynamic(() => import("recharts").then((mod) => mod.Tooltip), { ssr: false });
const Pie = dynamic(() => import("recharts").then((mod) => mod.Pie), { ssr: false });
const Cell = dynamic(() => import("recharts").then((mod) => mod.Cell), { ssr: false });
const Bar = dynamic(() => import("recharts").then((mod) => mod.Bar), { ssr: false });
const AreaChart = dynamic(() => import("recharts").then((mod) => mod.AreaChart), { ssr: false });
const Area = dynamic(() => import("recharts").then((mod) => mod.Area), { ssr: false });
const Legend = dynamic(() => import("recharts").then((mod) => mod.Legend), { ssr: false });

import {
  FiBarChart,
  FiUsers,
  FiEye,
  FiShoppingCart,
  FiHeart,
  FiTrendingUp,
  FiTrendingDown,
  FiClock,
  FiTarget,
  FiSmartphone,
  FiMonitor,
  FiTablet,
  FiRefreshCw,
  FiExternalLink,
  FiArrowUp,
  FiArrowDown,
  FiGlobe,
  FiSearch,
  FiActivity,
  FiCalendar,
  FiFilter,
  FiDownload,
  FiShare2,
  FiMaximize2,
  FiAlertCircle,
} from "react-icons/fi";

const COLORS = [
  "#3B82F6",
  "#10B981",
  "#F59E0B",
  "#EF4444",
  "#8B5CF6",
  "#06B6D4",
];

export default function AnalyticsPage() {
  const [user, loading] = useAuthState(auth);
  const router = useRouter();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [error, setError] = useState(null);
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [autoRefresh, setAutoRefresh] = useState(false);
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
  }, [user, selectedPeriod, mounted]);

  // Auto-refresh functionality
  useEffect(() => {
    let interval;
    if (autoRefresh && mounted) {
      interval = setInterval(() => {
        fetchAnalyticsData();
      }, 30000); // Refresh every 30 seconds
    }
    return () => clearInterval(interval);
  }, [autoRefresh, mounted]);

  const fetchAnalyticsData = async () => {
    if (!mounted) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/analytics?period=${selectedPeriod}`);

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

  const generateFallbackTrafficSources = (sessions) => {
    const totalSessions = parseInt(
      sessions.toString().replace(/[^\d]/g, "") || "0"
    );
    if (totalSessions === 0) return [];

    return [
      ["Direct", Math.ceil(totalSessions * 0.45).toString()],
      ["Organic Search", Math.ceil(totalSessions * 0.35).toString()],
      ["Social Media", Math.ceil(totalSessions * 0.15).toString()],
      ["Referral", Math.ceil(totalSessions * 0.05).toString()],
    ];
  };

  // Don't render until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-blue-600"></div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-center"
        >
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-blue-600 mx-auto mb-4"></div>
          <p className="text-stone-600 dark:text-stone-400 font-medium">
            Loading Analytics Dashboard...
          </p>
        </motion.div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const StatCard = ({
    icon: Icon,
    title,
    value,
    previousValue,
    change,
    changeType,
    color,
    delay = 0,
  }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay }}
      className="bg-white dark:bg-stone-800 p-6 rounded-xl border border-stone-200 dark:border-stone-700 hover:shadow-xl transition-all duration-300 hover:scale-105 group"
    >
      <div className="flex items-center justify-between mb-4">
        <div
          className={`p-3 rounded-lg ${color} group-hover:scale-110 transition-transform duration-300`}
        >
          <Icon className="w-6 h-6 text-white" />
        </div>
        {change && (
          <div
            className={`flex items-center text-sm font-semibold ${
              changeType === "positive" ? "text-green-600" : "text-red-600"
            }`}
          >
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
        <p className="text-sm font-medium text-stone-600 dark:text-stone-400 mb-1">
          {title}
        </p>
        <p className="text-3xl font-bold text-stone-900 dark:text-stone-100">
          {mounted && CountUp ? (
            <CountUp
              end={parseInt(value.toString().replace(/[^\d]/g, "") || 0)}
              duration={2}
              separator=","
            />
          ) : (
            parseInt(value.toString().replace(/[^\d]/g, "") || 0).toLocaleString()
          )}
        </p>
        {previousValue && (
          <p className="text-xs text-stone-500 dark:text-stone-400 mt-1">
            vs {previousValue} last period
          </p>
        )}
      </div>
    </motion.div>
  );

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white dark:bg-stone-800 p-3 rounded-lg shadow-lg border border-stone-200 dark:border-stone-700">
          <p className="font-medium text-stone-900 dark:text-stone-100">
            {label}
          </p>
          {payload.map((entry, index) => (
            <p key={index} className="text-sm" style={{ color: entry.color }}>
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  const TimeFrameSelector = () => (
    <div className="flex bg-stone-100 dark:bg-stone-800 rounded-lg p-1">
      {[
        { key: "7d", label: "7D" },
        { key: "30d", label: "30D" },
        { key: "90d", label: "90D" },
        { key: "1y", label: "1Y" },
      ].map((period) => (
        <button
          key={period.key}
          onClick={() => setSelectedPeriod(period.key)}
          className={`px-3 py-1 text-sm font-medium rounded-md transition-all duration-200 ${
            selectedPeriod === period.key
              ? "bg-white dark:bg-stone-700 text-stone-900 dark:text-stone-100 shadow-sm"
              : "text-stone-600 dark:text-stone-400 hover:text-stone-900 dark:hover:text-stone-100"
          }`}
        >
          {period.label}
        </button>
      ))}
    </div>
  );

  // Client-side only chart component
  const TrafficChart = ({ data }) => {
    if (!mounted || !ResponsiveContainer || !ComposedChart) {
      return (
        <div className="flex items-center justify-center h-[300px] bg-stone-50 dark:bg-stone-800 rounded">
          <div className="text-stone-400">Loading chart...</div>
        </div>
      );
    }

    return (
      <ResponsiveContainer width="100%" height={300}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
          <YAxis stroke="#6b7280" fontSize={12} />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="users"
            fill="url(#userGradient)"
            stroke="#3b82f6"
            strokeWidth={2}
            name="Users"
          />
          <Line
            type="monotone"
            dataKey="sessions"
            stroke="#10b981"
            strokeWidth={3}
            name="Sessions"
            dot={{ fill: "#10b981", strokeWidth: 2, r: 4 }}
          />
          <defs>
            <linearGradient id="userGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
        </ComposedChart>
      </ResponsiveContainer>
    );
  };

  // Device chart component
  const DeviceChart = ({ data }) => {
    if (!mounted || !ResponsiveContainer || !PieChart) {
      return (
        <div className="flex items-center justify-center h-[200px] bg-stone-50 dark:bg-stone-800 rounded">
          <div className="text-stone-400">Loading chart...</div>
        </div>
      );
    }

    const chartData = data?.map(([device, sessions], index) => ({
      name: device.charAt(0).toUpperCase() + device.slice(1),
      value: parseInt(sessions),
      fill: COLORS[index % COLORS.length],
    })) || [];

    return (
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={5}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Enhanced Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 bg-white dark:bg-stone-800 rounded-xl p-6 shadow-lg"
        >
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <FiBarChart className="w-8 h-8 text-blue-600" />
              <h1 className="text-3xl font-bold text-stone-900 dark:text-stone-100">
                Analytics Dashboard
              </h1>
              {analyticsData && (
                <span
                  className={`px-3 py-1 text-xs font-semibold rounded-full ${
                    analyticsData.isLive
                      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                      : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                  }`}
                >
                  {analyticsData.isLive ? "🟢 Live Data" : "🟡 Demo Data"}
                </span>
              )}
            </div>
            <p className="text-stone-600 dark:text-stone-400">
              Real-time insights into your website performance and user behavior
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 mt-4 lg:mt-0">
            <TimeFrameSelector />

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setAutoRefresh(!autoRefresh)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                  autoRefresh
                    ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    : "bg-stone-100 text-stone-600 dark:bg-stone-700 dark:text-stone-400"
                }`}
              >
                <FiActivity className="w-4 h-4" />
                <span>{autoRefresh ? "Auto ON" : "Auto OFF"}</span>
              </button>

              <button
                onClick={fetchAnalyticsData}
                disabled={isLoading}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 disabled:bg-blue-400 rounded-lg transition-all duration-200 disabled:cursor-not-allowed"
              >
                <FiRefreshCw
                  className={`w-4 h-4 ${isLoading ? "animate-spin" : ""}`}
                />
                <span>Refresh</span>
              </button>
            </div>

            <div className="text-right">
              <p className="text-xs text-stone-500 dark:text-stone-400">
                Last updated
              </p>
              <p className="text-sm font-medium text-stone-700 dark:text-stone-300">
                {lastUpdated?.toLocaleTimeString() || 'Loading...'}
              </p>
            </div>
          </div>
        </motion.div>

        {/* Error Alert */}
        {error && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6"
          >
            <div className="flex items-center">
              <FiAlertCircle className="w-5 h-5 text-red-600 mr-3" />
              <div>
                <h3 className="text-sm font-semibold text-red-800 dark:text-red-200">
                  Analytics Error
                </h3>
                <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                  {error} - Showing demo data instead.
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center justify-center py-20"
          >
            <div className="text-center">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-stone-200 border-t-blue-600 mx-auto mb-4"></div>
              <p className="text-stone-600 dark:text-stone-400 font-medium">
                Loading analytics data...
              </p>
            </div>
          </motion.div>
        ) : analyticsData ? (
          <>
            {/* Enhanced Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon={FiUsers}
                title="Total Users"
                value={analyticsData.users}
                previousValue="1,089"
                change="12.5"
                changeType="positive"
                color="bg-gradient-to-r from-blue-500 to-blue-600"
                delay={0.1}
              />
              <StatCard
                icon={FiEye}
                title="Page Views"
                value={analyticsData.pageviews}
                previousValue="3,122"
                change="8.2"
                changeType="positive"
                color="bg-gradient-to-r from-green-500 to-green-600"
                delay={0.2}
              />
              <StatCard
                icon={FiBarChart}
                title="Sessions"
                value={analyticsData.sessions}
                previousValue="1,654"
                change="5.1"
                changeType="positive"
                color="bg-gradient-to-r from-purple-500 to-purple-600"
                delay={0.3}
              />
              <StatCard
                icon={FiTarget}
                title="Bounce Rate"
                value={`${analyticsData.bounceRate}%`}
                previousValue="45%"
                change="3.2"
                changeType="negative"
                color="bg-gradient-to-r from-orange-500 to-orange-600"
                delay={0.4}
              />
            </div>

            {/* Advanced Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 mb-8">
              {/* Traffic Overview Chart */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
                className="xl:col-span-2 bg-white dark:bg-stone-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    Traffic Overview
                  </h3>
                  <div className="flex items-center space-x-2">
                    <FiTrendingUp className="w-5 h-5 text-green-500" />
                    <span className="text-sm font-medium text-green-600">
                      +15.3% vs last period
                    </span>
                  </div>
                </div>
                <TrafficChart data={analyticsData.dailyStats} />
              </motion.div>

              {/* Device Analytics */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
                className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-lg"
              >
                <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                  Device Analytics
                </h3>
                <DeviceChart data={analyticsData.deviceStats} />
                <div className="mt-4 space-y-2">
                  {analyticsData.deviceStats?.map(
                    ([device, sessions], index) => (
                      <div
                        key={device}
                        className="flex items-center justify-between"
                      >
                        <div className="flex items-center">
                          <div
                            className="w-3 h-3 rounded-full mr-2"
                            style={{
                              backgroundColor: COLORS[index % COLORS.length],
                            }}
                          />
                          <span className="text-sm text-stone-700 dark:text-stone-300 capitalize flex items-center">
                            {device === "mobile" && (
                              <FiSmartphone className="w-4 h-4 mr-1" />
                            )}
                            {device === "desktop" && (
                              <FiMonitor className="w-4 h-4 mr-1" />
                            )}
                            {device === "tablet" && (
                              <FiTablet className="w-4 h-4 mr-1" />
                            )}
                            {device}
                          </span>
                        </div>
                        <span className="text-sm font-semibold text-stone-900 dark:text-stone-100">
                          {sessions}
                        </span>
                      </div>
                    )
                  )}
                </div>
              </motion.div>
            </div>

            {/* Performance Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
              {/* Top Pages */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7 }}
                className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    Top Pages
                  </h3>
                  <FiEye className="w-5 h-5 text-stone-500" />
                </div>
                <div className="space-y-3">
                  {analyticsData.topPages
                    ?.slice(0, 5)
                    .map(([page, views], index) => (
                      <motion.div
                        key={page}
                        initial={{ opacity: 0, x: -10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors group"
                      >
                        <div className="flex items-center space-x-3">
                          <span className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                            {index + 1}
                          </span>
                          <div>
                            <span className="text-stone-900 dark:text-stone-100 font-medium text-sm">
                              {page.length > 25
                                ? `${page.substring(0, 25)}...`
                                : page}
                            </span>
                            <div className="text-xs text-stone-500 dark:text-stone-400">
                              Page views
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <span className="text-stone-900 dark:text-stone-100 font-bold">
                            {views}
                          </span>
                          <div className="w-16 h-1 bg-stone-200 dark:bg-stone-600 rounded-full overflow-hidden mt-1">
                            <div
                              className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                              style={{
                                width: `${Math.min(
                                  (parseInt(views) /
                                    parseInt(analyticsData.topPages[0][1])) *
                                    100,
                                  100
                                )}%`,
                              }}
                            />
                          </div>
                        </div>
                      </motion.div>
                    )) || (
                    <p className="text-stone-500 dark:text-stone-400 text-center py-8">
                      No page data available
                    </p>
                  )}
                </div>
              </motion.div>

              {/* Traffic Sources with Fallback */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    Traffic Sources
                  </h3>
                  <FiGlobe className="w-5 h-5 text-stone-500" />
                </div>

                <div className="space-y-4">
                  {(() => {
                    // Use real data if available, otherwise generate fallback
                    const trafficData =
                      analyticsData.trafficSources &&
                      analyticsData.trafficSources.length > 0
                        ? analyticsData.trafficSources
                        : generateFallbackTrafficSources(
                            analyticsData.sessions
                          );

                    return trafficData.map(([source, sessions], index) => {
                      const maxSessions = Math.max(
                        ...trafficData.map(([, s]) => parseInt(s))
                      );
                      const percentage =
                        (parseInt(sessions) / maxSessions) * 100;

                      return (
                        <motion.div
                          key={source}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.9 + index * 0.1 }}
                          className="space-y-2"
                        >
                          <div className="flex items-center justify-between">
                            <div className="flex items-center space-x-2">
                              <div
                                className="w-3 h-3 rounded-full"
                                style={{
                                  backgroundColor:
                                    COLORS[index % COLORS.length],
                                }}
                              />
                              <span className="text-sm font-medium text-stone-700 dark:text-stone-300 capitalize">
                                {source.toLowerCase()}
                              </span>
                            </div>
                            <span className="text-sm font-bold text-stone-900 dark:text-stone-100">
                              {sessions}
                            </span>
                          </div>
                          <div className="w-full bg-stone-200 dark:bg-stone-700 rounded-full h-2">
                            <motion.div
                              initial={{ width: 0 }}
                              animate={{ width: `${percentage}%` }}
                              transition={{
                                delay: 1 + index * 0.1,
                                duration: 0.8,
                              }}
                              className="h-2 rounded-full"
                              style={{
                                backgroundColor: COLORS[index % COLORS.length],
                              }}
                            />
                          </div>
                        </motion.div>
                      );
                    });
                  })()}
                </div>

                {/* Summary */}
                <div className="mt-6 pt-4 border-t border-stone-200 dark:border-stone-700">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Total Sources
                      </p>
                      <p className="text-lg font-bold text-stone-900 dark:text-stone-100">
                        {analyticsData.trafficSources?.length > 0
                          ? analyticsData.trafficSources.length
                          : generateFallbackTrafficSources(
                              analyticsData.sessions
                            ).length}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-stone-500 dark:text-stone-400">
                        Top Source
                      </p>
                      <p className="text-lg font-bold text-stone-900 dark:text-stone-100 capitalize">
                        {analyticsData.trafficSources?.[0]?.[0] ||
                          generateFallbackTrafficSources(
                            analyticsData.sessions
                          )[0]?.[0] ||
                          "Direct"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Data Source Indicator */}
                <div className="mt-4 text-center">
                  <span
                    className={`inline-block px-2 py-1 text-xs rounded-full ${
                      analyticsData.trafficSources?.length > 0
                        ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                        : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                    }`}
                  >
                    {analyticsData.trafficSources?.length > 0
                      ? "Live GA4 Data"
                      : "Estimated Distribution"}
                  </span>
                </div>
              </motion.div>

              {/* Real-time Activity */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.9 }}
                className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-bold text-stone-900 dark:text-stone-100">
                    Real-time Activity
                  </h3>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-sm text-green-600 font-medium">
                      Live
                    </span>
                  </div>
                </div>
                <div className="space-y-3">
                  {analyticsData.recentEvents?.map((event, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 1.0 + index * 0.1 }}
                      className="flex items-center space-x-3 p-2 hover:bg-stone-50 dark:hover:bg-stone-700 rounded transition-colors"
                    >
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-stone-900 dark:text-stone-100">
                          {event.type.replace('_', ' ').toUpperCase()}
                        </p>
                        <p className="text-xs text-stone-600 dark:text-stone-400">
                          {event.product} - {event.time}
                        </p>
                      </div>
                    </motion.div>
                  )) || (
                    <p className="text-stone-500 dark:text-stone-400 text-center py-8">
                      No recent events
                    </p>
                  )}
                </div>
              </motion.div>
            </div>

            {/* External Analytics Platforms */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.2 }}
              className="bg-white dark:bg-stone-800 rounded-xl p-6 shadow-lg"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-stone-900 dark:text-stone-100">
                  External Analytics Platforms
                </h2>
                <button className="flex items-center space-x-2 px-4 py-2 bg-stone-100 dark:bg-stone-700 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-600 transition-colors">
                  <FiExternalLink className="w-4 h-4" />
                  <span>View All</span>
                </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {[
                  {
                    name: "Google Analytics",
                    description: "Detailed traffic insights & user behavior",
                    url: "https://analytics.google.com/",
                    icon: FiBarChart,
                    color: "from-blue-500 to-blue-600",
                    stats: "Live Data",
                  },
                  {
                    name: "Tag Manager",
                    description: "Manage tracking tags & events",
                    url: "https://tagmanager.google.com/",
                    icon: FiTarget,
                    color: "from-green-500 to-green-600",
                    stats: "12 Tags Active",
                  },
                  {
                    name: "Hotjar",
                    description: "User behavior recordings & heatmaps",
                    url: "https://insights.hotjar.com/",
                    icon: FiEye,
                    color: "from-orange-500 to-orange-600",
                    stats: "89% Tracked",
                  },
                  {
                    name: "Search Console",
                    description: "SEO performance & search analytics",
                    url: "https://search.google.com/search-console",
                    icon: FiSearch,
                    color: "from-purple-500 to-purple-600",
                    stats: "456 Keywords",
                  },
                ].map((platform, index) => (
                  <motion.a
                    key={platform.name}
                    href={platform.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 1.3 + index * 0.1 }}
                    className="group p-6 bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-700 dark:to-stone-800 border border-stone-200 dark:border-stone-600 rounded-xl hover:shadow-xl transition-all duration-300 hover:scale-105"
                  >
                    <div className="flex items-center justify-between mb-4">
                      <div
                        className={`p-3 rounded-xl bg-gradient-to-r ${platform.color}`}
                      >
                        <platform.icon className="w-6 h-6 text-white" />
                      </div>
                      <FiExternalLink className="w-5 h-5 text-stone-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                    <h3 className="font-bold text-stone-900 dark:text-stone-100 mb-2">
                      {platform.name}
                    </h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400 mb-3">
                      {platform.description}
                    </p>
                    <div
                      className={`inline-block px-3 py-1 text-xs font-semibold rounded-full bg-gradient-to-r ${platform.color} text-white`}
                    >
                      {platform.stats}
                    </div>
                  </motion.a>
                ))}
              </div>
            </motion.div>
          </>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FiBarChart className="w-24 h-24 text-stone-400 mx-auto mb-6" />
            <h3 className="text-2xl font-bold text-stone-900 dark:text-stone-100 mb-4">
              Unable to Load Analytics
            </h3>
            <p className="text-stone-600 dark:text-stone-400 mb-8 max-w-md mx-auto">
              There was an issue fetching your analytics data. Please check your
              connection and try again.
            </p>
            <button
              onClick={fetchAnalyticsData}
              className="px-8 py-3 bg-blue-600 text-white hover:bg-blue-700 rounded-lg transition-all duration-200 font-medium"
            >
              Try Again
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}
