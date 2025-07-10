"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();

  // Simplified hero slides with focus on background images
  const heroSlides = [
    {
      id: 1,
      title: "SHARARA SETS",
      subtitle: "Heritage Collection 2024",
      description:
        "Discover elegant 3-piece sharara sets with kurta, sharara, and dupatta.",
      image: "/images/hero-img1.jpg",
      ctaText: "SHOP NOW",
      ctaLink: "/products?category=sharara-sets",
    },
    {
      id: 2,
      title: "PALAZZO SETS",
      subtitle: "Contemporary Collection",
      description:
        "Modern palazzo sets combining comfort with traditional aesthetics.",
      image: "/images/hero-img2.jpg",
      ctaText: "SHOP NOW",
      ctaLink: "/products?category=palazzo-sets",
    },
    {
      id: 3,
      title: "ANARKALI SETS",
      subtitle: "Bridal Collection",
      description:
        "Majestic anarkali sets with churidar and embroidered dupatta.",
      image: "/images/hero-img3.jpg",
      ctaText: "SHOP NOW",
      ctaLink: "/products?category=anarkali-sets",
    },
  ];
  
  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [heroSlides.length]);

  // Reveal animation
  useEffect(() => {
    setIsVisible(true);
  }, []);

  const currentHero = heroSlides[currentSlide];

  return (
    <section
      className="relative overflow-hidden mt-16"
      style={{ height: "calc(100vh - 64px)" }}
    >
      {/* Full Screen Background Image */}
      <div className="absolute inset-0">
        <Image
          src={currentHero.image}
          alt={currentHero.title}
          fill
          className="object-cover transition-all duration-1000 ease-in-out"
          priority
          quality={90}
        />
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40"></div>
      </div>

      {/* Content Container */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            {/* Content with fade animation */}
            <div
              className={`space-y-6 text-white transition-all duration-700 ${
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
              <h1 className="font-vogue-alt text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide">
                {currentHero.title}
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl font-light leading-relaxed opacity-90 max-w-lg">
                {currentHero.description}
              </p>

              {/* <p className="font-vogue text-7xl">Vogue</p> */}

              {/* CTA Button */}
              <div className="pt-4">
                <Link
                  href={currentHero.ctaLink}
                  className="group inline-flex items-center space-x-3 border border-white/80 hover:bg-white hover:text-black px-8 py-3 transition-all duration-300 ease-in-out"
                >
                  <span className="font-medium tracking-widest text-sm">
                    {currentHero.ctaText}
                  </span>
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="flex items-center space-x-4">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
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

      {/* Navigation Arrows */}
      <button
        onClick={() =>
          setCurrentSlide(
            (prev) => (prev - 1 + heroSlides.length) % heroSlides.length
          )
        }
        className="absolute left-6 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors duration-300 group"
        aria-label="Previous slide"
      >
        <svg
          className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
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
        onClick={() =>
          setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
        }
        className="absolute right-6 top-1/2 transform -translate-y-1/2 z-20 text-white/80 hover:text-white transition-colors duration-300 group"
        aria-label="Next slide"
      >
        <svg
          className="w-8 h-8 group-hover:scale-110 transition-transform duration-300"
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
      <div className="absolute bottom-8 right-8 z-10 animate-bounce">
        <div className="flex flex-col items-center space-y-2 text-white/70">
          <span className="text-xs font-light tracking-wider uppercase">
            Scroll
          </span>
          <div className="w-px h-8 bg-white/50"></div>
        </div>
      </div>
    </section>
  );
}
