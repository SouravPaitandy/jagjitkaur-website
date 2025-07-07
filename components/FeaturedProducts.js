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

const featuredProducts = [
  {
    id: "noor-sharara-set-001",
    name: "Noor Sharara 3 Piece Set",
    price: "₹8,999",
    originalPrice: "₹12,999",
    image: "https://res.cloudinary.com/dwqf6wp14/image/upload/v1751039112/kurta1_q3ak8i.jpg",
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
      kurta: "Knee-length kurta with intricate block print patterns and comfortable A-line silhouette",
      sharara: "Flared palazzo-style sharara with elastic waistband for comfort and style",
      dupatta: "Matching dupatta with delicate border detailing and soft drape"
    },
    setIncludes: ["Kurta", "Sharara", "Dupatta"],
    care: "Dry clean recommended, gentle hand wash with mild detergent",
    sizing: "Regular fit, size chart available"
  },
  {
    id: "mehendi-palazzo-set-002",
    name: "Mehendi Palazzo 3 Piece Set",
    price: "₹6,999",
    originalPrice: "₹9,999",
    image: "https://res.cloudinary.com/dwqf6wp14/image/upload/v1751039060/saree1_ftmgbt.jpg",
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
      palazzo: "Wide-leg palazzo pants with elastic waistband and flowing silhouette",
      dupatta: "Lightweight dupatta with complementary print and tasseled edges"
    },
    setIncludes: ["Kurta", "Palazzo", "Dupatta"],
    care: "Machine wash cold, iron on low heat",
    sizing: "Relaxed fit, true to size"
  },
  {
    id: "anarkali-churidar-set-003",
    name: "Royal Anarkali Churidar Set",
    price: "₹15,999",
    originalPrice: "₹22,999",
    image: "https://res.cloudinary.com/dwqf6wp14/image/upload/v1751039060/lehenga1_nyjmt9.jpg",
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
      anarkali: "Floor-length anarkali with intricate zari and thread embroidery, fitted bodice with flared hem",
      churidar: "Matching churidar with traditional fit and comfortable stretch fabric",
      dupatta: "Heavy embroidered dupatta with gold zari border and delicate beadwork"
    },
    setIncludes: ["Anarkali", "Churidar", "Dupatta"],
    care: "Dry clean only, store in cotton bags",
    sizing: "Semi-fitted, customization available"
  }
];

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="featured-products"
      className="relative py-20 lg:py-32 bg-stone-50 dark:bg-stone-900 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-stone-200/30 dark:bg-stone-700/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-stone-300/20 dark:bg-stone-600/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-stone-100/40 dark:bg-stone-800/40 rounded-full blur-2xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-stone-300 dark:bg-stone-600 flex-1 max-w-xs"></div>
            <div className="mx-6 w-12 h-12 bg-black dark:bg-stone-300 rounded-full flex items-center justify-center shadow-lg">
              <svg
                className="w-6 h-6 text-white dark:text-stone-900"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>
            <div className="h-px bg-stone-300 dark:bg-stone-600 flex-1 max-w-xs"></div>
          </div>

          <h2 className="font-fira-sans text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 mb-6">
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
                className="bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 px-4 py-2 rounded-sm text-sm font-semibold border border-stone-200 dark:border-stone-700"
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
              className={`group relative bg-white dark:bg-stone-800 rounded-md overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform border border-stone-200 dark:border-stone-700 hover:border-stone-300 dark:hover:border-stone-600 ${
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
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                {/* Product Badges */}
                <div className="absolute top-4 left-4 z-10">
                  {product.isNew && (
                    <span className="bg-stone-600 text-white px-3 py-1 rounded-sm text-xs font-bold shadow-lg mb-2 block">
                      ✨ NEW
                    </span>
                  )}
                  <span className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-3 py-1 rounded-sm text-xs font-bold shadow-lg">
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
                    className="flex-1 bg-white/95 dark:bg-stone-800/95 backdrop-blur-sm text-stone-900 dark:text-white px-4 py-2 rounded-sm text-sm font-semibold flex items-center justify-center gap-2 hover:bg-white dark:hover:bg-stone-700 transition-colors shadow-lg"
                  >
                    <FiEye className="w-4 h-4" />
                    Quick View
                  </Link>
                  <button className="bg-stone-800 dark:bg-stone-300 text-white dark:text-stone-900 px-4 py-2 rounded-full text-sm font-semibold flex items-center justify-center gap-2 hover:bg-stone-900 dark:hover:bg-stone-200 transition-colors shadow-lg">
                    <FiShoppingBag className="w-4 h-4" />
                  </button>
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
                  <span className="bg-stone-100 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2 py-1 rounded-sm font-medium">
                    {product.category.toUpperCase()}
                  </span>
                  <span className="text-stone-500 dark:text-stone-400 flex items-center">
                    🏛️ {product.origin}
                  </span>
                </div>

                {/* Product Name */}
                <h3 className="font-fira-sans text-xl lg:text-2xl font-bold text-stone-900 dark:text-white leading-tight group-hover:text-stone-700 dark:group-hover:text-stone-200 transition-colors">
                  {product.name}
                </h3>

                {/* Description */}
                <p className="text-stone-600 dark:text-stone-300 text-sm leading-relaxed">
                  {product.description}
                </p>

                {/* Features */}
                <div className="flex flex-wrap gap-1">
                  {product.features.slice(0, 2).map((feature, idx) => (
                    <span
                      key={idx}
                      className="bg-stone-50 dark:bg-stone-700 text-stone-600 dark:text-stone-300 px-2 py-1 rounded-full text-xs font-medium"
                    >
                      {feature}
                    </span>
                  ))}
                </div>

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
                  <span className="text-sm text-stone-600 dark:text-stone-400">
                    {product.rating} ({product.reviews} reviews)
                  </span>
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
                    className="bg-stone-800 dark:bg-stone-200 hover:bg-stone-900 dark:hover:bg-stone-100 text-white dark:text-stone-900 px-6 py-3 rounded-md font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform flex items-center gap-2"
                  >
                    <span>View</span>
                    <FiArrowRight className="w-4 h-4" />
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
          <div className="bg-stone-100 dark:bg-stone-800 rounded-md p-8 lg:p-12 border border-stone-200 dark:border-stone-700">
            <h3 className="font-fira-sans text-2xl lg:text-3xl font-bold text-stone-900 dark:text-white mb-4">
              DISCOVER OUR HERITAGE COLLECTION
            </h3>
            <p className="text-stone-600 dark:text-stone-300 mb-8 max-w-2xl mx-auto text-lg">
              Explore hundreds of handcrafted treasures, each piece carefully
              curated to celebrate the artistry and traditions of Indian
              fashion.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Link
                href="/products"
                className="group inline-flex items-center px-8 py-4 bg-stone-800 dark:bg-stone-200 hover:bg-stone-900 dark:hover:bg-stone-100 text-white dark:text-stone-900 font-semibold rounded-sm transition-all duration-300 shadow-lg hover:shadow-xl transform"
              >
                <span>Explore All Products</span>
                <FiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>

              <div className="flex items-center space-x-6 text-sm text-stone-600 dark:text-stone-300">
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
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }

        .animation-delay-600 {
          animation-delay: 0.6s;
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
    </section>
  );
}
