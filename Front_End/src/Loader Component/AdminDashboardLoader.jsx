import React, { useState, useEffect } from "react";

export default function AdminDashboardLoader({ onLoadingComplete }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            onLoadingComplete();
          }, 300);
          return 100;
        }
        return p + 1;
      });
    }, 20);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <div className="fixed inset-0 bg-[#faf9f7] flex flex-col items-center justify-center z-50">
      
      {/* Brand Logo */}
      <div className="mb-8">
        <img
          src="https://miraggiolife.com/cdn/shop/files/logo_200x@2x.png?v=1690893751"
          alt="Miraggio"
          className="h-16 w-auto opacity-90"
        />
      </div>

      {/* Elegant Spinner */}
      <div className="relative mb-6">
        <div className="w-12 h-12 border-2 border-[#e6dfd3] rounded-full"></div>
        <div className="absolute inset-0 w-12 h-12 border-2 border-[#b6925e] border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Progress Percentage */}
      <div className="text-xl font-light text-[#4b3f2f] mb-3 tracking-wide">
        {progress}%
      </div>

      {/* Custom Progress Bar */}
      <div className="w-64 h-[2px] bg-[#e6dfd3] rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-gradient-to-r from-[#d6b98d] to-[#b6925e] transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Status Text */}
      <div className="text-sm text-[#7a6a55] tracking-wide font-medium">
        {progress < 25 && "Loading Dashboard..."}
        {progress >= 25 && progress < 50 && "Preparing Analytics..."}
        {progress >= 50 && progress < 75 && "Loading Data..."}
        {progress >= 75 && progress < 90 && "Finalizing..."}
        {progress >= 90 && "Almost Ready..."}
      </div>
    </div>
  );
}