"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function ProductCard({ product }) {
  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const formatDate = (date) => {
    if (!date) return "";
    return new Intl.DateTimeFormat("en-IN", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }).format(new Date(date));
  };

  function createSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, '') // Remove special characters
      .replace(/\s+/g, '-') // Replace spaces with hyphens
      .trim();
  }

  // Stone-themed Badge components
  const Badge = ({ type, text }) => {
    const styles = {
      origin:
        "bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 border border-stone-300 dark:border-stone-600",
      fabric:
        "bg-stone-200 dark:bg-stone-700 text-stone-800 dark:text-stone-200 border border-stone-400 dark:border-stone-500",
      work: 
        "bg-stone-50 dark:bg-stone-900 text-stone-600 dark:text-stone-400 border border-stone-200 dark:border-stone-700",
    };

    return (
      <span
        className={`${styles[type]} px-3 py-1 rounded-md text-xs font-medium tracking-wide`}
      >
        {text}
      </span>
    );
  };

  // Stone-themed Icon components
  const IconButton = ({ children, className, title }) => (
    <button
      className={`bg-white/95 dark:bg-stone-900/95 backdrop-blur-md text-stone-700 dark:text-stone-300 p-3 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl border border-stone-200 dark:border-stone-700 ${className}`}
      title={title}
    >
      {children}
    </button>
  );

  return (
    <div
      className="group relative bg-white dark:bg-stone-900 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Subtle backdrop */}
      <div className="absolute inset-0 bg-stone-50/40 dark:bg-stone-800/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

      {/* Product Image Section */}
      <div className="relative aspect-[4/5] overflow-hidden bg-stone-100 dark:bg-stone-800">
        <Image
          src={product.image}
          alt={product.name}
          loading="lazy"
          fill
          className={`object-cover transition-all duration-500 ease-out ${
            isHovered ? "scale-105" : "scale-100"
          } ${imageLoaded ? "opacity-100" : "opacity-0"}`}
          onLoad={() => setImageLoaded(true)}
        />

        {/* Loading skeleton */}
        {!imageLoaded && (
          <div className="absolute inset-0 bg-stone-200 dark:bg-stone-700">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 dark:via-stone-600/20 to-transparent animate-shimmer"></div>
          </div>
        )}

        {/* Overlay */}
        <div
          className={`absolute inset-0 bg-stone-900/40 transition-all duration-300 ${
            isHovered ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Action overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
            isHovered ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          <div className="flex space-x-4">
            <Link
              href={`/product/${createSlug(product.name)}`}
              className="bg-white/95 dark:bg-stone-900/95 backdrop-blur-md text-stone-700 dark:text-stone-300 p-4 rounded-md hover:bg-stone-50 dark:hover:bg-stone-800 transition-all duration-300 transform hover:scale-110 shadow-xl border border-stone-200 dark:border-stone-700"
              title="View Details"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                />
              </svg>
            </Link>

            <IconButton title="Add to Wishlist">
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
            </IconButton>
          </div>
        </div>

        {/* Heritage badge */}
        <div className="absolute top-4 left-4 z-10">
          <div className="bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 text-xs font-bold px-3 py-1.5 rounded-md shadow-lg">
            <span className="flex items-center space-x-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M9.664 1.319a.75.75 0 01.672 0 41.059 41.059 0 018.198 5.424.75.75 0 01-.254 1.285 31.372 31.372 0 00-7.86 3.83.75.75 0 01-.84 0 31.508 31.508 0 00-2.08-1.287V9.394c0-.244.116-.463.302-.592a35.504 35.504 0 013.305-2.033.75.75 0 00-.714-1.319 37 37 0 00-3.446 2.12A2.216 2.216 0 006 9.393v.38a31.293 31.293 0 00-4.28-1.746.75.75 0 01-.254-1.285 41.059 41.059 0 018.198-5.424zM6 11.459a29.848 29.848 0 00-2.455-1.158 41.029 41.029 0 00-.39 3.114.75.75 0 00.419.74c.528.256 1.046.53 1.554.82-.21-.399-.328-.839-.328-1.296a.75.75 0 011.5 0c0 .457-.118.897-.328 1.296a35.539 35.539 0 011.558-.82.75.75 0 00.419-.74 41.029 41.029 0 00-.39-3.114A29.708 29.708 0 006 11.459zm8 0a29.848 29.848 0 012.455-1.158 41.029 41.029 0 01.39 3.114.75.75 0 01-.419.74c-.528.256-1.046.53-1.554.82.21-.399.328-.839.328-1.296a.75.75 0 00-1.5 0c0 .457.118.897.328 1.296a35.539 35.539 0 00-1.558-.82.75.75 0 01-.419-.74 41.029 41.029 0 01.39-3.114A29.708 29.708 0 0014 11.459z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Heritage</span>
            </span>
          </div>
        </div>

        {/* Exclusive badge if applicable */}
        {product.originalPrice && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 text-xs font-bold px-3 py-1 rounded-md shadow-lg">
              Exclusive
            </div>
          </div>
        )}
      </div>

      {/* Product Info Section */}
      <div className="p-6 space-y-4 relative">
        {/* Decorative border */}
        <div className="absolute top-0 left-6 right-6 h-px bg-stone-200 dark:bg-stone-700"></div>

        {/* Header */}
        <div className="space-y-3">
          <div className="space-y-2">
            <h3 className="font-fira-sans text-xl font-semibold text-stone-900 dark:text-stone-100 leading-tight group-hover:text-stone-700 dark:group-hover:text-stone-300 transition-colors duration-300">
              {product.name}
            </h3>

            {/* Subtitle */}
            <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">
              Traditional {product.work} • Artisan Heritage
            </p>
          </div>

          {/* Badges */}
          <div className="flex items-center gap-2 flex-wrap">
            <Badge type="origin" text={product.origin} />
            <Badge type="fabric" text={product.fabric} />
          </div>

          {/* Rating and certification */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-4 h-4 text-amber-500 dark:text-amber-400 fill-current"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>
              <span className="text-xs text-stone-500 dark:text-stone-400 font-medium">
                (24 reviews)
              </span>
            </div>

            {/* Authenticity mark */}
            <div className="flex items-center space-x-1 text-xs text-stone-700 dark:text-stone-300">
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Certified</span>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-stone-600 dark:text-stone-400 text-sm leading-relaxed line-clamp-2">
            {product.description}
          </p>
        </div>

        {/* Price Section */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center space-x-3">
                <span className="text-2xl font-bold text-stone-900 dark:text-stone-100 font-fira-sans">
                  {product.price}
                </span>
                {product.originalPrice && (
                  <span className="text-lg text-stone-500 dark:text-stone-400 line-through font-medium">
                    {product.originalPrice}
                  </span>
                )}
              </div>
              <p className="text-xs text-stone-600 dark:text-stone-400 flex items-center font-medium">
                <svg
                  className="w-3 h-3 mr-1 text-stone-700 dark:text-stone-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
                Premium Collection
              </p>
            </div>

            <div
              className={`transition-all duration-300 transform ${
                isHovered ? "opacity-100" : "opacity-90"
              }`}
            >
              <Link
                href={`/product/${createSlug(product.name)}`}
                className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-4 py-3 rounded-md text-sm font-semibold transition-all duration-300 text-center border border-stone-600 dark:border-stone-400 hover:shadow-lg transform hover:scale-105"
              >
                View Details
              </Link>
            </div>
          </div>
        </div>

        {product.createdAt && (
          <div className="absolute top-4 right-6 flex items-center gap-1.5 group-hover:opacity-100 opacity-70 transition-opacity duration-300">
            <svg 
              className="w-3.5 h-3.5 text-stone-600 dark:text-stone-400" 
              fill="none" 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span className="text-xs font-medium text-stone-500 dark:text-stone-400">
              {formatDate(product.createdAt)}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}