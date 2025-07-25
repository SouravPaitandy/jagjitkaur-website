"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import { fetchProductsFromFirestore } from "@/lib/fetchProducts";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiShoppingBag } from "react-icons/fi";

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const { addToCart, items, toggleCart } = useCart();
  const { addToWishlist, toggleWishlist } = useWishlist();

  // Fetch products from Firebase
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const allProducts = await fetchProductsFromFirestore();

        // Sort products by creation date (newest first)
        // const sortedProducts = allProducts.sort((a, b) => {
        //   const dateA = new Date(a.createdAt || 0);
        //   const dateB = new Date(b.createdAt || 0);
        //   return dateB - dateA;
        // });

        // Get the newest 4 products
        const newestProducts = allProducts.slice(0, 4);
        setFeaturedProducts(newestProducts);
        setIsLoading(false);
      } catch (error) {
        console.error("Error fetching featured products:", error);
        setIsLoading(false);
      }
    };

    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("featured-products");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const handleAddToCart = (product) => {
    addToCart(product);
    setTimeout(() => {
      toggleCart();
    }, 300);
  };

  const handleAddToWishlist = (product) => {
    addToWishlist(product);
    setTimeout(() => {
      toggleWishlist();
    }, 300);
  };

  if (isLoading) {
    return (
      <section className="py-20 lg:py-32 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="h-8 w-64 bg-stone-200 dark:bg-stone-700 rounded animate-pulse mx-auto mb-4"></div>
            <div className="h-4 w-96 bg-stone-100 dark:bg-stone-800 rounded animate-pulse mx-auto"></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {[1, 2, 3, 4].map((n) => (
              <div
                key={n}
                className="aspect-[3/4] bg-stone-100 dark:bg-stone-800 rounded-lg animate-pulse"
              ></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (featuredProducts.length === 0) {
    return (
      <section className="py-20 lg:py-32 bg-white dark:bg-stone-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="font-vogue-bold text-3xl sm:text-4xl text-stone-900 dark:text-stone-100 mb-4">
            No Featured Products
          </h2>
          <p className="text-stone-600 dark:text-stone-300 mb-8">
            Please check back later for our latest arrivals.
          </p>
          <Link
            href="/products"
            className="inline-flex items-center px-6 py-3 bg-stone-800 dark:bg-stone-200 hover:bg-stone-900 dark:hover:bg-stone-100 text-white dark:text-stone-900 font-medium transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            View All Products
            <FiArrowRight className="ml-2 w-5 h-5" />
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section
      id="featured-products"
      className="py-20 lg:py-32 bg-white dark:bg-stone-900 relative overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="font-vogue-bold text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 mb-6 tracking-wide">
            NEW ARRIVALS
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Discover our latest additions to the{" "}
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              Collections
            </span>
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id || 'prd-' + index}
              className={`${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              } animation-delay-${index * 200}`}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <ProductCard
                product={product}
                onAddToCart={handleAddToCart}
                onAddToWishlist={handleAddToWishlist}
                isHovered={hoveredProduct === product.id}
              />
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div
          className={`text-center mt-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          } animation-delay-800`}
        >
          <Link
            href="/products"
            className="group inline-flex items-center px-8 py-4 bg-stone-800 dark:bg-stone-200 hover:bg-stone-900 dark:hover:bg-stone-100 text-white dark:text-stone-900 font-medium transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105"
          >
            <span className="mr-3">VIEW ALL COLLECTIONS</span>
            <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      {/* Animation Styles */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-200 {
          animation-delay: 200ms;
        }
        .animation-delay-400 {
          animation-delay: 400ms;
        }
        .animation-delay-600 {
          animation-delay: 600ms;
        }
        .animation-delay-800 {
          animation-delay: 800ms;
        }
      `}</style>
    </section>
  );
}