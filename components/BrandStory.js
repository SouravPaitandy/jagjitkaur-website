"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import {
  FiHeart,
  FiUsers,
  FiStar,
  FiAward,
  FiGlobe,
  FiTrendingUp,
} from "react-icons/fi";

export default function BrandStory() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("heritage");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("brand-story");
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const achievements = [
    { number: "100+", label: "Happy Customers", icon: FiHeart },
    { number: "5★", label: "Customer Rating", icon: FiStar },
    { number: "5+", label: "Craft Traditions", icon: FiAward },
  ];

  const crafts = [
    {
      name: "Banarasi Silk",
      origin: "Varanasi",
      description:
        "Luxurious silk weaving with intricate gold and silver brocade patterns",
      image: "/craft-banarasi.jpg",
    },
    {
      name: "Chikankari",
      origin: "Lucknow",
      description: "Delicate white embroidery on fine cotton and silk fabrics",
      image: "/craft-chikankari.jpg",
    },
    {
      name: "Phulkari",
      origin: "Punjab",
      description: "Vibrant floral embroidery representing joy and celebration",
      image: "/craft-phulkari.jpg",
    },
    {
      name: "Block Print",
      origin: "Rajasthan",
      description: "Traditional hand-carved wooden block printing techniques",
      image: "/craft-blockprint.jpg",
    },
  ];

  return (
    <section
      id="brand-story"
      className="relative py-20 lg:py-32 bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 overflow-hidden"
    >
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-100 to-purple-100 dark:from-pink-900/20 dark:to-purple-900/20 rounded-full blur-3xl opacity-30 animate-pulse"></div>
        <div
          className="absolute top-40 right-20 w-40 h-40 bg-gradient-to-r from-amber-100 to-orange-100 dark:from-amber-900/20 dark:to-orange-900/20 rounded-full blur-3xl opacity-25 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-32 left-1/4 w-24 h-24 bg-gradient-to-r from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-600 rounded-full blur-2xl opacity-20 animate-bounce"
          style={{ animationDuration: "3s" }}
        ></div>
      </div>

      <div className="relative max-w-6xl mx-auto px-6 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div
          className={`text-center mb-16 lg:mb-20 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-stone-300 dark:bg-stone-600 flex-1 max-w-xs"></div>
            <div className="mx-6 flex flex-col items-center justify-center">
              <Image
                src="/images/newlogo.png"
                alt="JK"
                width={70}
                height={70}
                className="transition-all ease-out duration-700 hover:scale-105"
              />
            </div>
            <div className="h-px bg-stone-300 dark:bg-stone-600 flex-1 max-w-xs"></div>
          </div>

          <h2 className="font-vogue-bold text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 mb-6 tracking-wide">
            HERITAGE & LEGACY
          </h2>
        </div>

        {/* Main Story Section */}
        <div className="flex justify-center items-center text-center mb-20">
          {/* Enhanced Text Content */}
          <div
            className={`mb-8 max-w-[70%] ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            } animation-delay-200`}
          >
            {/* Brand Name with Traditional Styling */}
            <div className="cormorant-normal space-y-6 text-2xl text-stone-800 dark:text-stone-300 leading-relaxed">
              <h3 className="text-3xl lg:text-4xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
                JAGJIT KAUR
              </h3>
              <p>
                Jagjit Kaur is more than a clothing label — it's a journey of
                self-expression, cultural nostalgia, and modern elegance.
                Founded with a deep love for old-world charm and timeless Indian
                craftsmanship, each piece is an exploration of tradition meeting
                today's world — softly, soulfully, and intentionally.
              </p>

              <p>
                Our debut collection, Pehchaan, is a reflection of this very
                spirit — a tribute to discovering oneself through fabric,
                thread, and form. Crafted through trial and emotion, Pehchaan
                blends classic silhouettes with intricate handwork techniques
                like zardozi and aari embroidery — each piece made with love,
                intention, and care. Wrapped in bright, festive tones and rooted
                in tradition, every garment carries a piece of my journey.
              </p>

              <p>
                From me, for you — made with love, made for you. It marks not
                just the beginning of a label, but the unfolding of identity —
                one that celebrates stories, emotions, and timeless beauty.
              </p>

              <p>
                So go ahead — explore our debut collection Pehchaan, and make it
                yours.
              </p>
            </div>
          </div>

          {/* Enhanced Image Section */}
          {/* <div
            className={`relative ${
              isVisible ? "animate-fade-in-right" : "opacity-0"
            } animation-delay-400`}
          >
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm shadow-2xl border border-stone-200 dark:border-stone-700">
              <Image
                src="/images/brand.jpg"
                alt="Jagjit Kaur - Heritage & Legacy"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
          </div> */}
        </div>
      </div>

      {/* CSS for animations */}
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

        @keyframes fade-in-right {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out forwards;
        }

        .animate-fade-in-right {
          animation: fade-in-right 0.8s ease-out forwards;
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
        .animation-delay-1000 {
          animation-delay: 1000ms;
        }

        .animate-fade-in-up,
        .animate-fade-in-right {
          animation-fill-mode: both;
        }

        @keyframes pulse {
          0%,
          100% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
        }

        .animate-pulse {
          animation: pulse 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
