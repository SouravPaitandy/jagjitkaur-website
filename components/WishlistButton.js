"use client";

import { useState } from 'react';
import { useWishlist } from '@/context/WishlistContext';
import { FiHeart } from 'react-icons/fi';

export default function WishlistButton({ 
  product, 
  variant = 'default', 
  size = 'default',
  showText = false,
  className = '' 
}) {
  const { toggleWishlistItem, isInWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);

  const isInWishlistState = isInWishlist(product.firestoreId || product.id);

  const handleToggleWishlist = async () => {
    setIsAnimating(true);
    
    // Toggle wishlist item
    toggleWishlistItem(product);
    
    // Reset animation state
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  // Size variants
  const sizeClasses = {
    small: 'p-2 text-sm',
    default: 'p-3 text-base',
    large: 'p-4 text-lg'
  };

  // Style variants
  const variantClasses = {
    default: `
      bg-white dark:bg-stone-900 
      border border-stone-300 dark:border-stone-600 
      hover:border-stone-800 dark:hover:border-stone-200 
      text-stone-600 dark:text-stone-400 
      hover:text-stone-800 dark:hover:text-stone-200
    `,
    filled: `
      ${isInWishlistState 
        ? 'bg-red-500 border-red-500 text-white hover:bg-red-600' 
        : 'bg-stone-100 dark:bg-stone-800 border-stone-200 dark:border-stone-700 text-stone-600 dark:text-stone-400 hover:bg-red-50 dark:hover:bg-red-900/20 hover:border-red-200 dark:hover:border-red-800 hover:text-red-600 dark:hover:text-red-400'
      }
    `,
    minimal: `
      bg-transparent 
      border-none 
      text-stone-600 dark:text-stone-400 
      hover:text-red-600 dark:hover:text-red-400
    `,
    floating: `
      bg-white/90 dark:bg-stone-800/90 
      backdrop-blur-sm 
      border border-stone-200 dark:border-stone-700 
      text-stone-600 dark:text-stone-400 
      hover:text-red-600 dark:hover:text-red-400
      shadow-lg hover:shadow-xl
    `
  };

  const baseClasses = `
    transition-all duration-300 
    hover:scale-110 active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
    relative overflow-hidden cursor-pointer
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <button
      onClick={handleToggleWishlist}
      disabled={isAnimating}
      className={baseClasses}
      aria-label={isInWishlistState ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
      title={isInWishlistState ? `Remove ${product.name} from wishlist` : `Add ${product.name} to wishlist`}
    >
      {/* Animation Overlay */}
      <div 
        className={`absolute inset-0 bg-red-500 flex items-center justify-center transition-all duration-500 ${
          isAnimating ? 'scale-110 opacity-100' : 'scale-0 opacity-0'
        }`}
      >
        <div className="flex items-center gap-2 text-white">
          <FiHeart className="w-5 h-5 fill-current" />
        </div>
      </div>

      {/* Button Content */}
      <div className={`flex items-center gap-2 transition-opacity duration-300 ${
        isAnimating ? 'opacity-0' : 'opacity-100'
      }`}>
        <FiHeart 
          className={`w-5 h-5 transition-all duration-300 ${
            isInWishlistState 
              ? 'fill-current text-red-500' 
              : 'text-current'
          }`} 
        />
        {showText && (
          <span className="text-sm font-medium">
            {isInWishlistState ? 'REMOVE' : 'WISHLIST'}
          </span>
        )}
      </div>
    </button>
  );
}