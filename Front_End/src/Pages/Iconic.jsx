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
    title: "THE MINIMALIST",
    route: "/MainAllBag",
    image:
      "https://miraggiolife.com/cdn/shop/files/Minimal_cedcc16e-10c8-43ed-9373-140f47e249fa.jpg?v=1760686830&width=400",
    alt: "Everyday Tote Bags",
    aos: "fade-up",
    duration: 450,
  },
  {
    id: 2,
    title: "LEE TWEED",
    route: "/MainShoulder",
    image:
      "https://miraggiolife.com/cdn/shop/files/Collection_tiles-_Holiday.jpg?v=1759316781&width=400",
    alt: "Party & Evening Bags",
    aos: "fade-down",
    duration: 450,
  },
  {
    id: 3,
    title: "NYLON",
    route: "/MainTopHandle",
    image:
      "https://miraggiolife.com/cdn/shop/files/Collection_tiles-Nylon.jpg?v=1759316781&width=400",
    alt: "Office & Work Bags",
    aos: "fade-up",
    duration: 450,
  },
  {
    id: 4,
    title: "FIERCE",
    route: "/MainTote",
    image:
      "https://miraggiolife.com/cdn/shop/files/Collection_tiles-Fierce_c87a96c7-88c2-4700-8315-4bd8b0e19194.jpg?v=1759316781&width=400",
    alt: "Trendy & Aesthetic Bags",
    aos: "fade-down",
    duration: 450,
  },
];

// ---------------------------------------------------------------------------
// 🧩 Component
// ---------------------------------------------------------------------------
function Iconic() {
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

export default Iconic;
