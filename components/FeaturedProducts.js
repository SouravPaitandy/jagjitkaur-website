"use client";

import { useState, useEffect } from "react";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import ProductCard from "./ProductCard";
import Link from "next/link";
import { FiArrowRight, FiHeart, FiShoppingBag } from "react-icons/fi";

const featuredProducts = [
  {
    id: "pehchaan-noor-sharara-001",
    name: "Noor Sharara 3 Piece Set",
    price: "₹8,999",
    originalPrice: "₹12,999",
    image: "https://res.cloudinary.com/dwqf6wp14/image/upload/v1751039112/kurta1_q3ak8i.jpg",
    description: "Elegant 3-piece ensemble perfect for festive occasions",
    category: "pehchaan",
    fabric: "Pure Cotton",
    work: "Hand Block Print",
    origin: "Jaipur",
    occasion: "Festive",
    rating: 4.8,
    reviews: 24,
    features: ["3-Piece Set", "Hand Block Print", "Pure Cotton"],
    badge: "Best Seller",
    isNew: false,
    components: {
      kurta: "Knee-length kurta with intricate block print patterns and comfortable A-line silhouette",
      sharara: "Flared palazzo-style sharara with elastic waistband for comfort and style",
      dupatta: "Matching dupatta with delicate border detailing and soft drape",
    },
    setIncludes: ["Kurta", "Sharara", "Dupatta"],
    care: "Dry clean recommended, gentle hand wash with mild detergent",
    sizing: "Regular fit, size chart available",
  },
  {
    id: "pehchaan-mehendi-palazzo-002",
    name: "Mehendi Palazzo 3 Piece Set",
    price: "₹6,999",
    originalPrice: "₹9,999",
    image: "https://res.cloudinary.com/dwqf6wp14/image/upload/v1751039060/saree1_ftmgbt.jpg",
    description: "Vibrant palazzo set with traditional mehendi motifs",
    category: "pehchaan",
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
      dupatta: "Lightweight dupatta with complementary print and tasseled edges",
    },
    setIncludes: ["Kurta", "Palazzo", "Dupatta"],
    care: "Machine wash cold, iron on low heat",
    sizing: "Relaxed fit, true to size",
  },
  {
    id: "pehchaan-anarkali-003",
    name: "Royal Anarkali Churidar Set",
    price: "₹15,999",
    originalPrice: "₹22,999",
    image: "https://res.cloudinary.com/dwqf6wp14/image/upload/v1751039060/lehenga1_nyjmt9.jpg",
    description: "Majestic anarkali set with heavy embroidery work",
    category: "pehchaan",
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
      dupatta: "Heavy embroidered dupatta with gold zari border and delicate beadwork",
    },
    setIncludes: ["Anarkali", "Churidar", "Dupatta"],
    care: "Dry clean only, store in cotton bags",
    sizing: "Semi-fitted, customization available",
  },
  {
    id: "potli-gold-embroidered-001",
    name: "Gold Embroidered Potli Bag",
    price: "₹1,299",
    originalPrice: "₹1,899",
    image: "https://res.cloudinary.com/dwqf6wp14/image/upload/v1751039060/saree1_ftmgbt.jpg",
    description: "Handcrafted potli bag with gold embroidery",
    category: "potli-bags",
    fabric: "Silk",
    work: "Gold Thread Embroidery",
    origin: "Lucknow",
    occasion: "Wedding",
    rating: 4.7,
    reviews: 8,
    features: ["Handcrafted", "Gold Thread Work", "Drawstring Closure"],
    badge: "Exclusive",
    isNew: true,
    care: "Dry clean only",
    sizing: "One size",
  },
];

export default function FeaturedProducts() {
  const [hoveredProduct, setHoveredProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const { addToCart, items, toggleCart } = useCart();
  const { addToWishlist, toggleWishlist } = useWishlist();

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
            FEATURED COLLECTION
          </h2>
          <p className="text-lg sm:text-xl lg:text-2xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Discover our handpicked selection from the{" "}
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              Pehchaan Collection
            </span>{" "}
            and exclusive accessories
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
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