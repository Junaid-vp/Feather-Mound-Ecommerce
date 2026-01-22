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
      {/* Reduced padding for mobile */}
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 lg:py-16">
        {/* Title */}
        <h2 className="text-xl sm:text-2xl font-light tracking-wide text-gray-900 mb-4 sm:mb-6 lg:mb-8 text-center">
          TRENDING NOW
        </h2>

        {/* Container for responsive layout */}
        <div className="space-y-6 sm:space-y-0">
          {/* First Row - 2 cards on mobile, 3 cards on larger screens */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {/* First two cards - always visible */}
            {categories.slice(0, 2).map(({ id, title, image, route, alt, aos, duration }) => (
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
                <h3 className="mt-3 sm:mt-4 text-center">
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
            
            {/* Third card - hidden on mobile, visible on tablet+ */}
            <div className="hidden sm:block group relative" data-aos="fade-up" data-aos-duration={450}>
              <Link
                to={categories[2].route}
                onClick={handleClick}
                className="block overflow-hidden rounded-md"
              >
                <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={categories[2].image}
                    alt={categories[2].alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                  />
                </div>
              </Link>
              <h3 className="mt-3 sm:mt-4 text-center">
                <Link
                  to={categories[2].route}
                  onClick={handleClick}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                >
                  {categories[2].title}
                </Link>
              </h3>
            </div>
          </div>

          {/* Second Row - Only shown on mobile for the third card */}
          <div className="sm:hidden flex justify-center">
            <div className="w-full max-w-xs group relative" data-aos="fade-up" data-aos-duration={450}>
              <Link
                to={categories[2].route}
                onClick={handleClick}
                className="block overflow-hidden rounded-md"
              >
                <div className="aspect-square overflow-hidden rounded-md bg-gray-100">
                  <img
                    src={categories[2].image}
                    alt={categories[2].alt}
                    loading="lazy"
                    className="h-full w-full object-cover transition-all duration-500 group-hover:scale-105 group-hover:opacity-90"
                  />
                </div>
              </Link>
              <h3 className="mt-3 text-center">
                <Link
                  to={categories[2].route}
                  onClick={handleClick}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                >
                  {categories[2].title}
                </Link>
              </h3>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Trending;