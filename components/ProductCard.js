"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  function createSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();
  }

  return (
    <>
      <div
        className="group relative bg-white dark:bg-stone-900 overflow-hidden transition-all duration-500 ease-out hover:shadow-xl hover:shadow-stone-200/20 dark:hover:shadow-stone-800/20 animate-fade-in-up"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Product Image */}
        <div className="relative aspect-[3/4] overflow-hidden bg-stone-50 dark:bg-stone-800">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className={`object-cover transition-all duration-700 ease-out ${
              isHovered ? 'scale-110' : 'scale-100'
            } ${imageLoaded ? 'opacity-100' : 'opacity-0'}`}
            onLoad={() => setImageLoaded(true)}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />

          {/* Loading Skeleton */}
          {!imageLoaded && (
            <div className="absolute inset-0 bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600 animate-pulse">
              <div className="w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer"></div>
            </div>
          )}

          {/* Quick Shop Overlay */}
          <div className={`absolute inset-0 bg-gradient-to-t from-black/40 via-black/10 to-transparent flex items-center justify-center transition-all duration-500 ease-out ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}>
            <Link
              href={`/product/${createSlug(product.name)}`}
              className={`font-fira-sans bg-white/90 dark:bg-stone-900/90 text-stone-900 dark:text-stone-100 px-6 py-2 text-sm tracking-wide hover:bg-white dark:hover:bg-stone-800 transition-all duration-300 ease-out hover:scale-105 active:scale-95 shadow-lg backdrop-blur-sm transform ${
                isHovered ? 'translate-y-0 scale-100' : 'translate-y-2 scale-95'
              }`}
            >
              VIEW DETAILS
            </Link>
          </div>
        </div>

        {/* Product Information */}
        <div className="p-4 space-y-4">
          {/* Product Name */}
          <h3 className="font-fira-sans text-sm font-light text-stone-900 dark:text-stone-100 group-hover:text-stone-600 dark:group-hover:text-stone-400 transition-colors duration-300 tracking-wide">
            {product.name}
          </h3>

          {/* Pricing */}
          <div className="flex items-baseline space-x-2">
            <span className="text-base font-light text-stone-900 dark:text-stone-100 transition-colors duration-300">
              ₹{product.price}
            </span>
            {product.originalPrice && product.originalPrice !== product.price && (
              <span className="text-sm text-stone-500 dark:text-stone-400 line-through transition-colors duration-300">
                ₹{product.originalPrice}
              </span>
            )}
          </div>

          {/* Action Button */}
          <Link
            href={`/product/${createSlug(product.name)}`}
            className="block w-full text-center border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 hover:border-stone-800 dark:hover:border-stone-200 hover:text-stone-900 dark:hover:text-stone-100 py-2 px-4 transition-all duration-300 ease-out hover:scale-[1.02] active:scale-[0.98] hover:shadow-md"
          >
            <span className="font-fira-sans text-xs tracking-widest">VIEW PRODUCT</span>
          </Link>
        </div>
      </div>

      {/* Custom CSS for animations */}
      <style jsx>{`
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

        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out;
        }

        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }

        .animate-pulse {
          animation: pulse 2s infinite;
        }

        /* Smooth hover effects with hardware acceleration */
        .group:hover .transition-all {
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          transform: translateZ(0);
        }

        /* Prevent layout shift on hover */
        .group {
          will-change: transform;
        }
      `}</style>
    </>
  );
}