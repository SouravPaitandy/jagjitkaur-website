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
            HERITAGE & LAGACY
          </h2>

          <p className="text-lg sm:text-xl lg:text-2xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Where ancient traditions meet contemporary elegance, creating
            timeless pieces that celebrate
            <span className="font-semibold text-stone-800 dark:text-stone-200">
              {" "}
              India's rich textile heritage
            </span>
          </p>
        </div>

        {/* Main Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
          {/* Enhanced Text Content */}
          <div
            className={`mb-8 ${
              isVisible ? "animate-fade-in-up" : "opacity-0"
            } animation-delay-200`}
          >
            {/* Brand Name with Traditional Styling */}
            <div className="space-y-6 text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
              <h3 className="font-fira-sans text-3xl lg:text-4xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
                JAGJIT KAUR
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed">
                A name that resonates with authenticity, tradition, and the
                timeless beauty of Indian craftsmanship. Founded with a vision
                to preserve and celebrate our textile heritage.
              </p>

              <p>
                Rooted in the timeless traditions of Indian textile heritage,
                our journey began with a simple yet profound mission: to bring
                you authentic handcrafted garments that honor centuries-old
                techniques while embracing contemporary elegance and
                sophistication.
              </p>

              <p>
                From the ancient looms of{" "}
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  Varanasi
                </span>{" "}
                to the vibrant workshops of{" "}
                <span className="font-semibold text-stone-800 dark:text-stone-200">
                  Rajasthan
                </span>
                , each piece in our collection is meticulously crafted by master
                artisans who have inherited their skills through generations. We
                celebrate the rich diversity of Indian crafts - be it the
                intricate Banarasi brocades, delicate Chikankari embroidery, or
                vibrant Phulkari work.
              </p>

              <p>
                Our commitment extends beyond fashion to preserving India's rich
                textile legacy. Every purchase supports traditional artisan
                communities and keeps alive the sacred art of handloom weaving
                that defines our cultural identity.
              </p>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div
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
          </div>
        </div>

        {/* Enhanced Craft Traditions Section */}
        <div
          className={`${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          } animation-delay-800`}
        >
          <div className="text-center mb-12">
            <h3 className="font-fira-sans text-3xl lg:text-4xl font-light text-stone-900 dark:text-white mb-4 tracking-wide">
              Our Craft Traditions
            </h3>
            <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto leading-relaxed">
              Celebrating the diverse artistry and regional specialties that
              make Indian textiles truly extraordinary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crafts.map((craft, index) => (
              <div
                key={index}
                className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-200 dark:border-stone-700"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-stone-900 dark:bg-stone-300 flex items-center justify-center mx-auto mb-4">
                        <svg
                          className="w-8 h-8 text-white dark:text-stone-900"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      </div>
                      <h4 className="font-semibold text-stone-900 dark:text-white text-lg mb-1">
                        {craft.name}
                      </h4>
                      <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">
                        {craft.origin}
                      </p>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-sm text-stone-600 dark:text-stone-300 leading-relaxed">
                    {craft.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Enhanced Call to Action Section */}
        <div
          className={`text-center mt-16 lg:mt-20 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          } animation-delay-1000`}
        >
          <div className="bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm p-8 lg:p-12 border border-stone-200 dark:border-stone-700 shadow-lg">
            <h3 className="font-fira-sans text-2xl lg:text-3xl font-light text-stone-900 dark:text-white mb-4 tracking-wide">
              Join Our Heritage Journey
            </h3>
            <p className="text-stone-600 dark:text-stone-300 mb-8 max-w-2xl mx-auto text-lg leading-relaxed">
              Experience the beauty of traditional Indian craftsmanship and be
              part of preserving our rich textile heritage for future
              generations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="/products"
                className="group inline-flex items-center px-8 py-4 bg-stone-800 dark:bg-stone-200 hover:bg-stone-900 dark:hover:bg-stone-100 text-white dark:text-stone-900 font-medium duration-300 shadow-lg hover:shadow-xl"
              >
                <span>Explore Collection</span>
                <svg
                  className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-all ease-out duration-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 8l4 4m0 0l-4 4m4-4H3"
                  />
                </svg>
              </a>

              <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-stone-600 dark:text-stone-300">
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-green-600 dark:text-green-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </div>
                  <span>Authentic Handcrafted</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <svg
                      className="w-4 h-4 text-blue-600 dark:text-blue-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span>Supporting Artisans</span>
                </div>
              </div>
            </div>
          </div>
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