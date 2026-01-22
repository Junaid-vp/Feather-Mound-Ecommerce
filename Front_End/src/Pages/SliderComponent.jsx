import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SliderCompoment.css"
import {Link} from 'react-router-dom'
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
  };

  return (
    <section className="w-full mx-auto overflow-hidden">
      {/* Slider Container */}
      <div className="relative">
        
        <Slider {...settings}>
          {/* Slide 1 */}
          <div>
            <Link to="MainAllbag">
             <img
              src="https://miraggiolife.com/cdn/shop/files/Tweed_Home_page.jpg?v=1764420211&width=2600"
              alt="Colorful Micros"
              className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] object-cover"
            />
            </Link>
           
          </div>

          {/* Slide 2 */}
          <div>
            <Link to="MainAllbag">
            <img
              src="https://miraggiolife.com/cdn/shop/files/Desktop_1_042a52c5-d4d4-4405-8dc8-a303040f0b85.jpg?v=1765196353&width=2600"
              alt="Minimalist Bags"
               className="w-full h-[250px] sm:h-[300px] md:h-[400px] lg:h-[450px] object-cover"
            />
            </Link>
            
          </div>
        </Slider>
      </div>

      {/* Text Section */}
      <div className="text-center px-4 py-6 md:px-14 md:py-10  Caption">
        <p className="text-sm sm:text-base md:text-lg text-gray-600">
          Designed with intention, made for functionality. Our bags bring together
          timeless elegance and everyday versatility, crafted for moments that matter.
        </p>
      </div>
    </section>
  );
}

export default SliderComponent;