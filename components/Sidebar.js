"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  FiMenu,
  FiX,
  FiChevronRight,
  FiHome,
  FiShoppingBag,
  FiHeart,
  FiUser,
  FiPhone,
  FiInfo,
  FiStar,
  FiGift,
} from "react-icons/fi";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [user] = useAuthState(auth);
  const { toggleCart, itemCount } = useCart();
  const { toggleWishlist, wishlistCount } = useWishlist();

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(false);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Updated categories with new structure
  const categories = [
    {
      name: "Pehchaan Collection",
      href: "/products?category=pehchaan",
      description: "Heritage dress collection",
    },
    {
      name: "Potli Bags",
      href: "/products?category=potli-bags",
      description: "Handcrafted accessories",
    },
    {
      name: "Custom Made",
      href: "/products?category=custom-made",
      description: "Personalized designs",
    },
  ];

  const quickLinks = [
    {
      name: "Home",
      href: "/",
      icon: FiHome,
    },
    {
      name: "All Collections",
      href: "/products",
      icon: FiShoppingBag,
    },
    {
      name: "Pehchaan Collection",
      href: "/products?category=pehchaan",
      icon: FiStar,
    },
    {
      name: "Potli Bags",
      href: "/products?category=potli-bags",
      icon: FiGift,
    },
    {
      name: "About Us",
      href: "#brand-story",
      icon: FiInfo,
    },
    {
      name: "Contact",
      href: "#contact",
      icon: FiPhone,
    },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      <button
        onClick={toggleSidebar}
        className={`fixed top-22 left-4 z-50 cursor-pointer p-3 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 ${
          isOpen ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
        aria-label="Open navigation menu"
        title="Open navigation menu"
      >
        <FiMenu className="w-5 h-5 transition-transform duration-200" />
      </button>

      {/* Sidebar Overlay for Mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden animate-fade-in"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-stone-900 border-r border-stone-200 dark:border-stone-700 shadow-xl z-50 transition-all duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } ${isMobile ? "w-80" : "w-72"}`}
      >
        <div className="flex flex-col h-full">
          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Categories */}
            <div className="animate-fade-in-up">
              <div className="flex justify-between items-center">
                <h3 className="font-fira-sans text-base font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-6">
                  Collections
                </h3>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-800 transition-all duration-200 hover:scale-110 active:scale-95"
                  aria-label="Close navigation menu"
                >
                  <FiX className="w-5 h-5 text-stone-600 dark:text-stone-400 transition-transform duration-200" />
                </button>
              </div>
              <div className="space-y-1">
                {categories.map((category, index) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => isMobile && setIsOpen(false)}
                    className="group flex items-center justify-between p-4 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 hover:scale-105 active:scale-95 animate-fade-in-up"
                    style={{
                      animationDelay: `${index * 100}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <div className="flex-1">
                      <div className="font-fira-sans text-stone-900 dark:text-stone-100 font-medium text-sm group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors duration-200 tracking-wide">
                        {category.name}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors duration-200 mt-1">
                        {category.description}
                      </div>
                    </div>
                    <FiChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-all duration-200 group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div className="animate-fade-in-up delay-200">
              <h3 className="font-fira-sans text-xs font-medium text-stone-500 dark:text-stone-400 uppercase tracking-widest mb-6">
                Quick Links
              </h3>
              <div className="space-y-1">
                {quickLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => isMobile && setIsOpen(false)}
                    className="group flex items-center p-3 hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-200 hover:scale-105 active:scale-95 animate-fade-in-up"
                    style={{
                      animationDelay: `${(index + 6) * 50}ms`,
                      animationFillMode: "both",
                    }}
                  >
                    <link.icon className="w-4 h-4 mr-3 text-stone-600 dark:text-stone-400 group-hover:text-stone-800 dark:group-hover:text-stone-200 transition-all duration-200 group-hover:scale-110" />
                    <span className="text-stone-900 dark:text-stone-100 font-medium text-sm group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors duration-200 tracking-wide">
                      {link.name}
                    </span>
                  </Link>
                ))}
                {isMobile && (
                  <div className="border-t border-stone-200 dark:border-stone-700 pt-4 space-y-3">
                    <Link 
                      href={user ? "/admin/dashboard" : "/admin/login"}
                      onClick={toggleSidebar}
                      className="flex items-center space-x-3 font-fira-sans font-medium text-sm text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-300 py-2 px-3 hover:bg-stone-100 dark:hover:bg-stone-800"
                    >
                      <FiUser className="w-5 h-5" />
                      <span>Admin Panel</span>
                    </Link>
                    
                    <button 
                      onClick={() => {
                        toggleWishlist();
                        toggleSidebar();
                      }}
                      className="font-fira-sans relative flex items-center space-x-3 font-medium text-sm text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-300 py-2 px-3 hover:bg-stone-100 dark:hover:bg-stone-800 w-full text-left"
                    >
                      <FiHeart className="w-5 h-5" />
                      <span>Wishlist</span>
                      {wishlistCount > 0 && (
                        <span className="bg-red-500 text-white text-xs font-bold px-2 py-1 min-w-[20px] text-center">
                          {wishlistCount > 10 ? '10+' : wishlistCount}
                        </span>
                      )}
                    </button>
                    
                    <button 
                      onClick={() => {
                        toggleCart();
                        toggleSidebar();
                      }}
                      className="font-fira-sans relative flex items-center space-x-3 font-medium text-sm text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-300 py-2 px-3 hover:bg-stone-100 dark:hover:bg-stone-800 w-full text-left"
                    >
                      <FiShoppingBag className="w-5 h-5" />
                      <span>Shopping Bag</span>
                      {itemCount > 0 && (
                        <span className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 text-xs font-bold px-2 py-1 min-w-[20px] text-center">
                          {itemCount > 10 ? '10+' : itemCount}
                        </span>
                      )}
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content spacer for desktop */}
      {!isMobile && isOpen && <div className="w-72 flex-shrink-0" />}

      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes fade-in {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 0.3s ease-out;
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .delay-200 {
          animation-delay: 200ms;
        }
      `}</style>
    </>
  );
}