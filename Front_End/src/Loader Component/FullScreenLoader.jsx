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

  return (
    <div className="fixed inset-0 bg-white flex flex-col items-center justify-center z-50">
      
      {/* Minimal Spinner */}
      <div className="relative mb-6">
        <div className="w-12 h-12 border-2 border-gray-200 rounded-full"></div>
        <div className="absolute inset-0 w-12 h-12 border-2 border-black border-t-transparent rounded-full animate-spin"></div>
      </div>

      {/* Progress Percentage */}
      <div className="text-2xl font-light text-black mb-3">
        {progress}%
      </div>

      {/* Slim Progress Bar */}
      <div className="w-48 h-[2px] bg-gray-100 rounded-full overflow-hidden mb-4">
        <div
          className="h-full bg-black transition-all duration-200"
          style={{ width: `${progress}%` }}
        ></div>
      </div>

      {/* Minimal Status Text */}
      <div className="text-xs text-gray-500 tracking-wide uppercase">
        {progress < 40 && "Loading"}
        {progress >= 40 && progress < 80 && "Almost there"}
        {progress >= 80 && "Ready"}
      </div>
    </div>
  );
}