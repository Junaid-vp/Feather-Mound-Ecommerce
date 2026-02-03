// ============================================================================
// 📌 SecondSlider.jsx — Mobile Optimized Dual Image Slider
// - Two synced visual sliders side-by-side (independent settings)
// - Uses autoplay, fade effect and responsive heights
// ============================================================================

import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderCompoment.css";
import { useNavigate } from "react-router-dom";

function SecondSlider() {
  const navigate = useNavigate();

  // ------------------------------------------------------------------------
  // Slider configuration (shared)
  // ------------------------------------------------------------------------
  const settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: false,
    arrows: false,
    fade: true,
    cssEase: "ease-in-out",
    adaptiveHeight: true,
  };

  // Mobile-specific settings
  const mobileSettings = {
    ...settings,
    autoplaySpeed: 4000,
    speed: 800,
  };

  // ------------------------------------------------------------------------
  // Slide data to reduce repetition
  // ------------------------------------------------------------------------
  const leftSlides = [
    {
      id: "6971b94a19d8fdeb9161408f",
      src: "/Section-3/afd39586-1d62-4b8a-9368-5306c7a6ab35.png",
      alt: "Colorful Micros"
    },
    {
      id: "6971b99f27cf496a4b8c9d1d",
      src: "/Section-3/85a0632b-26ef-4550-8097-eccdd18daeae.png",
      alt: "Minimalist Bags"
    },
    {
      id: "6971b94a19d8fdeb9161407a",
      src: "/Section-3/cf1246af-6f65-4893-9457-66d40a717b74.png",
      alt: "Minimalist Bags"
    }
  ];

  const rightSlides = [
    {
      id: "6971b94a19d8fdeb9161407b",
      src: "/Section-3/e7a6e2fa-ebb0-4179-a91a-639a7fe0fef7.png",
      alt: "Colorful Micros"
    },
    {
      id: "6971b94a19d8fdeb91614097",
      src: "/Section-3/d1be0d0c-d4ec-4164-bbd9-c7afb87e3070.png",
      alt: "Minimalist Bags"
    },
    {
      id: "6971b94a19d8fdeb9161408f",
      src: "/Section-3/1e6e15ab-ef8e-40f2-9f6e-a0f01637b522.png",
      alt: "Minimalist Bags"
    }
  ];

  // ------------------------------------------------------------------------
  // Click handler
  // ------------------------------------------------------------------------
  const handleSlideClick = (productId) => {
    navigate(`/Detailpage/${productId}`);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // ------------------------------------------------------------------------
  // Render
  // ------------------------------------------------------------------------
  return (
    <section className="w-full mt-10 mx-auto overflow-hidden cursor-pointer px-4 md:px-0">
      {/* Title */}
      <h3 className="text-xl md:text-2xl font-light mb-5 ml-4 md:mb-7 text-center md:text-left">
        IN THE SPOTLIGHT
      </h3>

      {/* Two-column slider layout - Stack on mobile */}
      <div className="flex flex-col md:flex-row gap-4 md:gap-4">
        {/* Left slider */}
        <div 
          className="w-full md:w-1/2" 
          data-aos="fade-right"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
        >
          <Slider {...mobileSettings}>
            {leftSlides.map((slide, index) => (
              <div 
                key={index}
                onClick={() => handleSlideClick(slide.id)}
                className="px-1 md:px-0"
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-[180px] xs:h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] object-cover rounded-lg md:rounded-none"
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>

        {/* Right slider */}
        <div 
          className="w-full md:w-1/2" 
          data-aos="fade-left"
          data-aos-offset="200"
          data-aos-easing="ease-in-sine"
        >
          <Slider {...mobileSettings}>
            {rightSlides.map((slide, index) => (
              <div 
                key={index}
                onClick={() => handleSlideClick(slide.id)}
                className="px-1 md:px-0"
              >
                <img
                  src={slide.src}
                  alt={slide.alt}
                  className="w-full h-[180px] xs:h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] object-cover rounded-lg md:rounded-none"
                  loading="lazy"
                />
              </div>
            ))}
          </Slider>
        </div>
      </div>

      {/* Mobile Indicators */}
      <div className="flex justify-center items-center gap-2 mt-4 md:hidden">
        <div className="flex gap-1">
          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
          <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
        </div>
        <div className="text-xs text-gray-500 ml-2">Tap to view products</div>
      </div>
    </section>
  );
}

export default SecondSlider;