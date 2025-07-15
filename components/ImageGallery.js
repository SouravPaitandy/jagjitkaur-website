"use client";
import { useState } from "react";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight, FiX } from "react-icons/fi";

export default function ImageGallery({ images, productName }) {
  const [currentImage, setCurrentImage] = useState(0);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[3/4] relative overflow-hidden bg-stone-50 dark:bg-stone-800 flex items-center justify-center">
        <p className="text-stone-400 dark:text-stone-600">No images available</p>
      </div>
    );
  }

  const nextImage = () => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  const openLightbox = (index) => {
    setCurrentImage(index);
    setIsLightboxOpen(true);
  };

  const closeLightbox = () => {
    setIsLightboxOpen(false);
  };

  return (
    <>
      {/* Mobile Layout */}
      <div className="lg:hidden">
        {/* Main Product Image - Mobile */}
        <div className="aspect-[3/4] relative overflow-hidden bg-stone-50 dark:bg-stone-800 group mb-4">
          <Image
            src={images[currentImage]?.url || images[0]?.url}
            alt={`${productName} - Image ${currentImage + 1}`}
            fill
            className="object-cover group-hover:scale-105 transition-all duration-700 ease-out cursor-pointer"
            priority
            onClick={() => openLightbox(currentImage)}
          />
          
          {/* Navigation arrows for mobile */}
          {images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-stone-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-stone-700 transition-all duration-300"
              >
                <FiChevronLeft className="w-5 h-5" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-stone-800/80 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-stone-700 transition-all duration-300"
              >
                <FiChevronRight className="w-5 h-5" />
              </button>
            </>
          )}
          
          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs">
              {currentImage + 1} / {images.length}
            </div>
          )}
        </div>

        {/* Thumbnail Navigation - Mobile */}
        {images.length > 1 && (
          <div className="flex space-x-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`flex-shrink-0 w-16 h-16 relative overflow-hidden bg-stone-50 dark:bg-stone-800 transition-all duration-300 ${
                  index === currentImage
                    ? "border-2 border-stone-800 dark:border-stone-200"
                    : "border-2 border-transparent hover:border-stone-300 dark:hover:border-stone-600"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop Layout */}
      <div className="hidden lg:block">
        <div className="grid grid-cols-4 gap-6">
          {/* Main Product Image - Desktop */}
          <div className="col-span-3">
            <div className="aspect-[3/4] relative overflow-hidden bg-stone-50 dark:bg-stone-800 group">
              <Image
                src={images[currentImage]?.url || images[0]?.url}
                alt={`${productName} - Image ${currentImage + 1}`}
                fill
                className="object-cover group-hover:scale-105 transition-all duration-700 ease-out cursor-pointer"
                priority
                onClick={() => openLightbox(currentImage)}
              />
              
              {/* Navigation arrows for desktop */}
              {images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-stone-800/80 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-stone-700 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <FiChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 dark:bg-stone-800/80 p-3 rounded-full shadow-lg hover:bg-white dark:hover:bg-stone-700 transition-all duration-300 opacity-0 group-hover:opacity-100"
                  >
                    <FiChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
              
              {/* Image counter */}
              {images.length > 1 && (
                <div className="absolute bottom-4 right-4 bg-black/60 text-white px-3 py-1 rounded text-sm opacity-0 group-hover:opacity-100 transition-all duration-300">
                  {currentImage + 1} / {images.length}
                </div>
              )}
            </div>
          </div>

          {/* Thumbnail Navigation - Desktop */}
          <div className="space-y-3">
            {images.slice(0, 3).map((image, index) => (
              <button
                key={index}
                onClick={() => setCurrentImage(index)}
                className={`aspect-[3/4] w-full relative overflow-hidden bg-stone-50 dark:bg-stone-800 transition-all duration-300 group ${
                  index === currentImage
                    ? "border-2 border-stone-800 dark:border-stone-200"
                    : "border-2 border-transparent hover:border-stone-300 dark:hover:border-stone-600"
                }`}
              >
                <Image
                  src={image.url}
                  alt={`${productName} thumbnail ${index + 1}`}
                  fill
                  className="object-cover group-hover:scale-110 transition-all duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-all duration-300"></div>
              </button>
            ))}
            
            {/* Show more indicator */}
            {images.length > 3 && (
              <div className="aspect-[4/3] w-full relative overflow-hidden bg-stone-100 dark:bg-stone-800 border-2 border-dashed border-stone-300 dark:border-stone-600 flex items-center justify-center cursor-pointer hover:bg-stone-200 dark:hover:bg-stone-700 transition-all duration-300">
                <span className="text-stone-600 dark:text-stone-400 text-sm">
                  +{images.length - 3}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {isLightboxOpen && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 bg-white/20 hover:bg-white/30 p-2 rounded-full text-white transition-all duration-300"
            >
              <FiX className="w-6 h-6" />
            </button>

            {/* Navigation buttons */}
            {images.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white transition-all duration-300"
                >
                  <FiChevronLeft className="w-8 h-8" />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 bg-white/20 hover:bg-white/30 p-3 rounded-full text-white transition-all duration-300"
                >
                  <FiChevronRight className="w-8 h-8" />
                </button>
              </>
            )}

            {/* Main image */}
            <div className="relative w-full h-full max-w-4xl max-h-[90vh] mx-4">
              <Image
                src={images[currentImage]?.url}
                alt={`${productName} - Image ${currentImage + 1}`}
                fill
                className="object-contain"
                onClick={closeLightbox}
              />
            </div>

            {/* Image counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-4 py-2 rounded text-sm">
                {currentImage + 1} / {images.length}
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}