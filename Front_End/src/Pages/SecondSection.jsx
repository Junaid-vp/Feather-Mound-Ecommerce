// ============================================================================
// 📌 SecondSection.jsx — Category Navigation Grid
// Displays 4 clickable category cards with AOS animation
// ============================================================================

import React from "react";
import { Link } from "react-router-dom";

// ---------------------------------------------------------------------------
// 🗂 Category Data (Static)
// NOTE: Best image size → 1000 × 1000 (1:1)
// ---------------------------------------------------------------------------
const categories = [
  {
    id: 1,
    title: "EVERY DAY",
    route: "Tote Bag",
    image: "/assets/0c8ea076-b67f-4ecd-84b2-bd4ebbd7cca4.png",
    alt: "Everyday Tote Bags",
    aos: "fade-up",
    duration: 450,
  },
  {
    id: 2,
    title: "AFTER HOURS",
    route:  "Shoulder Bag",
    image: "/assets/11bd14dd-a22c-42da-9d8f-31d73dbd7362.png",
    alt: "Party & Evening Bags",
    aos: "fade-down",
    duration: 450,
  },
  {
    id: 3,
    title: "WORK",
    route: "Top Handle",
    image:
      "/assets/ChatGPT Image Feb 3, 2026, 11_16_40 AM.png",
    alt: "Office & Work Bags",
    aos: "fade-up",
    duration: 450,
  },
  {
    id: 4,
    title: "AESTHETIC",
    route: 0,
    image:
      "/assets/1221c26d-1cd2-4a4e-9dca-ab13cead5894.png",
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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 lg:max-w-7xl lg:px-8">
        {/* Title */}
        <h2 className="text-2xl font-light tracking-wide text-gray-900">
          MADE FOR EVERY MOMENT
        </h2>

        {/* Cards */}
        <div className="mt-8 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {categories.map(
            ({ id, title, image, route, alt, aos, duration }) => (
              <div
                key={id}
                className="group"
                data-aos={aos}
                data-aos-duration={duration}
              >
                <Link
                  to={`/MainBagComponent/${route}`}
                  onClick={() =>
                    window.scrollTo({ top: 0, behavior: "smooth" })
                  }
                >
                  {/* Image Wrapper (forces same size) */}
                  <div className="relative w-full overflow-hidden rounded-md bg-gray-100 aspect-square">
                    <img
                      src={image}
                      alt={alt}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </Link>

                {/* Title */}
                <h3 className="mt-4 text-sm tracking-wide text-gray-700 text-center">
                  <Link to={`/MainBagComponent/${route}`} className="hover:text-gray-900">
                    {title}
                  </Link>
                </h3>
              </div>
            )
          )}
        </div>
      </div>
    </section>
  );
}

export default SecondSection;
