"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { 
  FiHome, 
  FiArrowLeft, 
  FiSearch, 
  FiShoppingBag,
  FiHeart,
  FiStar
} from "react-icons/fi";

export default function NotFound({ 
  type = "page", // "page", "product", "category"
  title,
  description,
  showSuggestions = true 
}) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const suggestions = {
    page: [
      { name: "Home", href: "/", icon: FiHome },
      { name: "All Collections", href: "/products", icon: FiShoppingBag },
      { name: "New Arrivals", href: "/products?sort=newest", icon: FiStar },
      { name: "Contact Us", href: "/contact", icon: FiHeart }
    ],
    product: [
      { name: "All Products", href: "/products", icon: FiShoppingBag },
      { name: "Sarees", href: "/products?category=sarees", icon: "👘" },
      { name: "Lehengas", href: "/products?category=lehengas", icon: "🌸" },
      { name: "Kurtas", href: "/products?category=kurtas", icon: "🌿" }
    ],
    category: [
      { name: "All Categories", href: "/products", icon: FiShoppingBag },
      { name: "Featured Items", href: "/products?featured=true", icon: FiStar },
      { name: "New Arrivals", href: "/products?sort=newest", icon: FiHeart },
      { name: "Best Sellers", href: "/products?sort=popular", icon: "🏆" }
    ]
  };

  const content = {
    page: {
      title: title || "Page Not Found",
      description: description || "The page you're looking for seems to have wandered off like a beautiful silk scarf in the wind.",
      emoji: "🌸",
      code: "404"
    },
    product: {
      title: title || "Product Not Found",
      description: description || "This beautiful piece might be out of stock or no longer available in our collection.",
      emoji: "👗",
      code: "404"
    },
    category: {
      title: title || "Category Not Found",
      description: description || "This collection category is currently not available or may have been moved.",
      emoji: "🎀",
      code: "404"
    }
  };

  const currentContent = content[type];
  const currentSuggestions = suggestions[type];

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 flex items-center justify-center px-4 py-8 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div 
          className="absolute w-64 h-64 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse"
          style={{
            left: mousePosition.x / 10 + 'px',
            top: mousePosition.y / 10 + 'px',
            transform: 'translate(-50%, -50%)'
          }}
        />
        <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600 rounded-full blur-2xl opacity-20 animate-bounce" style={{ animationDuration: '3s' }} />
        <div className="absolute bottom-1/4 left-1/4 w-48 h-48 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full blur-3xl opacity-25 animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="relative z-10 text-center max-w-2xl mx-auto">
        {/* 404 Code */}
        <div className="mb-8">
          <div className="relative inline-block">
            <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-stone-600 to-stone-800 dark:from-stone-300 dark:to-stone-100 bg-clip-text text-transparent font-fira-sans">
              {currentContent.code}
            </h1>
            <div className="absolute inset-0 text-8xl md:text-9xl font-bold text-stone-200 dark:text-stone-700 -z-10 blur-sm">
              {currentContent.code}
            </div>
          </div>
        </div>

        {/* Emoji and Animation */}
        <div className="mb-6">
          <div className="text-6xl mb-4 animate-bounce">
            {currentContent.emoji}
          </div>
          <div className="flex justify-center space-x-2 mb-4">
            <div className="w-2 h-2 bg-stone-400 dark:bg-stone-500 rounded-full animate-pulse"></div>
            <div className="w-2 h-2 bg-stone-400 dark:bg-stone-500 rounded-full animate-pulse" style={{ animationDelay: "0.5s" }}></div>
            <div className="w-2 h-2 bg-stone-400 dark:bg-stone-500 rounded-full animate-pulse" style={{ animationDelay: "1s" }}></div>
          </div>
        </div>

        {/* Title and Description */}
        <h2 className="text-3xl md:text-4xl font-bold text-stone-900 dark:text-white mb-4 font-fira-sans">
          {currentContent.title}
        </h2>
        
        <p className="text-lg text-stone-600 dark:text-stone-300 mb-8 max-w-md mx-auto leading-relaxed">
          {currentContent.description}
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
          <button
            onClick={() => window.history.back()}
            className="inline-flex items-center px-6 py-3 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 font-medium rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <FiArrowLeft className="w-5 h-5 mr-2" />
            Go Back
          </button>
          
          <Link
            href="/"
            className="inline-flex items-center px-6 py-3 border-2 border-stone-700 dark:border-stone-300 text-stone-700 dark:text-stone-300 font-medium rounded-md hover:bg-stone-700 dark:hover:bg-stone-300 hover:text-white dark:hover:text-stone-900 transition-all duration-300 transform hover:scale-105"
          >
            <FiHome className="w-5 h-5 mr-2" />
            Go Home
          </Link>
        </div>

        {/* Suggestions */}
        {showSuggestions && (
          <div className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-md rounded-2xl p-6 border border-stone-200 dark:border-stone-700 shadow-xl">
            <h3 className="text-xl font-semibold text-stone-900 dark:text-white mb-4 flex items-center justify-center">
              <FiSearch className="w-5 h-5 mr-2" />
              You might be looking for
            </h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentSuggestions.map((suggestion, index) => (
                <Link
                  key={suggestion.name}
                  href={suggestion.href}
                  className="group flex items-center p-3 rounded-lg border border-stone-200 dark:border-stone-600 hover:border-stone-300 dark:hover:border-stone-500 hover:bg-stone-50 dark:hover:bg-stone-700 transition-all duration-300 transform hover:scale-105"
                >
                  {typeof suggestion.icon === 'string' ? (
                    <span className="text-2xl mr-3">{suggestion.icon}</span>
                  ) : (
                    <suggestion.icon className="w-5 h-5 mr-3 text-stone-600 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300" />
                  )}
                  <span className="text-stone-900 dark:text-white font-medium group-hover:text-stone-700 dark:group-hover:text-stone-200">
                    {suggestion.name}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Brand Footer */}
        <div className="mt-12 text-center">
          <div className="text-sm text-stone-500 dark:text-stone-400 mb-2">
            Crafted with ❤️ by
          </div>
          <div className="font-fira-sans text-lg font-bold text-stone-700 dark:text-stone-300">
            JAGJIT KAUR
          </div>
        </div>
      </div>
    </div>
  );
}

