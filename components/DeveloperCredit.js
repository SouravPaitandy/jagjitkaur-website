'use client';

import { useState, useEffect } from 'react';

export default function DeveloperCredit() {
  const [isVisible, setIsVisible] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Show the component after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-hide after some time if not interacted with
  useEffect(() => {
    if (isVisible && !isHovered && !isExpanded) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 15000); // Hide after 15 seconds
      return () => clearTimeout(timer);
    }
  }, [isVisible, isHovered, isExpanded]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block fixed bottom-4 right-4 z-50">
      <div 
        className={`relative transform transition-all duration-500 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Credit Card */}
        <div 
          className={`bg-white/95 dark:bg-stone-800/95 backdrop-blur-sm rounded-2xl shadow-xl border border-stone-200/50 dark:border-stone-700/50 transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] ${
            isExpanded ? 'p-6' : 'p-4'
          }`}
        >
          {/* Collapsed State */}
          {!isExpanded && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                {/* Animated pulse ring */}
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 opacity-20 animate-pulse"></div>
              </div>
              
              <div className="flex-1">
                <p className="text-xs text-stone-600 dark:text-stone-400 font-medium">Crafted with ❤️ by</p>
                <div className="flex items-center space-x-2">
                  <a 
                    href="https://www.souravpaitandy.me/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 transition-all duration-300"
                  >
                    Sourav Paitandy
                  </a>
                  <svg className="w-3 h-3 text-blue-500 opacity-75" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-700"
                  aria-label="Expand developer info"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => setIsVisible(false)}
                  className="text-stone-400 hover:text-red-500 transition-colors p-1 rounded-full hover:bg-stone-100 dark:hover:bg-stone-700"
                  aria-label="Close developer credit"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Expanded State */}
          {isExpanded && (
            <div className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-2 duration-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-full flex items-center justify-center shadow-lg">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-stone-800 dark:text-stone-200">Developer</h3>
                    <p className="text-sm text-stone-600 dark:text-stone-400">Full-Stack Developer</p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsExpanded(false)}
                  className="text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-colors p-2 rounded-full hover:bg-stone-100 dark:hover:bg-stone-700"
                  aria-label="Collapse developer info"
                >
                  <svg className="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-stone-700 dark:text-stone-300 font-medium">Sourav Paitandy</p>
                  <p className="text-xs text-stone-600 dark:text-stone-400">Passionate about creating beautiful, functional web experiences</p>
                </div>

                <div className="flex items-center space-x-3">
                  <a 
                    href="https://www.souravpaitandy.me/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                    <span>Portfolio</span>
                  </a>
                  
                  <a 
                    href="https://github.com/souravpaitandy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 text-sm text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-300 transition-colors font-medium"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GitHub</span>
                  </a>
                </div>

                <div className="pt-3 border-t border-stone-200 dark:border-stone-700">
                  <p className="text-xs text-stone-500 dark:text-stone-500 text-center">
                    Built with Next.js, Tailwind CSS & Firebase
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Floating particles effect */}
        <div className="absolute -top-2 -right-2 w-2 h-2 bg-blue-400 rounded-full animate-bounce animation-delay-1000"></div>
        <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-purple-400 rounded-full animate-bounce animation-delay-2000"></div>
      </div>
    </div>
  );
}