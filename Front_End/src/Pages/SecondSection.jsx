// ============================================================================
// 📌 SecondSection.jsx — Category Navigation Grid
// Displays 4 clickable category cards with AOS animation
// ============================================================================

import React from "react";
import { Link } from "react-router-dom";

// ---------------------------------------------------------------------------
// 🗂 Category Data (Static)
// ---------------------------------------------------------------------------
const categories = [
  {
    id: 1,
    title: "EVERY DAY",
    route: "/MainTote",
    image:
      "https://miraggiolife.com/cdn/shop/files/Everyday_f45d6c96-003d-4220-a842-6547ce6bbfcc.jpg?v=1764764845&width=400",
    alt: "Everyday Tote Bags",
    aos: "fade-up",
    duration: 450,
  },
  {
    id: 2,
    title: "AFTER HOURS",
    route: "/MainShoulder",
    image:
      "https://miraggiolife.com/cdn/shop/files/Work_06259620-8cad-4d0f-86c9-50cf5d7f34cd.jpg?v=1764572367&width=400",
    alt: "Party & Evening Bags",
    aos: "fade-down",
    duration: 450,
  },
  {
    id: 3,
    title: "WORK",
    route: "/MainTopHandle",
    image:
      "https://miraggiolife.com/cdn/shop/files/Tweed_2.jpg?v=1765454713&width=400",
    alt: "Office & Work Bags",
    aos: "fade-up",
    duration: 450,
  },
  {
    id: 4,
    title: "AESTHETIC",
    route: "/MainAllBag",
    image:
      "https://rukminim2.flixcart.com/image/480/640/xif0q/hand-messenger-bag/d/5/m/stylish-5-a006-shoulder-bag-aesthetic-14-original-imahg2n2nvq9fzn5.jpeg?q=90",
    alt: "Trendy & Aesthetic Bags",
    aos: "fade-down",
    duration: 450,
  },
];

// ---------------------------------------------------------------------------
// 🧩 Component
// ---------------------------------------------------------------------------
function SecondSection() {
  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        {/* Title */}
        <h2 className="text-2xl font-light tracking-wide text-gray-900">
          MADE FOR EVERY MOMENT
        </h2>

        {/* Cards */}
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categories.map(({ id, title, image, route, alt, aos, duration }) => (
            <div key={id} className="group" data-aos={aos} data-aos-duration={duration}>
              <Link
                to={route}
                onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              >
                <img
                  src={image}
                  alt={alt}
                  loading="lazy"
                  className="aspect-square w-full rounded-md bg-gray-200 object-cover transition duration-300 group-hover:opacity-80 lg:aspect-auto lg:h-80"
                />
              </Link>

              <h3 className="mt-4 text-sm text-gray-700 text-center">
                <Link to={route}>{title}</Link>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SecondSection;
