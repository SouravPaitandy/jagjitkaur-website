"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard.js";
import Link from "next/link";
import { FiArrowUp, FiGrid, FiList, FiFilter, FiSearch } from "react-icons/fi";

export default function ProductsPage({ products }) {
  const searchParams = useSearchParams();
  const [sortBy, setSortBy] = useState("name");
  const [filterBy, setFilterBy] = useState("all");
  const [isGridView, setIsGridView] = useState(true);
  const [showScrollToTop, setShowScrollToTop] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) {
      // Convert URL parameter to match your product categories
      const categoryMap = {
        'sarees': 'sarees',
        'lehengas': 'lehengas', 
        'kurtas': 'kurtas',
        'suits': 'suits',
        'dupattas': 'dupattas'
      };
      
      const mappedCategory = categoryMap[categoryParam.toLowerCase()] || categoryParam.toLowerCase();
      
      // Check if the category exists in your products
      const availableCategories = [...new Set(products.map(product => product.category.toLowerCase()))];
      
      if (availableCategories.includes(mappedCategory)) {
        setFilterBy(mappedCategory);
      } else {
        // If category doesn't exist, show all products
        setFilterBy("all");
      }
    }
  }, [searchParams, products]);

  // Ensure component is hydrated before rendering client-specific content
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Scroll-to-top button visibility logic
  useEffect(() => {
    if (!isClient) return;

    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      setShowScrollToTop(scrollPosition >= documentHeight / 2);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isClient]);

  const scrollToTop = () => {
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Enhanced filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesCategory = filterBy === "all" || product.category.toLowerCase() === filterBy.toLowerCase();
    const matchesSearch =
      searchQuery === "" ||
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (product.fabric &&
        product.fabric.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.work &&
        product.work.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (product.origin &&
        product.origin.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === "name") return a.name.localeCompare(b.name);
    if (sortBy === "price") {
      const priceA = parseInt(a.price.toString().replace(/[^\d]/g, "")) || 0;
      const priceB = parseInt(b.price.toString().replace(/[^\d]/g, "")) || 0;
      return priceA - priceB;
    }
    if (sortBy === "newest") {
      if (a.createdAt && b.createdAt) {
        return new Date(b.createdAt) - new Date(a.createdAt);
      }
      return b.id.localeCompare(a.id);
    }
    return 0;
  });

  // Get unique categories for filter (with proper formatting)
  const categories = [...new Set(products.map((product) => product.category))];

  // Function to get display name for category
  const getCategoryDisplayName = (category) => {
    const displayNames = {
      'saree': 'Sarees',
      'lehenga': 'Lehengas',
      'kurta': 'Kurtas',
      'suit': 'Suits',
      'dupatta': 'Dupattas'
    };
    return displayNames[category.toLowerCase()] || category.charAt(0).toUpperCase() + category.slice(1);
  };

  // Don't render scroll button until client-side hydration is complete
  const ScrollToTopButton = () => {
    if (!isClient) return null;

    return (
      <div
        className={`fixed bottom-20 right-6 z-50 transition-all duration-300 transform ${
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
    );
  };

  return (
    <>
      <main className="relative min-h-screen bg-stone-50 dark:bg-stone-900">
        <ScrollToTopButton />
        <div className="absolute top-6 left-48 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <nav className="flex items-center space-x-3 text-sm mb-4">
              <Link
                href="/"
                className="text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-colors font-medium flex items-center"
              >
                <svg
                  className="w-4 h-4 mr-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                  />
                </svg>
                Back to Home
              </Link>
            </nav>
          </div>
        </div>

        {/* Enhanced Hero Section */}
        <div className="relative bg-stone-50 dark:bg-stone-900 py-16 overflow-hidden">
          {/* Show category-specific message if filtered */}
          {filterBy !== "all" && (
            <div className="text-center mb-8">
              <div className="inline-flex items-center bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 px-6 py-2 rounded-full text-sm font-medium shadow-lg">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                </svg>
                Showing {getCategoryDisplayName(filterBy)} Collection
              </div>
            </div>
          )}

          {/* ...existing hero section code... */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-stone-200/30 dark:bg-stone-700/30 rounded-full blur-xl"></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-stone-300/20 dark:bg-stone-600/20 rounded-full blur-xl"></div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-8">
                <div className="h-px bg-gradient-to-r from-transparent via-stone-900/60 to-transparent flex-1 max-w-xs"></div>
                <div className="mx-8 relative">
                  <div className="w-16 h-16 bg-stone-200 dark:bg-stone-800 rounded-full flex items-center justify-center shadow-2xl border-4 border-stone-300/50 dark:border-stone-400/50">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 576 512"
                      className="w-8 h-8 dark:text-stone-200"
                      fill="currentColor"
                    >
                      <path d="M309 106c11.4-7 19-19.7 19-34c0-22.1-17.9-40-40-40s-40 17.9-40 40c0 14.4 7.6 27 19 34L209.7 220.6c-9.1 18.2-32.7 23.4-48.6 10.7L72 160c5-6.7 8-15 8-24c0-22.1-17.9-40-40-40S0 113.9 0 136s17.9 40 40 40c.2 0 .5 0 .7 0L86.4 427.4c5.5 30.4 32 52.6 63 52.6l277.2 0c30.9 0 57.4-22.1 63-52.6L535.3 176c.2 0 .5 0 .7 0c22.1 0 40-17.9 40-40s-17.9-40-40-40s-40 17.9-40 40c0 9 3 17.3 8 24l-89.1 71.3c-15.9 12.7-39.5 7.5-48.6-10.7L309 106z" />
                    </svg>
                  </div>
                  <div className="absolute -top-2 -left-2 w-3 h-3 bg-stone-400 dark:bg-stone-300 rounded-full animate-pulse"></div>
                  <div className="absolute -bottom-2 -right-2 w-3 h-3 bg-stone-400 dark:bg-stone-300 rounded-full animate-pulse animation-delay-200"></div>
                </div>
                <div className="h-px bg-gradient-to-l from-transparent via-stone-900/60 to-transparent flex-1 max-w-xs"></div>
              </div>

              <div className="relative">
                <h1 className="font-fira-sans text-4xl sm:text-5xl lg:text-6xl xl:text-8xl font-black text-stone-900 dark:text-stone-200 mb-8 animate-fade-in-up tracking-wider drop-shadow-lg">
                  {filterBy !== "all" ? getCategoryDisplayName(filterBy).toUpperCase() : "OUR HERITAGE"}
                </h1>
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-stone-400 to-transparent"></div>
                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-transparent via-stone-300 to-transparent"></div>
              </div>

              <div className="relative mb-6">
                <h2 className="text-xl sm:text-2xl lg:text-3xl font-serif italic text-stone-700 dark:text-stone-300 animate-fade-in-up animation-delay-200 tracking-wide">
                  {filterBy !== "all" 
                    ? `~ Exquisite ${getCategoryDisplayName(filterBy)} Collection ~`
                    : "~ Majestic Collection of Timeless Elegance ~"
                  }
                </h2>
              </div>

              {/* ...rest of existing hero code... */}
              <div className="relative max-w-5xl mx-auto">
                <div className="absolute -top-2 left-6 w-8 h-8 text-6xl text-stone-900/30 dark:text-stone-300/30 font-serif">
                  "
                </div>
                <p className="text-lg sm:text-xl lg:text-2xl text-stone-600 dark:text-stone-300 animate-fade-in-up animation-delay-400 leading-relaxed px-12 font-light">
                  Immerse yourself in an exquisite symphony of
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-stone-900 dark:from-stone-200 dark:to-amber-100">
                    {" "}
                    regal craftsmanship{" "}
                  </span>
                  and
                  <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-stone-700 to-stone-900 dark:from-stone-200 dark:to-stone-100">
                    {" "}
                    imperial artistry
                  </span>
                  . Each masterpiece is meticulously handwoven by skilled
                  artisans, carrying forward the legacy of Indian royalty
                  through threads of pure luxury and timeless sophistication.
                </p>
                <div className="absolute bottom-3 right-28 w-8 h-8 text-6xl text-stone-900/30 dark:text-stone-300/30 font-serif rotate-180">
                  "
                </div>
              </div>

              <div className="flex items-center justify-center mt-8 space-x-4 animate-fade-in-up animation-delay-400">
                <div className="w-16 h-px bg-gradient-to-r from-transparent to-stone-900/60"></div>
                <div className="flex space-x-2">
                  <div className="w-2 h-2 bg-stone-400 dark:bg-stone-300 rounded-full"></div>
                  <div className="w-3 h-3 bg-stone-500 dark:bg-stone-200 rounded-full"></div>
                  <div className="w-2 h-2 bg-stone-400 dark:bg-stone-300 rounded-full"></div>
                </div>
                <div className="w-16 h-px bg-gradient-to-l from-transparent to-stone-900/60"></div>
              </div>
            </div>

            {/* Enhanced Statistics with category-specific data */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 max-w-4xl mx-auto mt-12 animate-fade-in-up animation-delay-400">
              <div className="bg-white dark:bg-stone-800 backdrop-blur-sm rounded-md p-6 shadow-lg border border-stone-200 dark:border-stone-700">
                <div className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  {sortedProducts.length}+
                </div>
                <div className="text-sm lg:text-base text-stone-600 dark:text-stone-300 font-medium">
                  {filterBy !== "all" ? `${getCategoryDisplayName(filterBy)}` : "Unique Pieces"}
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Handpicked Collection
                </div>
              </div>

              {/* ...rest of statistics... */}
              <div className="bg-white dark:bg-stone-800 backdrop-blur-sm rounded-md p-6 shadow-lg border border-stone-200 dark:border-stone-700">
                <div className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  100%
                </div>
                <div className="text-sm lg:text-base text-stone-600 dark:text-stone-300 font-medium">
                  Handcrafted
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Artisan Made
                </div>
              </div>

              <div className="bg-white dark:bg-stone-800 backdrop-blur-sm rounded-md p-6 shadow-lg border border-stone-200 dark:border-stone-700">
                <div className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  5★
                </div>
                <div className="text-sm lg:text-base text-stone-600 dark:text-stone-300 font-medium">
                  Premium Quality
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Customer Rated
                </div>
              </div>

              <div className="bg-white dark:bg-stone-800 backdrop-blur-sm rounded-md p-6 shadow-lg border border-stone-200 dark:border-stone-700">
                <div className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                  Pan
                </div>
                <div className="text-sm lg:text-base text-stone-600 dark:text-stone-300 font-medium">
                  India Delivery
                </div>
                <div className="text-xs text-stone-500 dark:text-stone-400 mt-1">
                  Free Shipping
                </div>
              </div>
            </div>

            <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
              <svg
                className="w-6 h-6 text-stone-500 dark:text-stone-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 14l-7 7m0 0l-7-7m7 7V3"
                />
              </svg>
            </div>
          </div>
        </div>

        {/* Enhanced Filters and Search Section */}
        <div className="bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm border-b border-stone-200/50 dark:border-stone-700 sticky top-0 z-40 shadow-lg">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 lg:py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8">
              {/* Search Bar */}
              <div className="relative flex-1 max-w-md w-full">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-stone-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search by name, fabric, craft..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-600 rounded-md text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-500/30 focus:border-stone-500 transition-all duration-200 shadow-sm"
                />
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 w-full lg:w-auto">
                {/* Filter Toggle for Mobile */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden w-full sm:w-auto bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 px-4 py-3 rounded-md font-medium hover:bg-stone-800 dark:hover:bg-stone-200 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg"
                >
                  <FiFilter className="w-4 h-4" />
                  Filters & Sort
                </button>

                {/* Desktop Filters */}
                <div
                  className={`${
                    showFilters ? "flex" : "hidden"
                  } lg:flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6 w-full lg:w-auto`}
                >
                  {/* Category Filter */}
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 whitespace-nowrap">
                      Category:
                    </label>
                    <select
                      value={filterBy}
                      onChange={(e) => setFilterBy(e.target.value)}
                      className="w-full sm:w-auto bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-600 rounded-md px-4 py-2 text-sm font-medium text-stone-900 dark:text-white focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-500/30 focus:border-stone-500 transition-all duration-200 shadow-sm"
                    >
                      <option value="all">All Collections</option>
                      {categories.map((category) => (
                        <option key={category} value={category}>
                          {getCategoryDisplayName(category)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Sort Options */}
                  <div className="flex items-center space-x-3 w-full sm:w-auto">
                    <label className="text-sm font-semibold text-stone-700 dark:text-stone-300 whitespace-nowrap">
                      Sort by:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="w-full sm:w-auto bg-white dark:bg-stone-900 border-2 border-stone-200 dark:border-stone-600 rounded-md px-4 py-2 text-sm font-medium text-stone-900 dark:text-white focus:ring-4 focus:ring-stone-200 dark:focus:ring-stone-500/30 focus:border-stone-500 transition-all duration-200 shadow-sm"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="price">Price (Low-High)</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* View Toggle and Results */}
              <div className="flex items-center space-x-4 lg:space-x-6 w-full lg:w-auto justify-between lg:justify-end">
                <span className="text-sm font-medium text-stone-600 dark:text-stone-300 bg-stone-100 dark:bg-stone-700 px-3 py-2 rounded-md">
                  {sortedProducts.length} of {products.length} pieces
                </span>

                <div className="flex items-center space-x-2 bg-stone-100 dark:bg-stone-700 p-1 rounded-md">
                  <button
                    onClick={() => setIsGridView(true)}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      isGridView
                        ? "bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 shadow-lg"
                        : "text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600"
                    }`}
                    aria-label="Grid view"
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsGridView(false)}
                    className={`p-2 rounded-md transition-all duration-200 ${
                      !isGridView
                        ? "bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 shadow-lg"
                        : "text-stone-600 dark:text-stone-300 hover:bg-stone-200 dark:hover:bg-stone-600"
                    }`}
                    aria-label="List view"
                  >
                    <FiList className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Products Grid/List */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-16">
          {/* Active Filters Display */}
          {(filterBy !== "all" || searchQuery) && (
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <span className="text-sm font-medium text-stone-700 dark:text-stone-300">
                Active filters:
              </span>

              {filterBy !== "all" && (
                <span className="inline-flex items-center gap-2 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 px-3 py-1 rounded-full text-sm font-medium">
                  {getCategoryDisplayName(filterBy)}
                  <button
                    onClick={() => setFilterBy("all")}
                    className="hover:bg-white/20 dark:hover:bg-black/20 rounded-full p-0.5 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              )}

              {searchQuery && (
                <span className="inline-flex items-center gap-2 bg-stone-600 dark:bg-stone-400 text-white dark:text-stone-900 px-3 py-1 rounded-full text-sm font-medium">
                  "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:bg-white/20 dark:hover:bg-black/20 rounded-full p-0.5 transition-colors"
                  >
                    <svg
                      className="w-3 h-3"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </span>
              )}

              <button
                onClick={() => {
                  setFilterBy("all");
                  setSearchQuery("");
                }}
                className="cursor-pointer text-sm text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 font-medium transition-colors"
              >
                Clear all
              </button>
            </div>
          )}

          <div
            className={`${
              isGridView
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8"
                : "space-y-8"
            } transition-all duration-300`}
          >
            {sortedProducts.map((product, index) => (
              <div
                key={product.id}
                className="animate-fade-in-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard product={product} isListView={!isGridView} />
              </div>
            ))}
          </div>

          {/* Enhanced Empty State */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-20">
              <div className="w-32 h-32 mx-auto mb-8 bg-stone-100 dark:bg-stone-800 rounded-full flex items-center justify-center">
                <svg
                  className="w-16 h-16 text-stone-400 dark:text-stone-600"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <h3 className="text-2xl lg:text-3xl font-fira-sans font-bold text-stone-900 dark:text-white mb-4">
                No Treasures Found
              </h3>
              <p className="text-lg text-stone-600 dark:text-stone-300 mb-8 max-w-md mx-auto">
                We couldn't find any pieces matching your search. Try exploring
                different categories or adjusting your filters.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => {
                    setFilterBy("all");
                    setSearchQuery("");
                  }}
                  className="bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 px-8 py-3 rounded-md font-semibold hover:bg-stone-800 dark:hover:bg-stone-200 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  View All Collections
                </button>
                <button
                  onClick={() => setSearchQuery("")}
                  className="bg-white dark:bg-stone-800 text-stone-900 dark:text-white px-8 py-3 rounded-md font-semibold border-2 border-stone-300 dark:border-stone-600 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all duration-300"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>

        {/* ...rest of existing code for newsletter and footer... */}
        <div className="relative bg-stone-100 dark:bg-stone-800 py-16 lg:py-24 border-t border-stone-200 dark:border-stone-700 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-40 h-40 bg-stone-200/20 dark:bg-stone-700/20 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-1/4 w-60 h-60 bg-stone-300/10 dark:bg-stone-600/10 rounded-full blur-3xl"></div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="h-px bg-stone-300 dark:bg-stone-600 flex-1 max-w-xs"></div>
                <div className="mx-6 w-12 h-12 bg-stone-700 dark:bg-stone-300 rounded-full flex items-center justify-center shadow-lg">
                  <svg
                    className="w-6 h-6 text-white dark:text-stone-900"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                  </svg>
                </div>
                <div className="h-px bg-stone-300 dark:bg-stone-600 flex-1 max-w-xs"></div>
              </div>

              <h2 className="font-fira-sans text-3xl sm:text-4xl lg:text-5xl font-bold text-stone-900 dark:text-stone-100 mb-6">
                JOIN OUR HERITAGE CIRCLE
              </h2>

              <p className="text-lg lg:text-xl text-stone-700 dark:text-stone-300 mb-8 leading-relaxed max-w-2xl mx-auto">
                Be the first to discover new collections, exclusive designs, and
                timeless pieces that celebrate the artistry of Indian
                craftsmanship. Subscribe for insider access to our latest
                treasures.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <div className="flex flex-col sm:flex-row bg-white dark:bg-stone-800 rounded-md p-2 shadow-xl border border-stone-200 dark:border-stone-600">
                <input
                  type="email"
                  placeholder="Enter your email address"
                  className="flex-1 px-6 py-4 bg-transparent text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:outline-none text-lg rounded-md"
                />
                <button className="group bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-8 py-4 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform mt-2 sm:mt-0 flex items-center justify-center gap-2">
                  <span>Subscribe</span>
                  <svg
                    className="w-5 h-5 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M14 5l7 7m0 0l-7 7m7-7H3"
                    />
                  </svg>
                </button>
              </div>

              <p className="text-sm text-stone-600 dark:text-stone-400 mt-4">
                ✨ Exclusive previews • 🎁 Special offers • 📫 No spam, pure
                elegance
              </p>
            </div>
          </div>
        </div>
      </main>

      <div className="bg-stone-800 dark:bg-stone-900 py-8 lg:py-12 text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h3 className="font-fira-sans text-2xl sm:text-3xl lg:text-5xl font-extrabold text-stone-100 tracking-wider mb-4">
            JAGJIT KAUR
          </h3>
          <p className="text-lg lg:text-xl text-stone-400 font-medium mb-2">
            Where Heritage Meets Elegance
          </p>
          <p className="text-sm text-stone-500">
            Crafted with Love • Woven with Tradition • Designed for Eternity
          </p>
        </div>
      </div>

      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 0.2s;
        }

        .animation-delay-400 {
          animation-delay: 0.4s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}