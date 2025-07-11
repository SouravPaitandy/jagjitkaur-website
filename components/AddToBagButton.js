"use client";

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { FiShoppingBag, FiCheck, FiPlus, FiShoppingCart } from 'react-icons/fi';

export default function AddToBagButton({ 
  product, 
  variant = 'primary', 
  size = 'default',
  showIcon = true,
  className = '' 
}) {
  const { addToCart, items, toggleCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);

  const isInCart = items.some(item => 
    item.id === (product.firestoreId || product.id)
  );

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

  // Size variants
  const sizeClasses = {
    small: 'px-4 py-2 text-sm',
    default: 'px-6 py-3 text-base',
    large: 'px-8 py-4 text-lg'
  };

  // Style variants
  const variantClasses = {
    primary: `
      bg-stone-800 dark:bg-stone-200 
      text-white dark:text-stone-900 
      hover:bg-stone-900 dark:hover:bg-stone-100
      border border-stone-800 dark:border-stone-200
    `,
    secondary: `
      bg-white dark:bg-stone-900 
      text-stone-800 dark:text-stone-200 
      hover:bg-stone-50 dark:hover:bg-stone-800
      border border-stone-300 dark:border-stone-600
      hover:border-stone-800 dark:hover:border-stone-200
    `,
    outline: `
      bg-transparent 
      text-stone-800 dark:text-stone-200 
      hover:bg-stone-800 dark:hover:bg-stone-200
      hover:text-white dark:hover:text-stone-900
      border border-stone-800 dark:border-stone-200
    `
  };

  const baseClasses = `
    font-fira-sans font-medium tracking-widest
    transition-all duration-300 
    hover:scale-105 active:scale-95
    disabled:opacity-50 disabled:cursor-not-allowed
    flex items-center justify-center gap-2
    relative overflow-hidden cursor-pointer
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${className}
  `;

  return (
    <button
      onClick={isInCart ? handleGoToCart : handleAddToCart}
      disabled={isAdding}
      className={baseClasses}
      aria-label={isInCart ? `Go to shopping bag` : `Add ${product.name} to shopping bag`}
      title={isInCart ? `Go to shopping bag` : `Add ${product.name} to shopping bag`}
    >
      {/* Loading/Success Animation Overlay */}
      <div 
        className={`absolute inset-0 bg-green-600 flex items-center justify-center transition-all duration-500 ${
          isAdding || justAdded ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {isAdding ? (
          <div className="flex items-center gap-2 text-white">
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            <span className="text-sm">Adding...</span>
          </div>
        ) : justAdded ? (
          <div className="flex items-center gap-2 text-white">
            <FiCheck className="w-5 h-5" />
            <span className="text-sm">Added!</span>
          </div>
        ) : null}
      </div>

      {/* Button Content */}
      <div className={`flex items-center gap-2 transition-opacity duration-300 ${
        isAdding || justAdded ? 'opacity-0' : 'opacity-100'
      }`}>
        {showIcon && (
          <div className="relative">
            {isInCart ? (
              <FiShoppingCart className="w-5 h-5" />
            ) : (
              <FiShoppingBag className="w-5 h-5" />
            )}
          </div>
        )}
        <span>
          {isInCart ? 'GO TO BAG' : 'ADD TO BAG'}
        </span>
      </div>
    </button>
  );
}