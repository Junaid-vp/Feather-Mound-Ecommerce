import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

function VideoSlide() {
  const navigate = useNavigate();
  const scrollContainerRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  const videoSlides = [
    {
      videoSrc:
        "https://cdn.shopify.com/s/files/1/0092/3831/5068/files/whatmore_tn_6457fb2d-d5a7-4707-a79c-af433c8ceef0.mp4?v=1747742865",
      route: `/Detailpage/${"SHOULDER008"}`,
      aos: "fade-up",
      duration: 1000,
    },
    {
      videoSrc:
        "https://cdn.shopify.com/s/files/1/0092/3831/5068/files/whatmore_tn_92746fcc-975e-415c-98ea-3356b9f156f8.mp4?v=1741258297",
      route: `/Detailpage/${"TOTE001"}`,
      aos: "fade-down",
      duration: 1000,
    },
    {
      videoSrc:
        "https://cdn.shopify.com/s/files/1/0092/3831/5068/files/whatmore_tn_d5727452-7d4a-423d-8b03-4d6ba11bbfa1.mp4?v=1741258165",
      route: `/Detailpage/${"SHOULDER005"}`,
      aos: "fade-up",
      duration: 1000,
    },
    {
      videoSrc:
        "https://cdn.shopify.com/s/files/1/0092/3831/5068/files/whatmore_tn_f79de0e5-e7d1-464a-8459-569a46318e67.mp4?v=1713856523",
      route: `/Detailpage/${"SHOULDER001"}`,
      aos: "fade-down",
      duration: 1000,
    },
    {
      videoSrc:
        "https://cdn.shopify.com/s/files/1/0092/3831/5068/files/whatmore_tn_103c768e-e451-4b3a-91a7-6412b73e3dca.mp4?v=1731916156",
      route: `/Detailpage/${"HB003"}`,
      aos: "fade-up",
      duration: 1000,
    },
    {
      videoSrc:
        "https://cdn.shopify.com/s/files/1/0092/3831/5068/files/whatmore_tn_6c1ce8f7-a19b-4ae5-9a77-42cc28604abd.mp4?v=1747742852",
      route: `/Detailpage/${"CROSS010"}`,
      aos: "fade-down",
      duration: 1000,
    },
    {
      videoSrc:
        "https://cdn.shopify.com/s/files/1/0092/3831/5068/files/whatmore_tn_cbb18390-8c5b-4bb6-809d-053168af746b.mp4?v=1741339270",
      route: `/Detailpage/${"LS003"}`,
      aos: "fade-up",
      duration: 1000,
    },
    {
      videoSrc:
        "https://cdn.shopify.com/s/files/1/0092/3831/5068/files/whatmore_tn_305a4ca5-6ae1-429f-8c6f-e1f8d8cd3b59.mp4?v=1756204675",
      route: `/Detailpage/${"Tote02"}`,
      aos: "fade-down",
      duration: 1000,
    },
    {
      videoSrc:
        "https://cdn.shopify.com/s/files/1/0092/3831/5068/files/whatmore_tn_58fd33cb-07a5-4f23-ba74-4cebb8c095c6.mp4?v=1731916256",
      route: `/Detailpage/${"MICRO005"}`,
      aos: "fade-up",
      duration: 1000,
    },
    {
      videoSrc:
        "https://cdn.shopify.com/s/files/1/0092/3831/5068/files/whatmore_tn_5c206ebb-0795-4f49-a910-ea11f28644cd.mp4?v=1747742844",
      route: `/Detailpage/${"SHOULDER002"}`,
      aos: "fade-down",
      duration: 1000,
    },
  ];

  const handleNavigation = (route) => {
    navigate(route);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const scroll = (direction) => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = container.clientWidth * 0.8; // Scroll 80% of container width
      container.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      const { scrollLeft, scrollWidth, clientWidth } = container;
      setShowLeftArrow(scrollLeft > 10);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  // Initialize scroll state on mount and on resize
  useEffect(() => {
    handleScroll();
    window.addEventListener('resize', handleScroll);
    return () => window.removeEventListener('resize', handleScroll);
  }, []);

  return (
    <div className="w-full" data-aos="fade-up" data-aos-duration="1000">
      {/* Section Header */}
      <div className="text-left px-4 py-8">
        <h2 className="text-2xl font-light text-black tracking-wide">
          THE STYLE EDIT
        </h2>
      </div>

      {/* Video Slider Container */}
      <div className="relative">
        {/* Left Arrow - Mobile Optimized */}
        {showLeftArrow && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white rounded-full p-2 md:p-3 transition-all duration-300 shadow-lg backdrop-blur-sm"
            aria-label="Scroll left"
          >
            <FaChevronLeft className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}

        {/* Right Arrow - Mobile Optimized */}
        {showRightArrow && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-black/80 hover:bg-black text-white rounded-full p-2 md:p-3 transition-all duration-300 shadow-lg backdrop-blur-sm"
            aria-label="Scroll right"
          >
            <FaChevronRight className="w-4 h-4 md:w-5 md:h-5" />
          </button>
        )}

        {/* Scroll Container - Mobile Optimized */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-3 md:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory px-4 pb-6"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none'
          }}
        >
          {videoSlides.map((slide, index) => (
            <div
              key={index}
              data-aos={slide.aos}
              data-aos-duration={slide.duration}
              className="flex-shrink-0 w-[280px] md:w-72 snap-start group cursor-pointer"
              onClick={() => handleNavigation(slide.route)}
            >
              <div className="relative overflow-hidden rounded-lg bg-white shadow-sm hover:shadow-md transition-all duration-300">
                <video
                  src={slide.videoSrc}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-[320px] md:h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
                  preload="metadata"
                >
                  Your browser does not support the video tag.
                </video>

                {/* Hover Effect */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-gray-300 transition-all duration-300 rounded-lg pointer-events-none"></div>
                
                {/* Loading State */}
                <div className="absolute inset-0 bg-gray-100 animate-pulse hidden video-loading"></div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll Indicator for Mobile */}
      <div className="flex justify-center items-center gap-1 mt-4 md:hidden">
        <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
        <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
        <div className="h-1 w-1 bg-gray-300 rounded-full"></div>
        <div className="text-xs text-gray-500 ml-2">Swipe to explore</div>
      </div>
    </div>
  );
}

export default VideoSlide;