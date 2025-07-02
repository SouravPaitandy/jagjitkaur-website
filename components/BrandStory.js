"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { FiHeart, FiUsers, FiStar, FiAward, FiGlobe, FiTrendingUp } from 'react-icons/fi';

export default function BrandStory() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeTab, setActiveTab] = useState('heritage');

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('brand-story');
    if (element) observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const achievements = [
    { number: "100+", label: "Happy Customers", icon: FiHeart },
    { number: "5★", label: "Customer Rating", icon: FiStar },
    { number: "5+", label: "Craft Traditions", icon: FiAward }
  ];

  const crafts = [
    {
      name: "Banarasi Silk",
      origin: "Varanasi",
      description: "Luxurious silk weaving with intricate gold and silver brocade patterns",
      image: "/craft-banarasi.jpg"
    },
    {
      name: "Chikankari",
      origin: "Lucknow",
      description: "Delicate white embroidery on fine cotton and silk fabrics",
      image: "/craft-chikankari.jpg"
    },
    {
      name: "Phulkari",
      origin: "Punjab",
      description: "Vibrant floral embroidery representing joy and celebration",
      image: "/craft-phulkari.jpg"
    },
    {
      name: "Block Print",
      origin: "Rajasthan",
      description: "Traditional hand-carved wooden block printing techniques",
      image: "/craft-blockprint.jpg"
    }
  ];

  return (
    <section 
      id="brand-story" 
      className="relative pt-10 pb-20 lg:py-32 bg-stone-50 dark:bg-stone-900 overflow-hidden"
    >
      {/* Background Decorative Elements */}
      <div className="absolute top-20 left-20 w-32 h-32 bg-stone-200/30 dark:bg-stone-700/30 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-stone-300/20 dark:bg-stone-600/20 rounded-full blur-3xl"></div>
      <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-stone-100/40 dark:bg-stone-800/40 rounded-full blur-2xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Enhanced Section Header */}
        <div className={`text-center mb-16 lg:mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'}`}>
          <div className="flex items-center justify-center mb-6">
            <div className="h-px bg-stone-300 dark:bg-stone-600 flex-1 max-w-xs"></div>
            <div className="mx-6 w-12 h-12 bg-black dark:bg-stone-300 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-6 h-6 text-white dark:text-stone-900" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="h-px bg-stone-300 dark:bg-stone-600 flex-1 max-w-xs"></div>
          </div>

          <h2 className="font-fira-sans text-4xl sm:text-5xl lg:text-6xl text-stone-900 dark:text-stone-100 mb-6">
            HERITAGE & LEGACY
          </h2>
          
          <p className="text-lg sm:text-xl lg:text-2xl text-stone-600 dark:text-stone-300 max-w-3xl mx-auto leading-relaxed">
            Where ancient traditions meet contemporary elegance, creating timeless pieces that celebrate
            <span className="font-semibold text-stone-800 dark:text-stone-200"> India's rich textile heritage</span>
          </p>
        </div>

        {/* Main Story Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center mb-20">
          {/* Enhanced Text Content */}
          <div className={`space-y-8 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-200`}>
            {/* Brand Name with Traditional Styling */}
            <div className="p-8">
              <h3 className="font-fira-sans text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-4">
                JAGJIT KAUR
              </h3>
              <p className="text-stone-600 dark:text-stone-300 text-lg leading-relaxed">
                A name that resonates with authenticity, tradition, and the timeless beauty of Indian craftsmanship. 
                Founded with a vision to preserve and celebrate our textile heritage.
              </p>
            </div>
            
            <div className="space-y-6 text-lg text-stone-600 dark:text-stone-300 leading-relaxed">
              <p>
                Rooted in the timeless traditions of Indian textile heritage, our journey began with a simple yet 
                profound mission: to bring you authentic handcrafted garments that honor centuries-old techniques 
                while embracing contemporary elegance and sophistication.
              </p>
              
              <p>
                From the ancient looms of <span className="font-semibold text-stone-800 dark:text-stone-200">Varanasi</span> to 
                the vibrant workshops of <span className="font-semibold text-stone-800 dark:text-stone-200">Rajasthan</span>, 
                each piece in our collection is meticulously crafted by master artisans who have inherited their skills 
                through generations. We celebrate the rich diversity of Indian crafts - be it the intricate Banarasi brocades, 
                delicate Chikankari embroidery, or vibrant Phulkari work.
              </p>
              
              <p>
                Our commitment extends beyond fashion to preserving India's rich textile legacy. Every purchase supports 
                traditional artisan communities and keeps alive the sacred art of handloom weaving that defines our cultural identity.
              </p>
            </div>

            {/* Enhanced Values Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-12">
              <div className="bg-white dark:bg-stone-800 backdrop-blur-sm rounded-md p-6 shadow-lg border border-stone-200 dark:border-stone-700 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-stone-900 dark:bg-stone-300 rounded-sm flex items-center justify-center shadow-lg">
                    <FiStar className="w-6 h-6 text-white dark:text-stone-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-white text-lg mb-2">Pure Materials</h3>
                    <p className="text-sm text-wrap text-stone-600 dark:text-stone-300 leading-relaxed">
                      Natural fibers and traditional dyes from trusted sources, ensuring authentic quality
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-stone-800 backdrop-blur-sm rounded-md p-6 shadow-lg border border-stone-200 dark:border-stone-700 hover:shadow-xl transition-shadow duration-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-12 h-12 bg-stone-900 dark:bg-stone-300 rounded-sm flex items-center justify-center shadow-lg">
                    <FiGlobe className="w-6 h-6 text-white dark:text-stone-900" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-stone-900 dark:text-white text-lg mb-2">Cultural Legacy</h3>
                    <p className="text-sm text-wrap text-stone-600 dark:text-stone-300 leading-relaxed">
                      Preserving India's rich textile traditions for future generations worldwide
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Image Section */}
          <div className={`relative ${isVisible ? 'animate-fade-in-right' : 'opacity-0'} animation-delay-400`}>
            <div className="relative aspect-[4/5] rounded-md overflow-hidden shadow-2xl border border-stone-200 dark:border-stone-700">
              <Image
                src="/images/brand.jpg"
                alt="Jagjit Kaur - Heritage & Legacy"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent"></div>
            </div>
            
            {/* Decorative Elements */}
            {/* <div className="absolute -top-6 -left-6 w-32 h-32 border-t-4 border-l-4 border-stone-400 dark:border-stone-600 rounded-tl-md"></div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 border-b-4 border-r-4 border-stone-400 dark:border-stone-600 rounded-br-md"></div> */}
          </div>
        </div>

        {/* Enhanced Achievements Section */}
        <div className={`mb-20 ${isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-600`}>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 lg:gap-8">
            {achievements.map((achievement, index) => {
              const IconComponent = achievement.icon;
              return (
                <div 
                  key={index}
                  className="bg-white dark:bg-stone-800 backdrop-blur-sm rounded-md p-6 text-center shadow-lg border border-stone-200 dark:border-stone-700 hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                >
                  <div className="w-16 h-16 bg-stone-900 dark:bg-stone-300 rounded-sm flex items-center justify-center mx-auto mb-4 shadow-lg">
                    <IconComponent className="w-8 h-8 text-white dark:text-stone-900" />
                  </div>
                  <div className="text-3xl lg:text-4xl font-bold text-stone-900 dark:text-stone-100 mb-2">
                    {achievement.number}
                  </div>
                  <div className="text-sm lg:text-base text-stone-600 dark:text-stone-300 font-medium">
                    {achievement.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Enhanced Craft Traditions Section */}
        <div className={`${isVisible ? 'animate-fade-in-up' : 'opacity-0'} animation-delay-800`}>
          <div className="text-center mb-12">
            <h3 className="font-fira-sans text-3xl lg:text-4xl font-bold text-stone-900 dark:text-white mb-4">
              OUR CRAFT TRADITIONS
            </h3>
            <p className="text-lg text-stone-600 dark:text-stone-300 max-w-2xl mx-auto">
              Celebrating the diverse artistry and regional specialties that make Indian textiles truly extraordinary
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {crafts.map((craft, index) => (
              <div 
                key={index}
                className="bg-white dark:bg-stone-800 rounded-md overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-stone-200 dark:border-stone-700"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <div className="w-full h-full bg-stone-100 dark:bg-stone-700 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="w-16 h-16 bg-stone-900 dark:bg-stone-300 rounded-sm flex items-center justify-center mx-auto mb-4">
                        <svg className="w-8 h-8 text-white dark:text-stone-900" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      </div>
                      <h4 className="font-semibold text-stone-900 dark:text-white text-lg mb-1">{craft.name}</h4>
                      <p className="text-sm text-stone-600 dark:text-stone-400 font-medium">{craft.origin}</p>
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
      </div>

      {/* CSS for animations */}
      <style jsx>{`
        .animate-fade-in-up {
          animation: fadeInUp 0.8s ease-out forwards;
        }
        
        .animate-fade-in-right {
          animation: fadeInRight 0.8s ease-out forwards;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .animation-delay-600 {
          animation-delay: 0.6s;
        }
        
        .animation-delay-800 {
          animation-delay: 0.8s;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(30px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </section>
  );
}