'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Image from 'next/image';
import { FiMenu, FiX, FiSun, FiMoon, FiUser, FiHeart, FiShoppingBag } from 'react-icons/fi';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user] = useAuthState(auth);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(isDark);
    document.documentElement.classList.toggle('dark', isDark);
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', newDarkMode.toString());
    document.documentElement.classList.toggle('dark', newDarkMode);
  };

  const navigationLinks = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Collection" },
    { href: "#brand-story", label: "Heritage" },
    { href: "#featured-products", label: "Featured" },
    { href: "#contact", label: "Contact" }
  ];

  return (
    <>
      <header 
        className={`fixed w-full top-0 z-50 transition-all duration-500 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-xl border-b border-stone-200/50 dark:border-stone-700/50' 
            : 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border-b border-stone-200/30 dark:border-stone-700/30'
        }`}
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 lg:h-20">
            {/* Logo Section */}
            <Link href="/" className="flex items-center group">
              <div className="relative">
                <Image 
                  src="/images/logo.png" 
                  alt='JAGJIT KAUR' 
                  width={140} 
                  height={56}
                  className="transition-all duration-500 group-hover:scale-105"
                  priority
                />
              </div>
              <span className="font-fira-sans text-xl ml-3 font-bold text-stone-800 dark:text-stone-200 transition-colors duration-300 group-hover:text-stone-600 dark:group-hover:text-stone-300">
                &#x2665;
              </span>
            </Link> 

            {/* Navigation Links - Desktop */}
            <div className="hidden lg:flex items-center space-x-8">
              {navigationLinks.map((link) => (
                <Link 
                  key={link.href}
                  href={link.href} 
                  className="relative font-fira-sans font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-all duration-300 group px-3 py-2"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-3 w-0 h-0.5 bg-stone-800 dark:bg-stone-200 transition-all duration-300 group-hover:w-[calc(100%-24px)]"></span>
                </Link>
              ))}
            </div>

            {/* Right Section */}
            <div className="flex items-center space-x-3">
              {/* Desktop Action Buttons */}
              <div className="hidden lg:flex items-center space-x-3">
                {/* Wishlist Button */}
                <button className="p-2.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-300 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 group hover:scale-105">
                  <FiHeart className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </button>

                {/* Cart Button */}
                <button className="p-2.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-300 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 group hover:scale-105">
                  <FiShoppingBag className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
                </button>

                {/* Admin Button */}
                <Link 
                  href={user ? "/admin/upload" : "/admin/login"}
                  className="flex items-center space-x-2 px-4 py-2.5 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 font-medium border border-stone-800 dark:border-stone-200 hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  <FiUser className="w-4 h-4" />
                  <span className="hidden xl:inline">Admin</span>
                </Link>
              </div>
              
              {/* Dark Mode Toggle */}
              <button
                onClick={toggleDarkMode}
                className="p-2.5 bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-300 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 group hover:scale-105"
                aria-label="Toggle dark mode"
              >
                {darkMode ? (
                  <FiSun className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" />
                ) : (
                  <FiMoon className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" />
                )}
              </button>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}