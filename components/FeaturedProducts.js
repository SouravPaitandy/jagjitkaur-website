"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  FiHeart,
  FiShoppingBag,
  FiEye,
  FiStar,
  FiArrowRight,
} from "react-icons/fi";
import { useCart } from "@/context/CartContext";

const featuredProducts = [
  {
    id: "noor-sharara-set-001",
    name: "Noor Sharara 3 Piece Set",
    price: "₹8,999",
    originalPrice: "₹12,999",
    image:
      "https://res.cloudinary.com/dwqf6wp14/image/upload/v1751039112/kurta1_q3ak8i.jpg",
    description: "Elegant 3-piece ensemble perfect for festive occasions",
    category: "sharara-sets",
    fabric: "Pure Cotton",
    work: "Hand Block Print",
    origin: "Jaipur",
    occasion: "Festive",
    rating: 4.8,
    reviews: 24,
    features: ["3-Piece Set", "Hand Block Print", "Pure Cotton"],
    badge: "Best Seller",
    isNew: false,
    // New detailed description for components
    components: {
      kurta:
        "Knee-length kurta with intricate block print patterns and comfortable A-line silhouette",
      sharara:
        "Flared palazzo-style sharara with elastic waistband for comfort and style",
      dupatta: "Matching dupatta with delicate border detailing and soft drape",
    },
    setIncludes: ["Kurta", "Sharara", "Dupatta"],
    care: "Dry clean recommended, gentle hand wash with mild detergent",
    sizing: "Regular fit, size chart available",
  },
  {
    id: "mehendi-palazzo-set-002",
    name: "Mehendi Palazzo 3 Piece Set",
    price: "₹6,999",
    originalPrice: "₹9,999",
    image:
      "https://res.cloudinary.com/dwqf6wp14/image/upload/v1751039060/saree1_ftmgbt.jpg",
    description: "Vibrant palazzo set with traditional mehendi motifs",
    category: "palazzo-sets",
    fabric: "Rayon",
    work: "Digital Print",
    origin: "Mumbai",
    occasion: "Casual",
    rating: 4.6,
    reviews: 18,
    features: ["3-Piece Set", "Digital Print", "Comfortable Fit"],
    badge: "Editor's Choice",
    isNew: true,
    components: {
      kurta: "Short kurta with modern cut and vibrant mehendi-inspired prints",
      palazzo:
        "Wide-leg palazzo pants with elastic waistband and flowing silhouette",
      dupatta:
        "Lightweight dupatta with complementary print and tasseled edges",
    },
    setIncludes: ["Kurta", "Palazzo", "Dupatta"],
    care: "Machine wash cold, iron on low heat",
    sizing: "Relaxed fit, true to size",
  },
  {
    id: "anarkali-churidar-set-003",
    name: "Royal Anarkali Churidar Set",
    price: "₹15,999",
    originalPrice: "₹22,999",
    image:
      "https://res.cloudinary.com/dwqf6wp14/image/upload/v1751039060/lehenga1_nyjmt9.jpg",
    description: "Majestic anarkali set with heavy embroidery work",
    category: "anarkali-sets",
    fabric: "Georgette",
    work: "Heavy Embroidery",
    origin: "Lucknow",
    occasion: "Wedding",
    rating: 5.0,
    reviews: 12,
    features: ["Heavy Embroidery", "Designer Cut", "Bridal Collection"],
    badge: "Premium",
    isNew: false,
    components: {
      anarkali:
        "Floor-length anarkali with intricate zari and thread embroidery, fitted bodice with flared hem",
      churidar:
        "Matching churidar with traditional fit and comfortable stretch fabric",
      dupatta:
        "Heavy embroidered dupatta with gold zari border and delicate beadwork",
    },
    setIncludes: ["Anarkali", "Churidar", "Dupatta"],
    care: "Dry clean only, store in cotton bags",
    sizing: "Semi-fitted, customization available",
  },
];

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart, items, toggleCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  // const isInCart = items.some(item =>
  //   item.id === (product.firestoreId || product.id)
  // );

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

  function createSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();
  }

  const handleAddToCart = async () => {
    setIsAdding(true);

    // Add to cart
    addToCart(product);

    // Show success state
    setTimeout(() => {
      setIsAdding(false);
      setJustAdded(true);

      // Reset after showing success
      setTimeout(() => {
        setJustAdded(false);
      }, 2000);
    }, 800);
  };

  const handleGoToCart = () => {
    // Open the cart sidebar
    toggleCart();
  };

  return (
    <section
      id="featured-products"
      className="relative py-20 lg:py-32 bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full blur-3xl opacity-25 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600 rounded-full blur-2xl opacity-20 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-stone-300 dark:bg-stone-600 flex-1 max-w-xs"></div>
            <div className="mx-6 flex flex-col items-center justify-center">
              <Image
                src="/images/newlogo.png"
                alt="JK"
                width={70}
                height={70}
                className="transition-all ease-out duration-700 hover:scale-105"
              />
            </div>
            <div className="h-px bg-stone-300 dark:bg-stone-600 flex-1 max-w-xs"></div>
          </div>

          <h2 className="font-vogue-bold text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 mb-6 tracking-wide">
            CURATED MASTERPIECES
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Handpicked treasures that showcase the finest
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              {" "}
              Indian craftsmanship
            </span>
            , where every thread tells a story of heritage and every design
            celebrates timeless elegance.
          </p>

          {/* Category Tags */}
          <div className="flex flex-wrap justify-center gap-3 mt-8">
            {["Sarees", "Lehengas", "Kurtas"].map((category, index) => (
              <span
                key={category}
                className="bg-white/80 dark:bg-stone-800/80 text-stone-700 dark:text-stone-300 px-4 py-2 rounded-lg text-sm font-medium border border-stone-200 dark:border-stone-700 backdrop-blur-sm transition-all duration-300 hover:shadow-md"
              >
                {category}
              </span>
            ))}
          </div>
        </div>

        {/* Enhanced Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className={`group relative bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-500 transform border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 200}ms` }}
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image Container */}
              <div className="relative aspect-[4/5] overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  loading="lazy"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-110 transition-all ease-out duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Product Badges */}
                <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
                  {product.isNew && (
                    <span className="bg-stone-600 text-white px-3 py-1 rounded-md text-xs font-bold shadow-lg">
                      ✨ NEW
                    </span>
                  )}
                  <span className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-3 py-1 rounded-md text-xs font-bold shadow-lg">
                    {product.badge}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/90 dark:bg-stone-800/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110">
                  <FiHeart className="w-4 h-4 text-stone-600 dark:text-stone-300 hover:text-red-600 dark:hover:text-red-400 transition-colors" />
                </button>

                {/* Quick Actions */}
                <div
                  className={`absolute bottom-4 left-4 right-4 z-10 flex gap-2 transform transition-all duration-300 ${
                    hoveredProduct === product.id
                      ? "translate-y-0 opacity-100"
                      : "translate-y-4 opacity-0"
                  }`}
                >
                  <Link
                    href={`/product/${createSlug(product.name)}`}
                    className="flex-1 bg-white/95 dark:bg-stone-800/95 backdrop-blur-sm text-stone-900 dark:text-white px-4 py-2 text-sm font-medium flex items-center justify-center gap-2 hover:bg-white dark:hover:bg-stone-700 transition-colors shadow-lg"
                  >
                    <FiEye className="w-4 h-4" />
                    Quick View
                  </Link>
                  {/* <button
                    onClick={
                      items.some((item) => item.id === product.id)
                        ? handleGoToCart
                        : handleAddToCart
                    }
                    className="cursor-pointer bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-4 py-2 rounded-full text-sm font-medium flex items-center justify-center gap-2 hover:bg-stone-900 dark:hover:bg-stone-100 transition-colors shadow-lg"
                  >
                    {items.some((item) => item.id === product.id) ? (
                      <FiShoppingBag className="w-4 h-4" />
                    ) : (
                      <FiArrowRight className="w-4 h-4" />
                    )}
                  </button> */}
                </div>

                {/* Discount Badge */}
                {product.originalPrice && (
                  <div className="absolute top-4 right-16 bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-2 py-1 rounded-full text-xs font-bold">
                    {Math.round(
                      ((parseInt(product.originalPrice.replace(/[^\d]/g, "")) -
                        parseInt(product.price.replace(/[^\d]/g, ""))) /
                        parseInt(product.originalPrice.replace(/[^\d]/g, ""))) *
                        100
                    )}
                    % OFF
                  </div>
                )}
              </div>

              {/* Enhanced Product Info */}
              <div className="p-6 space-y-4">
                {/* Category & Origin */}
                <div className="flex items-center justify-between text-xs">
                  <span className="bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2 py-1 rounded-md font-medium">
                    {product.category
                      .split("-")
                      .map(
                        (word) => word.charAt(0).toUpperCase() + word.slice(1)
                      )
                      .join(" ")}
                  </span>
                  {product.origin && (
                    <span className="text-stone-500 dark:text-stone-400 flex items-center">
                      🏛️ {product.origin}
                    </span>
                  )}
                </div>

                {/* Product Name */}
                <h3 className="font-fira-sans text-xl font-light text-stone-900 dark:text-white leading-tight group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed line-clamp-1">
                  {product.description}
                </p>

                {/* Rating */}
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <FiStar
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating)
                            ? "text-amber-500 fill-current"
                            : "text-stone-300 dark:text-stone-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                {/* Price & CTA */}
                <div className="flex items-center justify-between pt-2 border-t border-stone-200 dark:border-stone-700">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <span className="text-2xl lg:text-3xl font-bold text-stone-900 dark:text-white">
                        {product.price}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-stone-500 dark:text-stone-400 line-through">
                          {product.originalPrice}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-stone-500 dark:text-stone-400">
                      Free shipping • 7-day returns
                    </p>
                  </div>

                  <Link
                    href={`/product/${createSlug(product.name)}`}
                    className="bg-stone-800 dark:bg-stone-200 hover:bg-stone-900 dark:hover:bg-stone-100 text-white dark:text-stone-900 px-6 py-3 font-medium shadow-lg hover:shadow-xl flex items-center gap-2"
                  >
                    <span>View</span>
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-all duration-500 ease-out" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced View All Section */}
        <div
          className={`text-center mt-16 lg:mt-20 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          } animation-delay-600`}
        >
          <div className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm p-8 lg:p-12 border border-stone-200 dark:border-stone-700 shadow-lg">
            <h3 className="font-fira-sans text-2xl lg:text-3xl font-light text-stone-900 dark:text-white mb-4 tracking-wide">
              Discover Our Heritage Collection
            </h3>
            <p className="text-stone-600 dark:text-stone-300 mb-8 max-w-2xl mx-auto text-lg">
              Explore hundreds of handcrafted treasures, each piece carefully
              curated to celebrate the artistry and traditions of Indian
              fashion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products"
                className="group inline-flex items-center px-8 py-4 bg-stone-800 dark:bg-stone-200 hover:bg-stone-900 dark:hover:bg-stone-100 text-white dark:text-stone-900 font-medium shadow-lg hover:shadow-xl"
              >
                <span>Explore All Products</span>
                <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all ease-out duration-500" />
              </Link>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-stone-600 dark:text-stone-300">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Free Shipping</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span>Authentic</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-amber-100 dark:bg-amber-900/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-amber-600 dark:text-amber-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                      />
                    </svg>
                  </div>
                  <span>Handcrafted</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
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

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
