import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderCompoment.css";
import { Link } from "react-router-dom";

function SliderComponent() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    pauseOnHover: false,
    arrows: false,
    fade: true,
  };

  // Optimized image URLs with proper dimensions
  const slides = [
    {
      id: 1,
      mobileImage: "/Section-2/bf2ec440-eb65-4926-842f-827781ed0489.png",
      desktopImage: "https://miraggiolife.com/cdn/shop/files/Tweed_Home_page.jpg?v=1764420211&width=2600",
      alt: "Colorful Micros"
    },
    {
      id: 2,
      mobileImage: "Section-2/200d279c-e11f-4f90-954a-a8b2be38c881.png",
      desktopImage: "https://miraggiolife.com/cdn/shop/files/Desktop_1_042a52c5-d4d4-4405-8dc8-a303040f0b85.jpg?v=1765196353&width=2600",
      alt: "Minimalist Bags"
    }
  ];

  return (
    <section className="w-full mx-auto overflow-hidden">
      <div className="relative">
        <Slider {...settings}>
          {slides.map((slide) => (
            <div key={slide.id} className="relative">
              <Link  to={`/MainBagComponent/${0}`} className="block">
                {/* Mobile Image - Optimized for 2:1 aspect ratio */}
                <div className="md:hidden relative w-full pt-[50%] overflow-hidden">
                  <img
                    src={slide.mobileImage}
                    alt={slide.alt}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
                
                {/* Desktop Image */}
                <div className="hidden md:block relative w-full pt-[35%] overflow-hidden">
                  <img
                    src={slide.desktopImage}
                    alt={slide.alt}
                    className="absolute top-0 left-0 w-full h-full object-cover object-center"
                    loading="lazy"
                  />
                </div>
              </Link>
            </div>
          ))}
        </Slider>
      </div>

      <div className="text-center px-4 py-6 md:px-14 md:py-10">
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Designed with intention, made for functionality. Our bags bring together
          timeless elegance and everyday versatility, crafted for moments that matter.
        </p>
      </div>
    </section>
  );
}

export default SliderComponent;