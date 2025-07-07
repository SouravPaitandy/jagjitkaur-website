"use client";
import { useState, useEffect } from "react";
import Header from "../components/Header";
import HeroSection from "../components/HeroSection";
import FeaturedProducts from "../components/FeaturedProducts";
import BrandStory from "../components/BrandStory";
import InstagramFeed from "../components/InstagramFeed";
import Footer from "../components/Footer";
import DeveloperCredit from "../components/DeveloperCredit";
import Sidebar from "../components/Sidebar";
import { FiArrowUp } from "react-icons/fi";

export default function Home() {
  const [showScrollToTop, setShowScrollToTop] = useState(false);

  // Scroll-to-top button visibility logic
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      console.log("scrollpos: ", scrollPosition);
      console.log("docheight-600: ", documentHeight - 600);

      setShowScrollToTop(scrollPosition >= documentHeight - 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <main className="min-h-screen">
      <Header />
      {/* Main Content */}
      <div className="flex-1">
        {/* Enhanced Scroll to Top Button */}
        <div
          className={`fixed bottom-16 right-6 z-50 transition-all duration-300 transform ${
            showScrollToTop
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10 pointer-events-none"
          }`}
        >
          <button
            onClick={scrollToTop}
            className="group p-3 bg-stone-700 dark:bg-stone-300 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-600 dark:border-stone-400 hover:border-stone-500 dark:hover:border-stone-300 backdrop-blur-sm hover:scale-110"
            aria-label="Scroll to top"
          >
            <FiArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
          </button>
        </div>
        {/* Sidebar */}
        <Sidebar />
        <HeroSection />
        <FeaturedProducts />
        <BrandStory />
        <InstagramFeed />
        <Footer />
        <DeveloperCredit />
      </div>
    </main>
  );
}
