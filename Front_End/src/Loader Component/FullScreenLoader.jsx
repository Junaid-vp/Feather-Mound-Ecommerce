import React, { useState, useEffect } from "react";

export default function PremiumBagLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            localStorage.setItem('initialLoadComplete', 'true');
            onLoadingComplete();
          }, 300);
          return 100;
        }
        return p + 1;
      });
    }, 10);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  // Bag-themed loading states
  const loadingMessages = [
    { threshold: 0, message: "Crafting Your Experience..." },
    { threshold: 20, message: "Selecting Premium Materials..." },
    { threshold: 40, message: "Stitching Perfection..." },
    { threshold: 60, message: "Adding Final Touches..." },
    { threshold: 80, message: "Polishing Details..." },
    { threshold: 90, message: "Ready For You" }
  ];

  const currentMessage = loadingMessages
    .filter(item => progress >= item.threshold)
    .pop()?.message || "Loading...";

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      
      {/* Premium Bag Icon Animation */}
      <div className="relative mb-10">
        {/* Bag Outline */}
        <div className="w-24 h-32 border-2 border-gray-300 rounded-lg">
          {/* Bag Handle */}
          <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 w-16 h-6 border-2 border-gray-300 border-b-transparent rounded-t-full"></div>
          
          {/* Stitching Details */}
          <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gray-200"></div>
          <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gray-200"></div>
          <div className="absolute top-14 left-1/2 transform -translate-x-1/2 w-20 h-0.5 bg-gray-200"></div>
          
          {/* Progress Fill Animation */}
          <div 
            className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-800 via-gray-700 to-gray-600 transition-all duration-200 ease-out"
            style={{ height: `${progress}%` }}
          ></div>
          
          {/* Shimmer Effect */}
          <div className="absolute inset-0 overflow-hidden">
            <div 
              className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
              style={{
                transform: `translateX(${(progress - 50) * 2}%)`,
                transition: 'transform 0.3s ease-out'
              }}
            ></div>
          </div>
        </div>
        
        {/* Animated Spinner (hidden when complete) */}
        {progress < 100 && (
          <div className="absolute -right-2 -top-2">
            <div className="w-8 h-8 border-2 border-gray-800 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      {/* Progress Indicator */}
      <div className="space-y-4 w-64">
        {/* Progress Text */}
        <div className="flex justify-between items-center">
          <span className="text-xs text-gray-500 uppercase tracking-widest">
            {currentMessage}
          </span>
          <span className="text-2xl font-light text-gray-900 tabular-nums">
            {progress}%
          </span>
        </div>
        
        {/* Progress Bar with Stitches */}
        <div className="relative">
          {/* Base Bar */}
          <div className="w-full h-[2px] bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-gray-800 via-gray-700 to-gray-900 transition-all duration-200 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
          
          {/* Stitch Marks */}
          <div className="absolute top-1/2 left-0 right-0 flex justify-between transform -translate-y-1/2 pointer-events-none">
            {[0, 25, 50, 75, 100].map((pos) => (
              <div 
                key={pos}
                className={`w-[2px] h-2 ${
                  progress >= pos ? 'bg-gray-900' : 'bg-gray-300'
                } transition-colors duration-200`}
              ></div>
            ))}
          </div>
        </div>
      </div>

      {/* Subtle Branding */}
      <div className="absolute bottom-8">
        <div className="flex items-center space-x-2">
          <div className="w-1 h-4 bg-gray-900"></div>
          <span className="text-xs text-gray-500 tracking-widest">PREMIUM BAGS</span>
          <div className="w-1 h-4 bg-gray-900"></div>
        </div>
      </div>
    </div>
  );
}