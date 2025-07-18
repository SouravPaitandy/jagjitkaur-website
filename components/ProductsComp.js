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
  const [isLoading, setIsLoading] = useState(false);

  // Handle URL parameters for category filtering
  useEffect(() => {
    const categoryParam = searchParams.get("category");
    if (categoryParam) {
      const categoryMap = {
        "pehchaan": "pehchaan",
        "potli-bags": "potli-bags",
        "custom-made": "custom-made",
      };

      const mappedCategory = categoryMap[categoryParam.toLowerCase()] || categoryParam.toLowerCase();
      const availableCategories = [...new Set(products.map((product) => product.category.toLowerCase()))];

      if (availableCategories.includes(mappedCategory)) {
        setFilterBy(mappedCategory);
      } else {
        setFilterBy("all");
      }
    }
  }, [searchParams, products]);

  // Handle URL parameters for sorting
  useEffect(() => {
    const sortParam = searchParams.get("sort");
    if (sortParam) {
      const validSortOptions = {
        name: "name",
        price: "price",
        newest: "newest",
      };

      if (validSortOptions[sortParam.toLowerCase()]) {
        setSortBy(validSortOptions[sortParam.toLowerCase()]);
      }
    }
  }, [searchParams]);

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

  // Add loading simulation for filter/sort changes
  const handleFilterChange = (newFilter) => {
    setIsLoading(true);
    setTimeout(() => {
      setFilterBy(newFilter);
      setIsLoading(false);
    }, 300);
  };

  const handleSortChange = (newSort) => {
    setIsLoading(true);
    setTimeout(() => {
      setSortBy(newSort);
      setIsLoading(false);
    }, 300);
  };

  // Enhanced filter and sort products
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filterBy === "all" ||
      product.category.toLowerCase() === filterBy.toLowerCase();
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
      "pehchaan": "Pehchaan Collection",
      "potli-bags": "Potli Bags",
      "custom-made": "Custom Made",
    };
    return (
      displayNames[category.toLowerCase()] ||
      category.charAt(0).toUpperCase() + category.slice(1)
    );
  };

  // Don't render scroll button until client-side hydration is complete
  const ScrollToTopButton = () => {
    if (!isClient) return null;

    return (
      <div
        className={`fixed bottom-16 right-6 z-50 transition-all duration-500 ease-out transform ${
          showScrollToTop
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-10 pointer-events-none"
        }`}
      >
        <button
          onClick={scrollToTop}
          className="group p-3 bg-stone-700 dark:bg-stone-300 hover:bg-stone-800 dark:hover:bg-stone-200 text-white dark:text-stone-900 shadow-lg hover:shadow-xl transition-all duration-300 border border-stone-600 dark:border-stone-400 hover:border-stone-500 dark:hover:border-stone-300 backdrop-blur-sm hover:scale-110"
          aria-label="Scroll to top"
        >
          <FiArrowUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" />
        </button>
      </div>
    );
  };

  return (
    <>
      <main className="relative min-h-screen bg-white dark:bg-stone-900">
        <ScrollToTopButton />

        {/* Simple Breadcrumb with fade-in animation */}
        <div className="border-b border-stone-200 dark:border-stone-700 animate-fade-in">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <nav className="flex items-center space-x-2 text-xs tracking-wide text-stone-500 dark:text-stone-400">
              <Link
                href="/"
                className="hover:text-stone-800 dark:hover:text-stone-200 transition-colors duration-300"
              >
                HOME
              </Link>
              <span className="animate-pulse">/</span>
              <span className="text-stone-800 dark:text-stone-200">
                COLLECTIONS
              </span>
            </nav>
          </div>
        </div>

        {/* Minimalist Hero Section with slide-up animation */}
        <div className="bg-white dark:bg-stone-900 py-16 animate-slide-up">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h1 className="font-vogue-bold text-4xl md:text-5xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide animate-fade-in-up delay-200">
              {filterBy !== "all"
                ? getCategoryDisplayName(filterBy)
                : "All Collections"}
            </h1>
            <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto animate-fade-in-up delay-400">
              {filterBy !== "all"
                ? `Discover our handcrafted ${getCategoryDisplayName(filterBy).toLowerCase()}`
                : "Explore our complete range of handcrafted traditional wear and accessories"}
            </p>
          </div>
        </div>

        {/* Clean Filters and Search Section with slide-down animation */}
        <div className="bg-white dark:bg-stone-900 border-b border-stone-200 dark:border-stone-700 sticky top-0 z-40 animate-slide-down backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            <div className="flex flex-col lg:flex-row justify-between items-center space-y-4 lg:space-y-0 lg:space-x-8">
              {/* Search Bar with expand animation */}
              <div className="relative flex-1 max-w-md w-full animate-expand">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiSearch className="h-5 w-5 text-stone-400 animate-pulse" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="font-fira-sans w-full pl-10 pr-4 py-3 bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300 focus:scale-105 focus:shadow-lg"
                />
              </div>

              {/* Filter and Sort Controls */}
              <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto">
                {/* Filter Toggle for Mobile */}
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="font-fira-sans lg:hidden w-full sm:w-auto bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-4 py-3 font-medium hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 active:scale-95"
                >
                  <FiFilter
                    className={`w-4 h-4 transition-transform duration-300 ${
                      showFilters ? "rotate-180" : ""
                    }`}
                  />
                  Filters & Sort
                </button>

                {/* Desktop Filters with slide animation */}
                <div
                  className={`${
                    showFilters ? "flex animate-slide-down" : "hidden"
                  } lg:flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4 w-full lg:w-auto`}
                >
                  {/* Category Filter */}
                  <div className="flex items-center space-x-3 w-full sm:w-auto animate-fade-in">
                    <label className="font-fira-sans text-sm font-medium text-stone-700 dark:text-stone-300 whitespace-nowrap">
                      Category:
                    </label>
                    <select
                      value={filterBy}
                      onChange={(e) => handleFilterChange(e.target.value)}
                      className="w-full sm:w-auto bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 px-4 py-2 text-sm text-stone-900 dark:text-white focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300 hover:scale-105 focus:scale-105"
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
                  <div className="font-fira-sans flex items-center space-x-3 w-full sm:w-auto animate-fade-in delay-100">
                    <label className="text-sm font-medium text-stone-700 dark:text-stone-300 whitespace-nowrap">
                      Sort by:
                    </label>
                    <select
                      value={sortBy}
                      onChange={(e) => handleSortChange(e.target.value)}
                      className="w-full sm:w-auto bg-white dark:bg-stone-900 border border-stone-300 dark:border-stone-600 px-4 py-2 text-sm text-stone-900 dark:text-white focus:border-stone-800 dark:focus:border-stone-200 transition-all duration-300 hover:scale-105 focus:scale-105"
                    >
                      <option value="name">Name (A-Z)</option>
                      <option value="price">Price (Low-High)</option>
                      <option value="newest">Newest First</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* View Toggle and Results */}
              <div className="flex items-center space-x-4 w-full lg:w-auto justify-between lg:justify-end animate-fade-in delay-200">
                <span className="text-sm text-stone-600 dark:text-stone-400 animate-pulse">
                  {sortedProducts.length} of {products.length} products
                </span>

                <div className="flex items-center space-x-1 border border-stone-300 dark:border-stone-600 transition-all duration-300 hover:shadow-md">
                  <button
                    onClick={() => setIsGridView(true)}
                    className={`p-2 transition-all duration-300 ${
                      isGridView
                        ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 scale-110"
                        : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:scale-105"
                    }`}
                    aria-label="Grid view"
                  >
                    <FiGrid className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setIsGridView(false)}
                    className={`p-2 transition-all duration-300 ${
                      !isGridView
                        ? "bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 scale-110"
                        : "text-stone-600 dark:text-stone-400 hover:bg-stone-100 dark:hover:bg-stone-800 hover:scale-105"
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

        {/* Products Grid/List with staggered animation */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Active Filters Display with slide-in animation */}
          {(filterBy !== "all" || searchQuery) && (
            <div className="mb-8 flex flex-wrap items-center gap-3 animate-slide-in">
              <span className="font-fira-sans text-sm font-medium text-stone-700 dark:text-stone-300">
                Active filters:
              </span>

              {filterBy !== "all" && (
                <span className="inline-flex items-center gap-2 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-3 py-1 text-sm animate-bounce-in">
                  {getCategoryDisplayName(filterBy)}
                  <button
                    onClick={() => handleFilterChange("all")}
                    className="hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 hover:scale-110 active:scale-95"
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
                <span className="inline-flex items-center gap-2 bg-stone-600 dark:bg-stone-400 text-white dark:text-stone-900 px-3 py-1 text-sm animate-bounce-in delay-100">
                  "{searchQuery}"
                  <button
                    onClick={() => setSearchQuery("")}
                    className="hover:bg-white/20 dark:hover:bg-black/20 transition-all duration-300 hover:scale-110 active:scale-95"
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
                  handleFilterChange("all");
                  setSearchQuery("");
                }}
                className="font-fira-sans text-sm text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-all duration-300 underline hover:scale-105 active:scale-95"
              >
                Clear all
              </button>
            </div>
          )}

          {/* Loading Overlay */}
          {isLoading && (
            <div className="fixed inset-0 bg-white/80 dark:bg-stone-900/80 backdrop-blur-sm z-50 flex items-center justify-center">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-stone-800 dark:bg-stone-200 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-stone-800 dark:bg-stone-200 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-stone-800 dark:bg-stone-200 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          )}

          {/* Products Grid with staggered animation */}
          <div
            className={`${
              isGridView
                ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
                : "space-y-8"
            } transition-all duration-500`}
          >
            {sortedProducts.map((product, index) => (
              <div
                key={product.firestoreId || product.id || `product-${index}`}
                className="animate-fade-in-up"
                style={{
                  animationDelay: `${index * 100}ms`,
                  animationFillMode: "both",
                }}
              >
                <ProductCard product={product} isListView={!isGridView} />
              </div>
            ))}
          </div>

          {/* Empty State with bounce animation */}
          {sortedProducts.length === 0 && (
            <div className="text-center py-20 animate-bounce-in">
              <div className="w-24 h-24 mx-auto mb-6 bg-stone-100 dark:bg-stone-800 flex items-center justify-center animate-pulse">
                <FiSearch className="w-12 h-12 text-stone-400 dark:text-stone-600" />
              </div>
              <h3 className="font-fira-sans text-2xl font-light text-stone-900 dark:text-white mb-4 animate-fade-in-up">
                No Products Found
              </h3>
              <p className="font-fira-sans text-stone-600 dark:text-stone-400 mb-8 max-w-md mx-auto animate-fade-in-up delay-100">
                We couldn't find any products matching your search. Try
                adjusting your filters or search terms.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-up delay-200">
                <button
                  onClick={() => {
                    handleFilterChange("all");
                    setSearchQuery("");
                  }}
                  className="font-fira-sans bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-8 py-3 font-medium hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  View All Products
                </button>
                <button
                  onClick={() => setSearchQuery("")}
                  className="font-fira-sans border border-stone-300 dark:border-stone-600 text-stone-900 dark:text-white px-8 py-3 font-medium hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  Clear Search
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Simple Footer with slide-up animation */}
      <div className="border-t border-stone-200 dark:border-stone-700 py-8 text-center bg-white dark:bg-stone-900 animate-slide-up">
        <p className="font-fira-sans text-xs tracking-widest text-stone-500 dark:text-stone-400">
          JAGJIT KAUR • CRAFTED WITH LOVE
        </p>
      </div>

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

        @keyframes slide-up {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slide-down {
          from {
            transform: translateY(-30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        @keyframes slide-in {
          from {
            transform: translateX(-30px);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        @keyframes bounce-in {
          0% {
            transform: scale(0.3);
            opacity: 0;
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes expand {
          from {
            transform: scaleX(0.8);
            opacity: 0;
          }
          to {
            transform: scaleX(1);
            opacity: 1;
          }
        }

        @keyframes fade-in-up {
          from {
            transform: translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }

        .animate-fade-in {
          animation: fade-in 0.6s ease-out;
        }
        .animate-slide-up {
          animation: slide-up 0.8s ease-out;
        }
        .animate-slide-down {
          animation: slide-down 0.6s ease-out;
        }
        .animate-slide-in {
          animation: slide-in 0.6s ease-out;
        }
        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }
        .animate-expand {
          animation: expand 0.6s ease-out;
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .delay-100 {
          animation-delay: 100ms;
        }
        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
      `}</style>
    </>
  );
}