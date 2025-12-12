// ============================================================================
// 📌 TRENDING-Section.jsx — Category Navigation Grid
// Displays 3 clickable category cards with AOS animation
// ============================================================================

import React from "react";
import { Link } from "react-router-dom";

// ---------------------------------------------------------------------------
// 🗂 Category Data (Static)
// ---------------------------------------------------------------------------
const categories = [
  {
    id: 1,
    title: "THE TRAVEL EDIT",
    route: "/MainTote",
    image:
      "https://miraggiolife.com/cdn/shop/files/THE_TRAVEL_EDIT-1_6a376c69-f4e0-4d1b-91df-cefc36dafa99.jpg?v=1764137511&width=600",
    alt: "Everyday Tote Bags",
    aos: "fade-up",
    duration: 450,
  },
  {
    id: 2,
    title: "THE FALL PALETTE",
    route: "/MainShoulder",
    image:
      "https://miraggiolife.com/cdn/shop/files/Fall_Pallette.jpg?v=1764574175&width=600",
    alt: "Party & Evening Bags",
    aos: "fade-down",
    duration: 450,
  },
  {
    id: 3,
    title: "ACCESSORIZE YOUR WAY",
    route: "/MainTopHandle",
    image:
      "https://miraggiolife.com/cdn/shop/files/TRENDING_NOW-ACCESSORIZE_YOUR_WAY.jpg?v=1764574175&width=600",
    alt: "Office & Work Bags",
    aos: "fade-up",
    duration: 450,
  },
];

// ---------------------------------------------------------------------------
// 🧩 Component
// ---------------------------------------------------------------------------
function Trending() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-10 lg:max-w-7xl lg:px-8">
        {/* Title */}
        <h2 className="text-2xl font-light tracking-wide text-gray-900 mb-8">
          TRENDING NOW
        </h2>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {categories.map(({ id, title, image, route, alt, aos, duration }) => (
            <div
              key={id}
              className="group relative"
              data-aos={aos}
              data-aos-duration={duration}
            >
              <Link
                to={route}
                onClick={handleClick}
                className="block overflow-hidden rounded-md"
              >
                <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={image}
                    alt={alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                  />
                </div>
              </Link>

              <h3 className="mt-4 text-center">
                <Link
                  to={route}
                  onClick={handleClick}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                >
                  {title}
                </Link>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Trending;