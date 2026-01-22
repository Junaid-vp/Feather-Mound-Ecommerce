import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

function FooterSlider() {
  const logos = [
    {
      src: "https://miraggiolife.com/cdn/shop/files/3_942ef080-047b-4b08-a75d-0fc2cccde136.png?v=1747291096&width=180",
      alt: "Cosmopolitan"
    },
    {
      src: "https://miraggiolife.com/cdn/shop/files/copy_4_2a5b9c22-a666-449a-b385-31fdb86e5541.png?v=1747291096&width=180",
      alt: "ELLE"
    },
    {
      src: "https://miraggiolife.com/cdn/shop/files/4_af8ad330-33b1-48ef-9b11-66e92e51f1e7.png?v=1747290792&width=180",
      alt: "Grazia"
    },
    ,{
      src: "https://miraggiolife.com/cdn/shop/files/3_942ef080-047b-4b08-a75d-0fc2cccde136.png?v=1747291096&width=180",
      alt: "Cosmopolitan"
    },
    {
      src: "https://miraggiolife.com/cdn/shop/files/1_d5900052-52cd-45f3-82ab-1b53b564e001.png?v=1747291096&width=180",
      alt: "Bazaar" 
    },
   
     {
      src: "https://miraggiolife.com/cdn/shop/files/4_af8ad330-33b1-48ef-9b11-66e92e51f1e7.png?v=1747290792&width=180",
      alt: "Grazia"
    }
     
  ];

  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 1300,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 0,
    pauseOnHover: false,
    cssEase: 'linear',
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        }
      }
    ]
  };

  return (
    <section className="w-full mx-auto py-8 bg-white">
      <div className="max-w-6xl mx-auto px-5 mb-8">
        <h3 className="text-left text-2xl font-light tracking-wider">
          FEATURED ON
        </h3>
      </div>

      <div className="max-w-6xl mx-auto">
        <Slider {...settings}>
          {logos.map((logo, index) => (
            <div key={index} className="px-4">
              <div className="flex items-center justify-center h-14">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="max-h-16 w-auto object-contain opacity-80 hover:opacity-100 transition-opacity duration-300"
                />
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
}

export default FooterSlider;