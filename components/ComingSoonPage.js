"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  FiMail,
  FiInstagram,
  FiPhone,
  FiHeart,
  FiStar,
  FiGift,
  FiShoppingBag,
  FiArrowRight,
  FiEye,
  FiClock,
  FiRefreshCw,
} from "react-icons/fi";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });
  const [mounted, setMounted] = useState(false);

  // Fixed launch date - set once when component mounts
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    // Get or set launch date from localStorage
    const getLaunchDate = () => {
      const stored = localStorage.getItem("jagjitkaur-launch-date");
      const version = localStorage.getItem("jagjitkaur-launch-version");
      
      // Version 2 indicates the new launch date (4 more days)
      const currentVersion = "2";
      
      if (stored && version === currentVersion) {
        return new Date(stored);
      } else {
        // Set new launch date to 5 days from now (4 + 1 additional days)
        const newLaunchDate = new Date();
        newLaunchDate.setDate(newLaunchDate.getDate() + 5);
        
        localStorage.setItem("jagjitkaur-launch-date", newLaunchDate.toISOString());
        localStorage.setItem("jagjitkaur-launch-version", currentVersion);
        
        return newLaunchDate;
      }
    };

    const launchDate = getLaunchDate();

    // Update countdown immediately
    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = launchDate.getTime() - now;

      if (distance > 0) {
        setTimeLeft({
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        });
      } else {
        // Launch date has passed
        setTimeLeft({
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
        });
      }
    };

    // Update immediately
    updateCountdown();

    // Set up interval to update every second
    const timer = setInterval(updateCountdown, 1000);

    // Cleanup interval on unmount
    return () => clearInterval(timer);
  }, [mounted]);

  const handleEmailSubmit = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setEmail("");
      setTimeout(() => setIsSubmitted(false), 3000);
    }
  };

  // Function to reset countdown (for testing or admin use)
  const resetCountdown = () => {
    localStorage.removeItem("jagjitkaur-launch-date");
    localStorage.removeItem("jagjitkaur-launch-version");
    window.location.reload();
  };

  // Function to extend launch date by 4 more days
  const extendLaunchDate = () => {
    const currentDate = localStorage.getItem("jagjitkaur-launch-date");
    if (currentDate) {
      const extendedDate = new Date(currentDate);
      extendedDate.setDate(extendedDate.getDate() + 4);
      
      localStorage.setItem("jagjitkaur-launch-date", extendedDate.toISOString());
      localStorage.setItem("jagjitkaur-launch-version", "2");
      
      window.location.reload();
    }
  };

  const features = [
    {
      icon: FiStar,
      title: "Handcrafted Excellence",
      description: "Every piece tells a story of traditional artisanship",
    },
    {
      icon: FiGift,
      title: "Exclusive Collections",
      description: "Limited edition pieces celebrating Indian heritage",
    },
    {
      icon: FiHeart,
      title: "Personal Touch",
      description: "Customization options to match your unique style",
    },
  ];

  const categories = [
    { name: "Sharara Sets", emoji: "✨", count: "15+ designs" },
    { name: "Palazzo Sets", emoji: "🌸", count: "12+ designs" },
    { name: "Anarkali Sets", emoji: "🌺", count: "20+ designs" },
    { name: "Gharara Sets", emoji: "🌹", count: "10+ designs" },
    { name: "Kurti Sets", emoji: "🌿", count: "18+ designs" },
    { name: "Potli Bags", emoji: "👜", count: "8+ designs" },
  ];

  // Don't render countdown until mounted (prevents hydration mismatch)
  if (!mounted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-stone-200 border-t-stone-600 mx-auto mb-4"></div>
          <p className="text-stone-700 dark:text-stone-300 font-medium">
            Loading...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-stone-50 via-white to-stone-100 dark:from-stone-900 dark:via-stone-800 dark:to-stone-900 relative overflow-hidden">
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

      {/* Navigation */}
      <nav className="relative z-10 flex justify-between items-center p-6 max-w-7xl mx-auto">
        {/* Admin Access */}
        <div className="flex items-center space-x-3">
          {/* Admin Controls */}
          <div className="hidden items-center space-x-2">
            {/* Reset Countdown Button */}
            <button
              onClick={resetCountdown}
              className="flex items-center space-x-1 px-3 py-2 text-xs text-stone-500 hover:text-stone-700 dark:text-stone-400 dark:hover:text-stone-200 transition-colors duration-200 hover:bg-stone-100 dark:hover:bg-stone-800 rounded-lg"
              title="Reset countdown to original date"
            >
              <FiRefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>

            {/* Extend Launch Date Button */}
            <button
              onClick={extendLaunchDate}
              className="flex items-center space-x-1 px-3 py-2 text-xs text-amber-600 hover:text-amber-700 dark:text-amber-400 dark:hover:text-amber-300 transition-colors duration-200 hover:bg-amber-50 dark:hover:bg-amber-900/20 rounded-lg"
              title="Extend launch date by 4 more days"
            >
              <FiClock className="w-3 h-3" />
              <span>+4 Days</span>
            </button>
          </div>

          <Link
            href="/admin/login"
            className="flex items-center space-x-2 px-4 py-2 text-stone-700 dark:text-stone-300 hover:text-stone-900 dark:hover:text-stone-100 transition-colors duration-300"
          >
            <FiEye className="w-4 h-4" />
            <span className="text-sm font-medium">Admin</span>
          </Link>
        </div>
      </nav>

      {/* Launch Date Delay Notice */}
      <div className="relative z-10 max-w-4xl mx-auto px-6 mb-8">
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 dark:from-amber-900/20 dark:to-orange-900/20 border border-amber-200 dark:border-amber-800 rounded-xl p-6 text-center">
          <div className="flex items-center justify-center space-x-2 mb-3">
            <FiClock className="w-5 h-5 text-amber-600 dark:text-amber-400" />
            <h3 className="font-fira-sans text-lg font-semibold text-amber-800 dark:text-amber-200">
              Launch Date Update
            </h3>
          </div>
          <p className="text-amber-700 dark:text-amber-300 mb-4">
            We're adding some final touches to make your shopping experience even more special. 
            Our launch has been extended by a few more days to ensure perfection in every detail.
          </p>
          <div className="flex items-center justify-center space-x-2 text-sm text-amber-600 dark:text-amber-400">
            <FiHeart className="w-4 h-4" />
            <span>Thank you for your patience!</span>
          </div>
        </div>
      </div>

      {/* Hero Banner Section */}
      <div className="relative z-10 mb-8">
        {/* Brand Logo and Name */}
        <div className="flex flex-col items-center justify-center mb-8">
          <div className="relative">
            <Image
              src="/images/newlogo.png"
              alt="JK"
              width={70}
              height={70}
              className="transition-all ease-out duration-700 group-hover:scale-105"
            />
          </div>
          <div className="relative">
            <Image
              src="/images/logo.png"
              alt="JAGJIT KAUR"
              width={170}
              height={56}
              className="transition-all ease-out duration-700 hover:scale-105"
            />
          </div>
        </div>

        {/* Landscape Banner Image - Optimized for 1920x1080 */}
        <div className="relative mx-auto w-full md:max-w-6xl sm:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden shadow-2xl">
            {/* Aspect ratio container for 16:9 (1920x1080) */}
            <div className="relative aspect-[2/1] w-full">
              <Image
                src="/images/hero-img1.JPG"
                alt="Jagjit Kaur Traditional Wear Collection"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1920px"
                className="object-cover transition-all duration-700 hover:scale-105 ease-out"
                priority
                quality={90}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 pt-4 pb-12">
        <div className="flex flex-col justify-center items-center p-6 sm:p-8 lg:p-12">
          <div className="max-w-3xl text-center">
            <h2 className="font-vogue-alt text-xl font-bold sm:text-2xl md:text-4xl lg:text-5xl mb-4 tracking-wide leading-tight">
              Crafting Elegance : Coming Soon
            </h2>
            <p className="text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed opacity-90 max-w-2xl">
              We're putting the finishing touches on our exclusive collection of
              handcrafted Indian traditional wear. Each piece celebrates the
              timeless artistry of skilled artisans.
            </p>
          </div>
        </div>

        {/* Countdown Timer */}
        <div className="text-center mb-16 animate-fade-in-up delay-300">
          <h2 className="font-fira-sans text-2xl font-light text-stone-900 dark:text-stone-100 mb-8 tracking-wide">
            Launching In
          </h2>

          <div className="flex justify-center space-x-4 md:space-x-6">
            {Object.entries(timeLeft).map(([unit, value]) => (
              <div key={unit} className="text-center">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 rounded-lg flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105">
                  <span className="text-xl md:text-2xl font-bold text-stone-900 dark:text-stone-100 tabular-nums">
                    {value.toString().padStart(2, "0")}
                  </span>
                </div>
                <p className="text-xs md:text-sm text-stone-600 dark:text-stone-400 mt-2 capitalize font-medium">
                  {unit}
                </p>
              </div>
            ))}
          </div>

          {/* Show launch message when countdown reaches zero */}
          {timeLeft.days === 0 &&
            timeLeft.hours === 0 &&
            timeLeft.minutes === 0 &&
            timeLeft.seconds === 0 && (
              <div className="mt-8 p-6 bg-gradient-to-r from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-xl border border-green-200 dark:border-green-700">
                <h3 className="font-fira-sans text-2xl font-semibold text-green-800 dark:text-green-200 mb-2">
                  🎉 We've Launched!
                </h3>
                <p className="text-green-700 dark:text-green-300 mb-4">
                  Our collection is now live! Thank you for your patience.
                </p>
                <Link
                  href="/products"
                  className="inline-flex items-center px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium transition-colors duration-300"
                >
                  <FiShoppingBag className="w-5 h-5 mr-2" />
                  Explore Collection
                </Link>
              </div>
            )}
        </div>

        {/* ...rest of the existing code remains the same... */}
        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16 animate-fade-in-up delay-400">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-8 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm rounded-xl border border-stone-200 dark:border-stone-700 hover:shadow-xl transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${(index + 5) * 100}ms` }}
            >
              <div className="w-16 h-16 bg-stone-100 dark:bg-stone-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <feature.icon className="w-8 h-8 text-stone-600 dark:text-stone-400" />
              </div>
              <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-100 mb-3">
                {feature.title}
              </h3>
              <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Categories Preview */}
        <div className="text-center mb-16 animate-fade-in-up delay-500">
          <h2 className="font-fira-sans text-3xl font-light text-stone-900 dark:text-stone-100 mb-8 tracking-wide">
            What's Coming
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {categories.map((category, index) => (
              <div
                key={index}
                className="p-6 bg-white/80 dark:bg-stone-800/80 backdrop-blur-sm rounded-lg border border-stone-200 dark:border-stone-700 hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up"
                style={{ animationDelay: `${(index + 8) * 100}ms` }}
              >
                <div className="text-3xl mb-3">{category.emoji}</div>
                <h3 className="font-semibold text-stone-900 dark:text-stone-100 mb-2">
                  {category.name}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {category.count}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="text-center mb-16 animate-fade-in-up delay-600">
          <div className="max-w-md mx-auto">
            <h2 className="font-fira-sans text-2xl font-light text-stone-900 dark:text-stone-100 mb-4 tracking-wide">
              Be the First to Know
            </h2>
            <p className="text-stone-600 dark:text-stone-400 mb-8">
              Get exclusive early access and special offers
            </p>

            <form onSubmit={handleEmailSubmit} className="space-y-4">
              <div className="relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="w-full px-6 py-4 bg-white dark:bg-stone-800 border-2 border-stone-200 dark:border-stone-700 rounded-lg text-stone-900 dark:text-stone-100 placeholder-stone-500 dark:placeholder-stone-400 focus:border-stone-400 dark:focus:border-stone-500 focus:outline-none transition-all duration-300"
                  required
                />
                <FiMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-stone-400 w-5 h-5" />
              </div>

              <button
                type="submit"
                className="w-full bg-stone-800 dark:bg-stone-200 text-white dark:text-stone-900 py-4 px-6 rounded-lg font-medium hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 hover:scale-105 active:scale-95 hover:shadow-lg flex items-center justify-center space-x-2"
              >
                {isSubmitted ? (
                  <>
                    <FiHeart className="w-5 h-5" />
                    <span>Thank You!</span>
                  </>
                ) : (
                  <>
                    <span>Notify Me</span>
                    <FiArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="text-center animate-fade-in-up delay-700">
          <h3 className="font-fira-sans text-lg font-medium text-stone-900 dark:text-stone-100 mb-6">
            Follow Our Journey
          </h3>

          <div className="flex justify-center space-x-6">
            <a
              href="https://instagram.com/jagjitkaur.official"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 bg-stone-800 dark:bg-stone-200 rounded-full flex items-center justify-center text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 hover:scale-110"
            >
              <FiInstagram className="w-6 h-6" />
            </a>
            <a
              href="tel:+917363961142"
              className="w-12 h-12 bg-stone-800 dark:bg-stone-200 rounded-full flex items-center justify-center text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 hover:scale-110"
            >
              <FiPhone className="w-6 h-6" />
            </a>
            <a
              href="mailto:work@jkbyjagjitkaur.com"
              className="w-12 h-12 bg-stone-800 dark:bg-stone-200 rounded-full flex items-center justify-center text-white dark:text-stone-900 hover:bg-stone-900 dark:hover:bg-stone-100 transition-all duration-300 hover:scale-110"
            >
              <FiMail className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-stone-200 dark:border-stone-700 mt-20">
        <div className="max-w-6xl mx-auto px-6 py-8">
          <div className="font-fira-sans text-center">
            <p className="text-stone-600 dark:text-stone-400 mb-2">
              © 2025 JAGJIT KAUR. All rights reserved.
            </p>
            <p className="text-xs text-stone-500 dark:text-stone-500">
              Handcrafted with ❤️ for lovers of traditional elegance 
            </p>
            <p className="text-stone-700 text-sm font-medium tracking-wide">
              Built & designed by {' '}
              <Link href="https://www.souravpaitandy.me" 
                target="_blank"
                rel="noopener noreferrer"
                className="text-stone-700 hover:text-stone-900 transition-colors duration-300 font-semibold underline decoration-stone-900/50 underline-offset-2 hover:decoration-stone-900"
              >
                  Sourav Paitandy
              </Link>
            </p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for animations */}
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

        @keyframes bounce-in {
          0% {
            opacity: 0;
            transform: scale(0.3);
          }
          50% {
            transform: scale(1.05);
          }
          70% {
            transform: scale(0.9);
          }
          100% {
            opacity: 1;
            transform: scale(1);
          }
        }

        .animate-fade-in-up {
          animation: fade-in-up 0.8s ease-out;
        }

        .animate-bounce-in {
          animation: bounce-in 0.8s ease-out;
        }

        .delay-200 {
          animation-delay: 200ms;
        }
        .delay-300 {
          animation-delay: 300ms;
        }
        .delay-400 {
          animation-delay: 400ms;
        }
        .delay-500 {
          animation-delay: 500ms;
        }
        .delay-600 {
          animation-delay: 600ms;
        }
        .delay-700 {
          animation-delay: 700ms;
        }

        .animate-fade-in-up,
        .animate-bounce-in {
          animation-fill-mode: both;
        }

        .tabular-nums {
          font-variant-numeric: tabular-nums;
        }
      `}</style>
    </div>
  );
}