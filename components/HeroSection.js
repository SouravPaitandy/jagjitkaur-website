"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isChangingSlide, setIsChangingSlide] = useState(false);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const router = useRouter();
  const containerRef = useRef(null);

  // Simplified hero slides with focus on background images
  const heroSlides = [
    {
      id: 1,
      title: "DEBUT COLLECTION: PEHCHAN",
      subtitle: "First Heritage Collection",
      image: "/images/hero-img1.JPG",
      ctaText: "SHOP NOW",
      ctaLink: "/products?category=pehchaan",
    },
    {
      id: 2,
      title: "JK | CUSTOM MADE",
      subtitle: "Custom Collection",
      image: "/images/hero-img2.JPG",
      ctaText: "SHOP NOW",
      ctaLink: "/products?category=custom-made",
    },
    {
      id: 3,
      title: "POTLI BAGS",
      subtitle: "Exclusive Potli Bags Collection",
      image: "/images/hero-img3.JPG",
      ctaText: "SHOP NOW",
      ctaLink: "/products?category=potli-bags",
    },
  ];

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;
  
  // Change slide with animation
  const changeSlide = (index) => {
    setIsVisible(false); // Hide content
    setIsChangingSlide(true); // Start slide transition
    setDragOffset(0); // Reset drag offset

    // Wait for fade out before changing slide
    setTimeout(() => {
      setCurrentSlide(index);
      
      // Wait a moment before starting fade in
      setTimeout(() => {
        setIsVisible(true);
        setIsChangingSlide(false);
      }, 100);
    }, 300);
  };

  // Touch event handlers
  const onTouchStart = (e) => {
    setTouchEnd(null); // Reset touch end
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e) => {
    if (!touchStart || !isDragging) return;
    
    const currentTouch = e.targetTouches[0].clientX;
    const diff = touchStart - currentTouch;
    
    // Update drag offset for visual feedback
    setDragOffset(-diff);
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd || !isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      // Swipe left - next slide
      const nextSlide = (currentSlide + 1) % heroSlides.length;
      changeSlide(nextSlide);
    } else if (isRightSwipe) {
      // Swipe right - previous slide
      const prevSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
      changeSlide(prevSlide);
    } else {
      // Not enough distance, reset
      setDragOffset(0);
    }
    
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  // Mouse event handlers for desktop drag (optional)
  const onMouseDown = (e) => {
    e.preventDefault();
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const onMouseMove = (e) => {
    if (!touchStart || !isDragging) return;
    
    const diff = touchStart - e.clientX;
    setDragOffset(-diff);
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!touchStart || !touchEnd || !isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      return;
    }
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      const nextSlide = (currentSlide + 1) % heroSlides.length;
      changeSlide(nextSlide);
    } else if (isRightSwipe) {
      const prevSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
      changeSlide(prevSlide);
    } else {
      setDragOffset(0);
    }
    
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const onMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
      setTouchStart(null);
      setTouchEnd(null);
    }
  };
  
  // Auto-slide functionality (pause during dragging)
  useEffect(() => {
    if (isDragging) return; // Don't auto-slide while dragging
    
    const interval = setInterval(() => {
      const nextSlide = (currentSlide + 1) % heroSlides.length;
      changeSlide(nextSlide);
    }, 5000);

    return () => clearInterval(interval);
  }, [currentSlide, heroSlides.length, isDragging]);

  // Initial reveal animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Prevent context menu on long press
  useEffect(() => {
    const preventContextMenu = (e) => e.preventDefault();
    const container = containerRef.current;
    
    if (container) {
      container.addEventListener('contextmenu', preventContextMenu);
      return () => container.removeEventListener('contextmenu', preventContextMenu);
    }
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <section
      ref={containerRef}
      className="group relative overflow-hidden mt-16 lg:mt-20 select-none"
      style={{ 
        height: "calc(100vh - 64px)",
        cursor: isDragging ? 'grabbing' : 'grab'
      }}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseLeave}
    >
      {/* Full Screen Background Image with Drag Effect */}
      <div 
        className={`absolute inset-0 w-full h-full transition-transform duration-200 ${
          isDragging ? '' : 'transition-transform duration-500 ease-out'
        }`}
        style={{
          transform: `translateX(${dragOffset}px)`,
        }}
      >
        {heroSlides.map((slide, index) => (
          <div 
            key={slide.id}
            className={`absolute inset-0 xl:aspect-[2/1] transition-opacity duration-700 ease-in-out ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={slide.image}
              alt={slide.title}
              fill
              className={`object-cover transform scale-[1.02] ${
                isChangingSlide && index === currentSlide ? "animate-zoom-in" : ""
              }`}
              priority={index === currentSlide}
              quality={90}
              draggable={false}
            />
            {/* Dark overlay for text readability */}
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        ))}
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center pointer-events-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Content with fade animation */}
            <div
              className={`space-y-6 text-white transition-all duration-500 ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
            >
              {/* Brand/Collection Label */}
              <div className="inline-block">
                <p className="font-vogue text-sm md:text-base font-light tracking-widest uppercase opacity-90">
                  {currentHero.subtitle}
                </p>
                <div className="h-px w-16 bg-white/60 mt-2"></div>
              </div>

              {/* Main Title */}
              <h1 className="font-vogue-bold text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide">
                {currentHero.title}
              </h1>

              {/* Description */}
              {currentHero.description && (
                <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 max-w-lg">
                  {currentHero.description}
                </p>
              )}

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  href={currentHero.ctaLink}
                  className="group inline-flex items-center space-x-3 border border-white/80 hover:bg-white hover:text-black px-8 py-3 transition-all duration-300 ease-in-out pointer-events-auto"
                >
                  <span className="font-medium tracking-widest text-sm">
                    {currentHero.ctaText}
                  </span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-all ease-out duration-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 pointer-events-auto">
        <div className="flex items-center space-x-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => changeSlide(index)}
              className={`h-px transition-all duration-300 ${
                index === currentSlide
                  ? "bg-white w-12"
                  : "bg-white/50 w-6 hover:bg-white/80"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </div>

      {/* Navigation Arrows - Hidden on small screens to avoid conflicts */}
      <button
        onClick={() => {
          const prevSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
          changeSlide(prevSlide);
        }}
        className="absolute md:group-hover:block hidden cursor-pointer left-6 top-1/2 p-2 transform group-hover:-translate-y-1/2 z-20 bg-transparent backdrop-blur-md border border-white/40 hover:border-white/90 text-white/80 hover:text-white transition-all ease-in-out duration-500 pointer-events-auto"
        aria-label="Previous slide"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={() => {
          const nextSlide = (currentSlide + 1) % heroSlides.length;
          changeSlide(nextSlide);
        }}
        className="absolute md:group-hover:block hidden cursor-pointer right-6 top-1/2 transform group-hover:-translate-y-1/2 z-20 p-2 border border-white/40 hover:border-white/90 text-white/80 hover:text-white bg-transparent backdrop-blur-md transition-all ease-in-out duration-500 pointer-events-auto"
        aria-label="Next slide"
      >
        <svg
          className="w-8 h-8"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 right-8 z-10 animate-bounce pointer-events-none">
        <div className="flex flex-col items-center space-y-2 text-white/70">
          <span className="text-xs font-light tracking-wider uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-white/50"></div>
        </div>
      </div>

      {/* Swipe Indicator for Mobile */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10 md:hidden pointer-events-none">
        <div className="flex items-center space-x-2 text-white/50 text-xs">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16l-4-4m0 0l4-4m-4 4h18" />
          </svg>
          <span className="font-light tracking-wider uppercase">Swipe</span>
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>

      {/* Add zoom animation */}
      <style jsx global>{`
        @keyframes zoomIn {
          from {
            transform: scale(1);
          }
          to {
            transform: scale(1.05);
          }
        }
        .animate-zoom-in {
          animation: zoomIn 5s ease-out forwards;
        }
      `}</style>
    </section>
  );
}