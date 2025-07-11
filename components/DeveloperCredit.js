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
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  // Auto-hide after some time if not interacted with
  useEffect(() => {
    if (isVisible && !isHovered && !isExpanded) {
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, 15000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, isHovered, isExpanded]);

  if (!isVisible) return null;

  return (
    <div className="hidden md:block fixed bottom-6 right-6 z-40">
      <div 
        className={`relative transform transition-all duration-700 ease-out ${
          isVisible ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Main Credit Card */}
        <div 
          className={`bg-white/95 dark:bg-stone-900/95 backdrop-blur-md border border-stone-200/50 dark:border-stone-700/50 shadow-xl transition-all duration-500 hover:shadow-2xl hover:scale-[1.02] ${
            isExpanded ? 'p-6' : 'p-4'
          }`}
        >
          {/* Collapsed State */}
          {!isExpanded && (
            <div className="flex items-center space-x-3">
              <div className="relative">
                <div className="w-10 h-10 bg-stone-800 dark:bg-stone-200 flex items-center justify-center group">
                  <svg className="w-5 h-5 text-white dark:text-stone-900 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                </div>
                {/* Subtle animated border */}
                <div className="absolute inset-0 border border-stone-300 dark:border-stone-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              
              <div className="flex-1">
                <p className="font-fira-sans text-xs text-stone-600 dark:text-stone-400 font-light tracking-widest uppercase">
                  Crafted by
                </p>
                <div className="flex items-center space-x-2">
                  <a 
                    href="https://www.souravpaitandy.me/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="font-fira-sans text-sm font-medium text-stone-800 dark:text-stone-200 hover:text-stone-600 dark:hover:text-stone-400 transition-all duration-300 tracking-wide"
                  >
                    SOURAV PAITANDY
                  </a>
                  <svg className="w-3 h-3 text-stone-500 dark:text-stone-400 opacity-60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setIsExpanded(true)}
                  className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-all duration-300 hover:bg-stone-100 dark:hover:bg-stone-800 group"
                  aria-label="Expand developer info"
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
                
                <button
                  onClick={() => setIsVisible(false)}
                  className="p-1.5 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-all duration-300 hover:bg-stone-100 dark:hover:bg-stone-800 group"
                  aria-label="Close developer credit"
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
          )}

          {/* Expanded State */}
          {isExpanded && (
            <div className="space-y-6 animate-fade-in-up">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-stone-800 dark:bg-stone-200 flex items-center justify-center group">
                    <svg className="w-6 h-6 text-white dark:text-stone-900 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-fira-sans text-lg font-semibold text-stone-800 dark:text-stone-200 tracking-wide">
                      DEVELOPER
                    </h3>
                    <p className="font-fira-sans text-sm text-stone-600 dark:text-stone-400 font-light tracking-widest uppercase">
                      Full-Stack Developer
                    </p>
                  </div>
                </div>
                
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 text-stone-400 hover:text-stone-600 dark:hover:text-stone-300 transition-all duration-300 hover:bg-stone-100 dark:hover:bg-stone-800 group"
                  aria-label="Collapse developer info"
                >
                  <svg className="w-4 h-4 transition-transform duration-300 group-hover:scale-110" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 15l7-7 7 7" />
                  </svg>
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <p className="font-fira-sans text-base font-medium text-stone-700 dark:text-stone-300 tracking-wide">
                    SOURAV PAITANDY
                  </p>
                  <p className="font-fira-sans text-sm text-stone-600 dark:text-stone-400 font-light leading-relaxed mt-1">
                    Passionate about creating beautiful, functional web experiences with modern technologies.
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  <a 
                    href="https://www.souravpaitandy.me/" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 font-fira-sans text-sm text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-all duration-300 font-medium tracking-wide border-b border-transparent hover:border-stone-300 dark:hover:border-stone-600 pb-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9v-9m0-9v9" />
                    </svg>
                    <span>PORTFOLIO</span>
                  </a>
                  
                  <a 
                    href="https://github.com/souravpaitandy" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center space-x-2 font-fira-sans text-sm text-stone-600 dark:text-stone-400 hover:text-stone-800 dark:hover:text-stone-200 transition-all duration-300 font-medium tracking-wide border-b border-transparent hover:border-stone-300 dark:hover:border-stone-600 pb-1"
                  >
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    <span>GITHUB</span>
                  </a>
                </div>

                <div className="pt-4 border-t border-stone-200 dark:border-stone-700">
                  <p className="font-fira-sans text-xs text-stone-500 dark:text-stone-500 text-center font-light tracking-widest uppercase">
                    Built with Next.js • Tailwind CSS • Firebase
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Minimalist accent elements */}
        <div className="absolute -top-1 -right-1 w-2 h-2 bg-stone-300 dark:bg-stone-600 opacity-50"></div>
        <div className="absolute -bottom-1 -left-1 w-1 h-1 bg-stone-400 dark:bg-stone-500 opacity-30"></div>
      </div>

      {/* Custom animations */}
      <style jsx>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
}