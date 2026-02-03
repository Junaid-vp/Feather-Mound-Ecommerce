import React, { useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";

export default function BagSlider() {
  const [side, setSide] = useState(null);
  const [mouseX, setMouseX] = useState("50%");
  const [isDragging, setIsDragging] = useState(false);
  const navigate = useNavigate();
  const sliderRef = useRef(null);

  const handleStart = useCallback((e) => {
    setIsDragging(true);
    
    // Prevent default to avoid scrolling and text selection
    e.preventDefault();
    e.stopPropagation();
    
    // Disable text selection during drag
    document.body.style.userSelect = 'none';
    document.body.style.webkitUserSelect = 'none';
  }, []);

  const handleEnd = useCallback(() => {
    setIsDragging(false);
    
    // Re-enable text selection
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
  }, []);

  const handleMove = useCallback(
    (e) => {
      if (!isDragging) return;

      const rect = e.currentTarget.getBoundingClientRect();
      const clientX = e.clientX || (e.touches && e.touches[0].clientX);
      if (!clientX) return;

      const x = ((clientX - rect.left) / rect.width) * 100;
      const clampedX = Math.max(0, Math.min(100, x));

      setMouseX(`${clampedX}%`);

      if (clampedX < 50) {
        setSide("left");
      } else {
        setSide("right");
      }

      // Prevent scrolling when dragging
      e.preventDefault();
      e.stopPropagation();
    },
    [isDragging]
  );

  const handleLeave = useCallback(() => {
    setSide(null);
    setIsDragging(false);
    setMouseX("50%");
    
    // Re-enable text selection
    document.body.style.userSelect = '';
    document.body.style.webkitUserSelect = '';
  }, []);

  // Prevent context menu on mobile (long press)
  const preventContextMenu = useCallback((e) => {
    e.preventDefault();
  }, []);

  return (
    <div className="w-full py-6 md:py-12 px-4 font-sans">
      <div className="w-full mx-auto max-w-6xl">
        <div className="text-left mb-4 md:mb-6">
          <h2 className="text-lg md:text-2xl font-light text-gray-800 tracking-tight">
            SLIDE TO SWITCH
          </h2>
        </div>

        {/* Slider Container */}
        <div
          ref={sliderRef}
          className="relative w-full mx-auto h-[300px] sm:h-[400px] md:h-[500px] bg-white overflow-hidden select-none cursor-ew-resize rounded-xl transition-shadow duration-300 hover:shadow-3xl touch-none"
          onMouseDown={handleStart}
          onMouseUp={handleEnd}
          onMouseMove={handleMove}
          onMouseLeave={handleLeave}
          onTouchStart={handleStart}
          onTouchEnd={handleEnd}
          onTouchMove={handleMove}
          onTouchCancel={handleLeave}
          onContextMenu={preventContextMenu}
          style={{
            // Additional touch action prevention
            touchAction: 'none',
            WebkitTouchCallout: 'none',
            WebkitTapHighlightColor: 'transparent'
          }}
        >
          {/* RIGHT BAG IMAGE - The 'Wine' bag */}
          <div className="absolute inset-0 bg-red-800">
            <img
              src="https://miraggiolife.com/cdn/shop/files/2_1_0fb1fde5-232b-4db1-9561-407623f175bd.jpg?v=1760688572"
              alt="Wine Bag"
              className="w-full h-full object-cover"
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
            />
          </div>

          {/* LEFT BAG IMAGE - The 'Green' bag */}
          <div
            className="absolute inset-0 bg-yellow-500"
            style={{
              clipPath: `inset(0 calc(100% - ${mouseX}) 0 0)`,
              transition: isDragging ? "none" : "clip-path 0.5s ease-out",
            }}
          >
            <img
              src="https://miraggiolife.com/cdn/shop/files/1_7_ddb84ce5-7cb2-4e99-84ba-417e8b8545ad.jpg?v=1760689128"
              alt="Green Bag"
              className="w-full h-full object-cover"
              draggable="false"
              onDragStart={(e) => e.preventDefault()}
            />
          </div>

          {/* DIVIDER LINE */}
          <div
            className={`absolute top-0 bottom-0 z-30 w-1 bg-white shadow-2xl pointer-events-none`}
            style={{
              left: mouseX,
              transition: isDragging ? "none" : "left 0.5s ease-out",
            }}
          />

          {/* LUXURY ARROW INDICATOR */}
          <div
            className="absolute z-40 pointer-events-none"
            style={{
              left: mouseX,
              top: "50%",
              transform: "translate(-50%, -50%)",
              transition: isDragging ? "none" : "left 0.5s ease-out",
            }}
          >
            <div className="before-after__cursor">
              <div className="relative">
                <div
                  className={`absolute inset-0 bg-white/30 rounded-full blur-md scale-110 transition-all duration-300 ${
                    isDragging ? "animate-pulse" : "opacity-70"
                  }`}
                ></div>

                <svg
                  role="presentation"
                  focusable="false"
                  className="w-10 h-10 md:w-12 md:h-12"
                  viewBox="0 0 50 50"
                >
                  <g>
                    <rect width="50" height="50" rx="25" fill="#ffffff"></rect>
                    <path
                      d="m19.25 19-6 6 6 6m11.5 0 6-6-6-6"
                      stroke="#000000"
                      strokeWidth="0.75"
                      strokeLinecap="square"
                    ></path>
                  </g>
                </svg>

                <div className="absolute inset-0 rounded-full border border-white/50 pointer-events-none"></div>
              </div>
            </div>
          </div>

          {/* LEFT PRODUCT INFO */}
          <div className="absolute bottom-4 left-4 md:bottom-8 md:left-8 z-10 text-left">
            <h3
              className="text-base md:text-xl font-bold text-white mb-1"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.9)" }}
            >
              GREEN
            </h3>
            <button
              onClick={() => {
                navigate(`/Detailpage/${"6971b94a19d8fdeb9161408a"}`);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="pb-1 relative group cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 text-black text-xs md:text-sm font-semibold transition-all duration-300 group-hover:text-gray-800">
                Shop now
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-700 ease-out group-hover:w-full"></div>
            </button>
          </div>

          {/* RIGHT PRODUCT INFO */}
          <div className="absolute bottom-4 right-4 md:bottom-8 md:right-8 z-10 text-right">
            <h3
              className="text-base md:text-xl font-bold text-white mb-1"
              style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.9)" }}
            >
              WINE
            </h3>
            <button
              onClick={() => {
                navigate(`/Detailpage/${"6971b94a19d8fdeb9161408e"}`);
                window.scrollTo({
                  top: 0,
                  behavior: "smooth",
                });
              }}
              className="pb-1 relative group cursor-pointer overflow-hidden"
            >
              <span className="relative z-10 text-black text-xs md:text-sm font-semibold transition-all duration-300 group-hover:text-gray-800">
                Shop now
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-black transition-all duration-700 ease-out group-hover:w-full"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}