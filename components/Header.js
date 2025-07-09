'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "@/lib/firebase";
import Image from 'next/image';

export default function Header() {
  const [darkMode, setDarkMode] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [user, loading] = useAuthState(auth);

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

  return (
    <header 
      className={`fixed w-full top-0 z-40 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 dark:bg-stone-900/95 backdrop-blur-md shadow-lg border-b border-stone-200/50 dark:border-stone-700/50' 
          : 'bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm border-b border-stone-200/30 dark:border-stone-700/30'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo Section */}
          <Link href="/" className="flex items-center group">
            <div className="relative">
              <Image 
                src="/images/logo.png" 
                alt='JAGJIT KAUR' 
                width={140} 
                height={56}
                className="transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <span className="font-fira-sans text-xl ml-3 font-bold text-stone-800 dark:text-stone-200 transition-colors duration-300 group-hover:text-stone-600 dark:group-hover:text-stone-300">
              &#x2665;
            </span>
          </Link> 

          {/* Navigation Links - Desktop */}
          <div className="hidden md:flex items-center space-x-8">
            {[
              { href: "/", label: "Home" },
              { href: "/products", label: "Collection" },
              { href: "#brand-story", label: "About" },
              { href: "#contact", label: "Contact" },
              { href: user ? "/admin/upload" : "/admin/login", label: "Admin" }
            ].map((link) => (
              <Link 
                key={link.href}
                href={link.href} 
                className="relative font-fira-sans font-medium text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-all duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-stone-800 dark:bg-stone-200 transition-all duration-300 group-hover:w-full"></span>
              </Link>
            ))}
          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Mobile Admin Link */}
            <Link 
              href={user ? "/admin/upload" : "/admin/login"}
              className="md:hidden text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-300 font-medium"
            >
              Admin
            </Link>
            
            {/* Dark Mode Toggle */}
            <button
              onClick={toggleDarkMode}
              className="p-2.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-300 border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 group"
              aria-label="Toggle dark mode"
            >
              {darkMode ? (
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:rotate-12" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg className="w-5 h-5 transition-transform duration-300 group-hover:-rotate-12" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}