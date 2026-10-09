import React from 'react';

export const Logo = ({ className = "w-10 h-10" }: { className?: string }) => {
  return (
    <div translate="no" className={`notranslate relative flex items-center justify-center ${className}`}>
      <svg viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="logoGradPrimary" x1="0" y1="0" x2="40" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#ec4899" /> {/* pink-500 */}
            <stop offset="1" stopColor="#db2777" /> {/* pink-600 */}
          </linearGradient>
          <linearGradient id="logoGradSecondary" x1="40" y1="0" x2="0" y2="40" gradientUnits="userSpaceOnUse">
            <stop stopColor="#fbcfe8" /> {/* pink-200 */}
            <stop offset="1" stopColor="#fce7f3" /> {/* pink-100 */}
          </linearGradient>
        </defs>
        
        {/* Main Background */}
        <rect width="40" height="40" rx="12" fill="url(#logoGradPrimary)" />
        
        {/* Abstract "F" Shape (White) */}
        <path 
          d="M14 12C14 10.8954 14.8954 10 16 10H26C27.1046 10 28 10.8954 28 12C28 13.1046 27.1046 14 26 14H18V18H23C24.1046 18 25 18.8954 25 20C25 21.1046 24.1046 22 23 22H18V28C18 29.1046 17.1046 30 16 30C14.8954 30 14 29.1046 14 28V12Z" 
          fill="white"
        />
        
        {/* Decorative Floating Element */}
        <circle cx="27" cy="27" r="4" fill="url(#logoGradSecondary)" />
      </svg>
    </div>
  );
};
