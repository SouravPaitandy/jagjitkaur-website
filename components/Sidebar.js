"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { 
  FiMenu, 
  FiX, 
  FiChevronRight, 
  FiHome, 
  FiShoppingBag, 
  FiHeart, 
  FiUser, 
  FiPhone, 
  FiInfo,
  FiStar,
  FiGift
} from "react-icons/fi";

export default function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
      setIsOpen(false);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const categories = [
  {
    name: "Sharara Sets",
    href: "/products?category=sharara-sets",
    icon: "👗",
    description: "3-piece traditional sets"
  },
  {
    name: "Palazzo Sets",
    href: "/products?category=palazzo-sets",
    icon: "🥻",
    description: "Contemporary comfort"
  },
  {
    name: "Anarkali Sets",
    href: "/products?category=anarkali-sets",
    icon: "👘",
    description: "Regal elegance"
  },
  {
    name: "Gharara Sets",
    href: "/products?category=gharara-sets",
    icon: "✨",
    description: "Festive grandeur"
  },
  {
    name: "Kurti Sets",
    href: "/products?category=kurti-sets",
    icon: "🌸",
    description: "Modern simplicity"
  },
  {
    name: "Co-ord Sets",
    href: "/products?category=co-ord-sets",
    icon: "🎀",
    description: "Perfect coordination"
  }
];

  const quickLinks = [
    {
      name: "Home",
      href: "/",
      icon: FiHome
    },
    {
      name: "All Collections",
      href: "/products",
      icon: FiShoppingBag
    },
    {
      name: "New Arrivals",
      href: "/products?sort=newest",
      icon: FiStar
    },
    {
      name: "Best Sellers",
      href: "#featured-products",
      icon: FiGift
    },
    {
      name: "About Us",
      href: "#brand-story",
      icon: FiInfo
    },
    {
      name: "Contact",
      href: "#contact",
      icon: FiPhone
    }
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Toggle Button for Mobile */}
      {(
        <button
          onClick={toggleSidebar}
          className={`fixed top-20 left-4 z-50 cursor-pointer p-3 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 rounded-md shadow-lg hover:shadow-xl transition-all duration-300 ${
            isOpen ? 'opacity-0 pointer-events-none' : 'opacity-100'
          }`}
          aria-label="Open navigation menu"
          title="Open navigation menu"
        >
          <FiMenu className="w-5 h-5" />
        </button>
      )}

      {/* Sidebar Overlay for Mobile */}
      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white dark:bg-stone-800 border-r border-stone-200 dark:border-stone-700 shadow-xl z-50 transition-all duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } ${isMobile ? 'w-80' : 'w-72'}`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-stone-200 dark:border-stone-700">
            <div className="flex items-center justify-between">
              <h2 className="font-fira-sans text-xl font-bold text-stone-900 dark:text-white">
                Collections
              </h2>
              {(
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-stone-100 dark:hover:bg-stone-700 rounded-md transition-colors"
                  aria-label="Close navigation menu"
                >
                  <FiX className="w-5 h-5 text-stone-600 dark:text-stone-300" />
                </button>
              )}
            </div>
            <p className="text-sm text-stone-600 dark:text-stone-400 mt-2">
              Explore our heritage collections
            </p>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-6 space-y-8">
            {/* Categories */}
            <div>
              <h3 className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-4">
                Shop by Category
              </h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    href={category.href}
                    onClick={() => isMobile && setIsOpen(false)}
                    className="group flex items-center p-3 rounded-md hover:bg-stone-100 dark:hover:bg-stone-700 transition-all duration-200 border border-transparent hover:border-stone-200 dark:hover:border-stone-600"
                  >
                    <span className="text-2xl mr-3">{category.icon}</span>
                    <div className="flex-1">
                      <div className="text-stone-900 dark:text-white font-medium group-hover:text-stone-700 dark:group-hover:text-stone-200">
                        {category.name}
                      </div>
                      <div className="text-xs text-stone-500 dark:text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300">
                        {category.description}
                      </div>
                    </div>
                    <FiChevronRight className="w-4 h-4 text-stone-400 group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors" />
                  </Link>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-sm font-semibold text-stone-500 dark:text-stone-400 uppercase tracking-wider mb-4">
                Quick Links
              </h3>
              <div className="space-y-1">
                {quickLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => isMobile && setIsOpen(false)}
                    className="group flex items-center p-3 rounded-md hover:bg-stone-100 dark:hover:bg-stone-700 transition-all duration-200"
                  >
                    <link.icon className="w-4 h-4 mr-3 text-stone-600 dark:text-stone-400 group-hover:text-stone-700 dark:group-hover:text-stone-300" />
                    <span className="text-stone-900 dark:text-white font-medium group-hover:text-stone-700 dark:group-hover:text-stone-200">
                      {link.name}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Featured Banner */}
            <div className="bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-700 dark:to-stone-800 rounded-lg p-4 border border-stone-200 dark:border-stone-600">
              <div className="text-center">
                <div className="text-2xl mb-2">🎊</div>
                <h4 className="font-semibold text-stone-900 dark:text-white text-sm mb-1">
                  New Collection
                </h4>
                <p className="text-xs text-stone-600 dark:text-stone-300 mb-3">
                  Discover our latest handcrafted pieces
                </p>
                <Link
                  href="/products?sort=newest"
                  onClick={() => isMobile && setIsOpen(false)}
                  className="inline-flex items-center px-3 py-1.5 bg-stone-700 dark:bg-stone-300 text-white dark:text-stone-900 text-xs font-medium rounded-md hover:bg-stone-800 dark:hover:bg-stone-200 transition-colors"
                >
                  Explore Now
                </Link>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 border-t border-stone-200 dark:border-stone-700">
            <div className="text-center">
              <div className="text-xs text-stone-500 dark:text-stone-400 mb-2">
                Handcrafted with ❤️
              </div>
              <div className="font-fira-sans text-sm font-bold text-stone-700 dark:text-stone-300">
                JAGJIT KAUR
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content spacer for desktop */}
      {!isMobile && isOpen && (
        <div className="w-72 flex-shrink-0" />
      )}
    </>
  );
}