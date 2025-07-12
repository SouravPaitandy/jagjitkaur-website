"use client";

import { useCart } from "@/context/CartContext";
import Image from "next/image";
import Link from "next/link";
import { FiX, FiMinus, FiPlus, FiShoppingBag, FiTrash2 } from "react-icons/fi";

export default function CartSidebar() {
  const {
    isOpen,
    toggleCart,
    items,
    removeFromCart,
    updateQuantity,
    itemCount,
    subtotal,
    clearCart,
  } = useCart();

  const formatPrice = (price) => {
    const numPrice = parseFloat(price.toString().replace(/[^\d]/g, ""));
    return `₹${numPrice.toLocaleString()}`;
  };

  function createSlug(name) {
    return name
      .toLowerCase()
      .replace(/[^a-z0-9\s]/g, "") // Remove special characters
      .replace(/\s+/g, "-") // Replace spaces with hyphens
      .trim();
  }

  const createMessage = () => {
    let message = `🌟 *Inquiry from Jagjit Kaur Website* 🌟\n\n`;
    message += `Hello! I'm interested in the following ${
      itemCount > 1 ? "items" : "item"
    } from my cart:\n\n`;

    // Add cart items
    items.forEach((item, index) => {
      message += `📱 *Product ${index + 1}:* ${item.name}\n`;
      if (item.price) message += `💰 *Price:* ₹${item.price}\n`;
      if (item.fabric) message += `🧵 *Fabric:* ${item.fabric}\n`;
      if (item.work) message += `✨ *Work:* ${item.work}\n`;
      if (item.origin) message += `📍 *Origin:* ${item.origin}\n`;
      if (item.occasion) message += `🎉 *Occasion:* ${item.occasion}\n`;
      message += `📦 *Quantity:* ${item.quantity}\n`;
      message += `\n`;
    });

    // Add cart summary
    message += `📋 *Cart Summary:*\n`;
    message += `• Total Items: ${itemCount}\n`;
    message += `• Subtotal: ₹${subtotal.toLocaleString()}\n\n`;

    message += `💬 *I would like to know:*\n`;
    message += `• Current availability and stock status\n`;
    message += `• Final pricing and any ongoing offers\n`;
    message += `• Size options and measurements\n`;
    message += `• Delivery time and shipping charges\n`;
    message += `• Return/exchange policy\n`;
    message += `• Care instructions\n`;
    message += `• Payment methods accepted\n\n`;

    message += `📞 *My preferred contact method:*\n`;
    message += `[ ] WhatsApp call\n`;
    message += `[ ] WhatsApp message\n`;
    message += `[ ] Regular phone call\n\n`;

    message += `⏰ *Best time to contact me:*\n`;
    message += `[ ] Morning (9 AM - 12 PM)\n`;
    message += `[ ] Afternoon (12 PM - 5 PM)\n`;
    message += `[ ] Evening (5 PM - 8 PM)\n\n`;

    message += `💬 *Additional questions/requirements:*\n`;
    message += `(Please mention any specific requirements, custom sizing, color preferences, or special requests)\n\n`;

    message += `Thank you for your time! Looking forward to hearing from you. 🙏\n\n`;
    message += `*Website:* jkbyjagjitkaur.com`;

    return encodeURIComponent(message);
  };

  const phone = process.env.NEXT_PUBLIC_WHATSAPP_PHONE; // Replace with actual business number if needed
  const link = `https://wa.me/${phone}?text=${createMessage()}`;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 lg:z-40"
          onClick={toggleCart}
        />
      )}

      {/* Cart Sidebar */}
      <div
        className={`
        fixed top-0 right-0 h-full w-full sm:w-96 bg-white dark:bg-stone-900 
        shadow-2xl z-50 lg:z-50 transform transition-all duration-700 ease-in-out
        ${isOpen ? "translate-x-0" : "translate-x-full"}
      `}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-stone-200 dark:border-stone-700">
            <div className="flex items-center gap-3">
              <FiShoppingBag className="w-6 h-6 text-stone-700 dark:text-stone-300" />
              <h2 className="font-fira-sans text-xl font-semibold text-stone-900 dark:text-stone-100">
                Shopping Bag
              </h2>
              {itemCount > 0 && (
                <span className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 text-sm px-2 py-1 font-medium">
                  {itemCount}
                </span>
              )}
            </div>
            <button
              onClick={toggleCart}
              className="p-2 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors duration-200"
              aria-label="Close cart"
            >
              <FiX className="w-6 h-6 text-stone-600 dark:text-stone-400" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full p-6 text-center">
                <div className="w-24 h-24 bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-6">
                  <FiShoppingBag className="w-12 h-12 text-stone-400 dark:text-stone-600" />
                </div>
                <h3 className="font-fira-sans text-lg font-medium text-stone-900 dark:text-stone-100 mb-2">
                  Your bag is empty
                </h3>
                <p className="text-stone-600 dark:text-stone-400 mb-6">
                  Add some beautiful pieces to get started
                </p>
                <Link
                  href="/products"
                  onClick={toggleCart}
                  className="bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 px-6 py-3 font-medium hover:bg-stone-900 dark:hover:bg-stone-100 transition-colors duration-300"
                >
                  EXPLORE COLLECTION
                </Link>
              </div>
            ) : (
              <div className="p-6 space-y-6">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    {/* Product Image */}
                    <div className="group w-20 h-24 relative overflow-hidden bg-stone-100 dark:bg-stone-800">
                      <Link
                        href={`/product/${createSlug(item.name)}`}
                        onClick={toggleCart}
                        className="block w-full h-full"
                      >
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-all ease-out duration-300"
                        />
                      </Link>
                    </div>

                    {/* Product Info */}
                    <div className="flex-1 space-y-2">
                      <h3 className="font-fira-sans font-medium text-stone-900 dark:text-stone-100 text-sm leading-tight">
                        {item.name}
                      </h3>

                      <div className="flex items-center gap-2 text-xs text-stone-600 dark:text-stone-400">
                        {item.fabric && <span>{item.fabric}</span>}
                        {item.fabric && item.origin && <span>•</span>}
                        {item.origin && <span>{item.origin}</span>}
                      </div>

                      <div className="flex items-center justify-between">
                        <span className="font-semibold text-stone-900 dark:text-stone-100">
                          {formatPrice(item.price)}
                        </span>

                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-stone-300 dark:border-stone-600">
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <FiMinus className="w-3 h-3" />
                            </button>
                            <span className="px-3 py-1 text-sm font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              className="p-1 hover:bg-stone-100 dark:hover:bg-stone-800 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <FiPlus className="w-3 h-3" />
                            </button>
                          </div>

                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 transition-colors"
                            aria-label="Remove item"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {/* Clear Cart Button */}
                {items.length > 0 && (
                  <button
                    onClick={clearCart}
                    className="w-full text-center text-sm text-stone-600 dark:text-stone-400 hover:text-red-600 dark:hover:text-red-400 transition-colors py-2 border-t border-stone-200 dark:border-stone-700"
                  >
                    Clear All Items
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Footer */}
          {items.length > 0 && (
            <div className="border-t border-stone-200 dark:border-stone-700 p-6 space-y-4">
              {/* Subtotal */}
              <div className="flex justify-between items-center">
                <span className="font-fira-sans font-medium text-stone-900 dark:text-stone-100">
                  Subtotal ({itemCount} {itemCount === 1 ? "item" : "items"})
                </span>
                <span className="text-xl font-bold text-stone-900 dark:text-stone-100">
                  ₹{subtotal.toLocaleString()}
                </span>
              </div>

              <p className="text-xs text-stone-600 dark:text-stone-400">
                All taxes calculated at checkout
              </p>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Link
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  title="Proceed to WhatsApp for inquiries"
                  onClick={toggleCart}
                  className="w-full bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 py-4 text-center font-fira-sans font-medium tracking-wide hover:bg-stone-900 dark:hover:bg-stone-100 transition-colors duration-300 block"
                >
                  PROCEED TO CHECKOUT
                </Link>

                <Link
                  href="/products"
                  onClick={toggleCart}
                  className="w-full border border-stone-300 dark:border-stone-600 text-stone-700 dark:text-stone-300 py-3 text-center font-fira-sans font-medium tracking-wide hover:border-stone-800 dark:hover:border-stone-200 transition-colors duration-300 block"
                >
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
