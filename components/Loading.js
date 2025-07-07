"use client";
import { useState, useEffect } from "react";

export function Loading({ 
  type = "page", // "page", "button", "inline", "splash"
  size = "medium", // "small", "medium", "large"
  message = "Loading...",
  showMessage = true 
}) {
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === "...") return "";
        return prev + ".";
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  const sizeClasses = {
    small: "w-4 h-4",
    medium: "w-6 h-6", 
    large: "w-8 h-8"
  };

  const containerClasses = {
    page: "fixed inset-0 bg-white dark:bg-stone-900 z-50 flex items-center justify-center",
    button: "flex items-center justify-center",
    inline: "flex items-center space-x-2",
    splash: "fixed inset-0 bg-gradient-to-br from-stone-50 to-stone-100 dark:from-stone-900 dark:to-stone-800 z-50 flex items-center justify-center"
  };

  if (type === "splash") {
    return (
      <div className={containerClasses[type]}>
        <div className="text-center">
          {/* Brand Logo Animation */}
          <div className="mb-8">
            <div className="relative">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-stone-600 to-stone-800 dark:from-stone-300 dark:to-stone-100 rounded-full flex items-center justify-center shadow-2xl animate-pulse">
                <span className="text-2xl font-bold text-white dark:text-stone-900 font-fira-sans">
                  JK
                </span>
              </div>
              
              {/* Rotating Ring */}
              <div className="absolute inset-0 w-20 h-20 mx-auto">
                <div className="w-full h-full border-4 border-stone-200 dark:border-stone-700 rounded-full animate-spin border-t-stone-600 dark:border-t-stone-300"></div>
              </div>
            </div>
            
            <h1 className="font-fira-sans text-2xl font-bold text-stone-900 dark:text-white mb-2">
              JAGJIT KAUR
            </h1>
            <p className="text-stone-600 dark:text-stone-400 text-sm">
              Heritage Fashion
            </p>
          </div>

          {/* Loading Animation */}
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-stone-600 dark:bg-stone-300 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-stone-600 dark:bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "0.1s" }}></div>
            <div className="w-2 h-2 bg-stone-600 dark:bg-stone-300 rounded-full animate-bounce" style={{ animationDelay: "0.2s" }}></div>
          </div>

          <p className="text-stone-500 dark:text-stone-400 text-sm">
            Crafting your experience{dots}
          </p>
        </div>
      </div>
    );
  }

  if (type === "page") {
    return (
      <div className={containerClasses[type]}>
        <div className="text-center">
          {/* Elegant Loading Animation */}
          <div className="relative mb-6">
            <div className="w-16 h-16 mx-auto">
              <div className="absolute inset-0 border-4 border-stone-200 dark:border-stone-700 rounded-full"></div>
              <div className="absolute inset-0 border-4 border-transparent border-t-stone-600 dark:border-t-stone-300 rounded-full animate-spin"></div>
              <div className="absolute inset-2 border-2 border-transparent border-t-stone-400 dark:border-t-stone-500 rounded-full animate-spin" style={{ animationDirection: "reverse", animationDuration: "1.5s" }}></div>
            </div>
          </div>

          {showMessage && (
            <>
              <h2 className="font-fira-sans text-lg font-semibold text-stone-900 dark:text-white mb-2">
                {message}
              </h2>
              <div className="flex justify-center space-x-1">
                <div className="w-2 h-2 bg-stone-600 dark:bg-stone-300 rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-stone-600 dark:bg-stone-300 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
                <div className="w-2 h-2 bg-stone-600 dark:bg-stone-300 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
              </div>
            </>
          )}
        </div>
      </div>
    );
  }

  // Inline and Button Loading
  return (
    <div className={containerClasses[type]}>
      <div className={`border-2 border-stone-200 dark:border-stone-600 border-t-stone-600 dark:border-t-stone-300 rounded-full animate-spin ${sizeClasses[size]}`}></div>
      {showMessage && type === "inline" && (
        <span className="text-stone-600 dark:text-stone-400 text-sm">
          {message}
        </span>
      )}
    </div>
  );
}

 export function ProductDetailSkeleton() {
  return (
    <div className="min-h-screen bg-stone-50 dark:bg-stone-900">
      {/* Breadcrumb Skeleton */}
      <div className="bg-white dark:bg-stone-800 py-6 border-b border-stone-200 dark:border-stone-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-6 w-3/4 bg-stone-200 dark:bg-stone-700 rounded animate-pulse"></div>
          <div className="mt-4 h-8 w-1/3 bg-stone-200 dark:bg-stone-700 rounded animate-pulse"></div>
        </div>
      </div>

      {/* Product Detail Skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Image Section Skeleton */}
          <div className="flex gap-4 lg:gap-6">
            {/* Thumbnail Skeletons */}
            <div className="flex flex-col gap-3 w-16 md:w-20 lg:w-24">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse"
                ></div>
              ))}
            </div>

            {/* Main Image Skeleton */}
            <div className="flex-1">
              <div className="aspect-[4/5] bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse"></div>
            </div>
          </div>

          {/* Product Info Skeleton */}
          <div className="space-y-8">
            {/* Title & Price Skeleton */}
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <div className="h-10 w-24 bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse"></div>
                  <div className="h-10 w-32 bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse"></div>
                </div>
                
                <div className="h-16 w-full bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse"></div>
                
                <div className="h-20 bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse"></div>
              </div>

              {/* Price Skeleton */}
              <div className="h-40 bg-stone-200 dark:bg-stone-700 rounded-xl animate-pulse"></div>
              
              {/* Description Skeleton */}
              <div className="h-48 bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse"></div>
              
              {/* Product Details Skeleton */}
              <div className="space-y-6">
                <div className="h-64 bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse"></div>
                <div className="h-64 bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse"></div>
              </div>
              
              {/* Action Buttons Skeleton */}
              <div className="h-20 bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Related Products Skeleton */}
        <div className="mt-20">
          <div className="text-center mb-12">
            <div className="h-12 w-1/2 bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse mx-auto"></div>
            <div className="h-8 w-3/4 bg-stone-200 dark:bg-stone-700 rounded-md animate-pulse mx-auto mt-4"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div 
                key={i}
                className="bg-stone-200 dark:bg-stone-700 rounded-md h-80 animate-pulse"
                style={{ animationDelay: `${i * 150}ms` }}
              ></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Additional Loading Components for specific use cases
export function ProductCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-stone-200 dark:bg-stone-700 aspect-[3/4] rounded-lg mb-4"></div>
      <div className="space-y-2">
        <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-3/4"></div>
        <div className="h-3 bg-stone-200 dark:bg-stone-700 rounded w-1/2"></div>
      </div>
    </div>
  );
}

export function CategoryCardSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="bg-stone-200 dark:bg-stone-700 aspect-square rounded-lg mb-3"></div>
      <div className="h-4 bg-stone-200 dark:bg-stone-700 rounded w-2/3 mx-auto"></div>
    </div>
  );
}