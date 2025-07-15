"use client";

import { useState, useEffect } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, db } from "@/lib/firebase";
import { collection, getDocs, query, orderBy, limit } from "firebase/firestore";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  FiUpload,
  FiLock,
  FiUsers,
  FiPackage,
  FiTrendingUp,
  FiCalendar,
  FiArrowRight,
  FiUser,
  FiHome,
  FiShield,
  FiActivity,
  FiBarChart,
  FiClock,
  FiTarget,
  FiEye,
  FiPlus,
  FiSettings,
  FiLogOut,
} from "react-icons/fi";
import LogoutButton from "@/components/LogoutButton";
import { ensureAdminDocument } from "@/lib/adminSetup";
import Image from "next/image";

export default function AdminDashboard() {
  const [user, loading] = useAuthState(auth);
  const [stats, setStats] = useState({
    totalProducts: 0,
    recentProducts: [],
    adminCount: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  // Ensure admin document exists
  useEffect(() => {
    if (user && !loading) {
      ensureAdminDocument(user);
    }
  }, [user, loading]);

  // Fetch dashboard stats
  useEffect(() => {
    const fetchStats = async () => {
      if (!user) return;

      try {
        // Get total products count
        const productsRef = collection(db, "products");
        const productsSnapshot = await getDocs(productsRef);
        const totalProducts = productsSnapshot.size;

        // Get recent products
        const recentProductsQuery = query(
          productsRef,
          orderBy("createdAt", "desc"),
          limit(5)
        );
        const recentProductsSnapshot = await getDocs(recentProductsQuery);
        const recentProducts = recentProductsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Get admin count (only for super admin)
        let adminCount = 0;
        if (user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL) {
          const adminsRef = collection(db, "admins");
          const adminsSnapshot = await getDocs(adminsRef);
          adminCount = adminsSnapshot.size;
        }

        setStats({
          totalProducts,
          recentProducts,
          adminCount,
        });
      } catch (error) {
        console.error("Error fetching dashboard stats:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [user]);

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push("/admin/login");
    }
  }, [user, loading, router]);

  if (loading || isLoading) {
    return (
      <div className="min-h-screen bg-white dark:bg-stone-900 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="w-16 h-16 border-2 border-stone-200 dark:border-stone-700 border-t-stone-800 dark:border-t-stone-200 rounded-full animate-spin mx-auto mb-6"></div>
          <h2 className="font-fira-sans text-xl font-medium text-stone-800 dark:text-stone-200 tracking-wide">
            LOADING DASHBOARD
          </h2>
          <p className="font-fira-sans text-sm text-stone-600 dark:text-stone-400 mt-2 tracking-widest uppercase">
            Please wait...
          </p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const isSuperAdmin = user.email === process.env.NEXT_PUBLIC_ADMIN_EMAIL;

  const quickActions = [
    {
      title: "Upload Product",
      description: "Add new pieces to the collection",
      icon: FiUpload,
      href: "/admin/upload",
      primary: true,
    },
    {
      title: "Manage Products",
      description: "Manage your products",
      icon: FiPackage,
      href: "/admin/manage-products",
      primary: false,
    },
    {
      title: "Change Password",
      description: "Update your security credentials",
      icon: FiLock,
      href: "/admin/change-password",
      primary: false,
    },
    ...(isSuperAdmin
      ? [
          {
            title: "Manage Admins",
            description: "Create and manage admin accounts",
            icon: FiUsers,
            href: "/admin/manage",
            primary: false,
          },
        ]
      : []),
  ];

  const statsCards = [
    {
      title: "Total Products",
      value: stats.totalProducts,
      icon: FiPackage,
      description: "In collection",
    },
    {
      title: "Active Session",
      value: "1",
      icon: FiActivity,
      description: "Currently online",
    },
    ...(isSuperAdmin
      ? [
          {
            title: "Admin Accounts",
            value: stats.adminCount,
            icon: FiShield,
            description: "Registered admins",
          },
        ]
      : []),
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb Navigation */}
        <div className="border-b border-stone-200 dark:border-stone-700 pt-12 pb-6">
          <nav className="flex items-center space-x-2 text-xs tracking-widest text-stone-500 dark:text-stone-400 uppercase">
            <Link
              href="/"
              className="hover:text-stone-800 dark:hover:text-stone-200 transition-colors duration-300"
            >
              HOME
            </Link>
            <span>/</span>
            <span className="text-stone-800 dark:text-stone-200">
              ADMIN DASHBOARD
            </span>
          </nav>
        </div>

        {/* Header Section */}
        <div className="py-16 text-center border-b border-stone-200 dark:border-stone-700">
          <div className="mb-8 flex flex-col items-center justify-center">
            <Image src='/images/newlogo.png' alt="JK" height={90} width={90} className="text-center"/>
            <h1 className="font-fira-sans text-4xl md:text-5xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
              ADMIN DASHBOARD
            </h1>
            <p className="font-fira-sans text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto tracking-wide">
              Manage your heritage fashion collection
            </p>
          </div>

          {/* Admin Status Card */}
          <div className="max-w-md mx-auto bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-6">
            <div className="flex items-center justify-center space-x-4">
              <div className="w-10 h-10 bg-stone-800 dark:bg-stone-200 flex items-center justify-center">
                <FiUser className="w-5 h-5 text-white dark:text-stone-900" />
              </div>
              <div className="text-left">
                <p className="font-fira-sans text-xs text-stone-600 dark:text-stone-400 font-medium tracking-widest uppercase">
                  {isSuperAdmin ? "Super Administrator" : "Administrator"}
                </p>
                <p className="font-fira-sans text-sm text-stone-800 dark:text-stone-200 font-medium tracking-wide">
                  {user?.email}
                </p>
              </div>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Navigation Links */}
          <div className="py-8 border-b border-stone-200 dark:border-stone-700">
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="flex items-center space-x-2 px-6 py-3 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 font-fira-sans text-sm tracking-wide"
              >
                <FiHome className="w-4 h-4" />
                <span>HOME</span>
              </Link>
              <Link
                href="/products"
                className="flex items-center space-x-2 px-6 py-3 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 font-fira-sans text-sm tracking-wide"
              >
                <FiEye className="w-4 h-4" />
                <span>COLLECTIONS</span>
              </Link>
              <button
                onClick={() => {
            if (window.confirm("Are you sure you want to log out?")) {
              // Show alert that logout is in progress
              alert("Logging out...");
              // Trigger the logout action
              document.getElementById("logout-button").click();
            }
                }}
                className="flex items-center space-x-2 px-6 py-3 border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:bg-red-50 dark:hover:bg-red-900 hover:text-red-700 dark:hover:text-red-300 hover:border-red-300 dark:hover:border-red-700 transition-all duration-300 font-fira-sans text-sm tracking-wide"
              >
                <FiLogOut className="w-4 h-4" />
                <span>LOGOUT</span>
              </button>
              <div className="hidden">
                <LogoutButton id="logout-button" />
              </div>
            </div>
          </div>

          {/* Stats Cards */}
        <div className="py-16">
          <div className="text-center mb-12">
            <h2 className="font-fira-sans text-3xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
              DASHBOARD OVERVIEW
            </h2>
            <p className="font-fira-sans text-stone-600 dark:text-stone-400 tracking-wide">
              Current system status and metrics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            {statsCards.map((stat, index) => (
              <div
                key={index}
                className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-8 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="w-12 h-12 bg-stone-800 dark:bg-stone-200 flex items-center justify-center mx-auto mb-6">
                  <stat.icon className="w-6 h-6 text-white dark:text-stone-900" />
                </div>
                <h3 className="font-fira-sans text-2xl font-light text-stone-900 dark:text-stone-100 mb-2 tracking-wide">
                  {stat.value}
                </h3>
                <p className="font-fira-sans text-sm text-stone-800 dark:text-stone-200 font-medium tracking-widest uppercase mb-2">
                  {stat.title}
                </p>
                <p className="font-fira-sans text-xs text-stone-600 dark:text-stone-400 tracking-wide">
                  {stat.description}
                </p>
              </div>
            ))}
          </div>

          {/* Quick Actions */}
          <div className="text-center mb-12">
            <h2 className="font-fira-sans text-3xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
              QUICK ACTIONS
            </h2>
            <p className="font-fira-sans text-stone-600 dark:text-stone-400 tracking-wide">
              Manage your collection and settings
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            {quickActions.map((action, index) => (
              <Link
                key={index}
                href={action.href}
                className={`group p-8 text-center border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 ${
                  action.primary
                    ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900"
                    : "bg-stone-50 dark:bg-stone-800 text-stone-900 dark:text-stone-100"
                }`}
              >
                <div className={`w-12 h-12 flex items-center justify-center mx-auto mb-6 ${
                  action.primary
                    ? "bg-stone-700 dark:bg-stone-300"
                    : "bg-stone-800 dark:bg-stone-200"
                }`}>
                  <action.icon className={`w-6 h-6 ${
                    action.primary
                      ? "text-white dark:text-stone-900"
                      : "text-white dark:text-stone-900"
                  }`} />
                </div>
                <h3 className="font-fira-sans text-xl font-medium mb-3 tracking-wide">
                  {action.title}
                </h3>
                <p className={`font-fira-sans text-sm tracking-wide ${
                  action.primary
                    ? "text-stone-200 dark:text-stone-700"
                    : "text-stone-600 dark:text-stone-400"
                }`}>
                  {action.description}
                </p>
                <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <FiArrowRight className={`w-5 h-5 mx-auto ${
                    action.primary
                      ? "text-stone-200 dark:text-stone-700"
                      : "text-stone-600 dark:text-stone-400"
                  }`} />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="py-16 border-t border-stone-200 dark:border-stone-700">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Recent Products */}
            <div>
              <div className="text-center mb-8">
                <h3 className="font-fira-sans text-2xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
                  RECENT PRODUCTS
                </h3>
                <p className="font-fira-sans text-stone-600 dark:text-stone-400 tracking-wide">
                  Latest additions to your collection
                </p>
              </div>
              
              <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-6">
                <div className="space-y-4">
                  {stats.recentProducts.length > 0 ? (
                    stats.recentProducts.map((product, index) => (
                      <div
                        key={index}
                        className="flex items-center space-x-4 p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700 hover:shadow-md transition-all duration-300"
                      >
                        <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
                          {product.image ? (
                            <img
                              src={product.image}
                              alt={product.name}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <FiPackage className="w-8 h-8 text-stone-400" />
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className="font-fira-sans text-sm font-medium text-stone-900 dark:text-stone-100 tracking-wide">
                            {product.name}
                          </h4>
                          <p className="font-fira-sans text-xs text-stone-600 dark:text-stone-400 tracking-wide">
                            {product.category?.replace('-', ' ').toUpperCase()} • ₹{product.price}
                          </p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="text-center py-12">
                      <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 flex items-center justify-center mx-auto mb-6">
                        <FiPackage className="w-8 h-8 text-stone-400" />
                      </div>
                      <p className="font-fira-sans text-stone-600 dark:text-stone-400 tracking-wide">
                        No products yet. Create your first product!
                      </p>
                      <Link
                        href="/admin/upload"
                        className="inline-flex items-center space-x-2 mt-4 px-6 py-3 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 font-fira-sans text-sm tracking-wide"
                      >
                        <FiPlus className="w-4 h-4" />
                        <span>ADD PRODUCT</span>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* System Status */}
            <div>
              <div className="text-center mb-8">
                <h3 className="font-fira-sans text-2xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
                  SYSTEM STATUS
                </h3>
                <p className="font-fira-sans text-stone-600 dark:text-stone-400 tracking-wide">
                  Current system health and connectivity
                </p>
              </div>
              
              <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 p-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-fira-sans text-sm text-stone-900 dark:text-stone-100 tracking-wide">
                        DATABASE CONNECTION
                      </span>
                    </div>
                    <span className="font-fira-sans text-xs text-green-600 dark:text-green-400 tracking-widest uppercase">
                      Connected
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-fira-sans text-sm text-stone-900 dark:text-stone-100 tracking-wide">
                        AUTHENTICATION
                      </span>
                    </div>
                    <span className="font-fira-sans text-xs text-green-600 dark:text-green-400 tracking-widest uppercase">
                      Active
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white dark:bg-stone-900 border border-stone-200 dark:border-stone-700">
                    <div className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="font-fira-sans text-sm text-stone-900 dark:text-stone-100 tracking-wide">
                        FILE STORAGE
                      </span>
                    </div>
                    <span className="font-fira-sans text-xs text-green-600 dark:text-green-400 tracking-widest uppercase">
                      Available
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-16 border-t border-stone-200 dark:border-stone-700">
          <p className="font-fira-sans text-xs tracking-widest text-stone-500 dark:text-stone-400 uppercase">
            JAGJIT KAUR • ADMIN PORTAL
          </p>
        </div>
      </div>
    </div>
  );
}