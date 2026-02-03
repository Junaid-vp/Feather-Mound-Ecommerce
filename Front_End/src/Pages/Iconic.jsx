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
    route: 0,
    image:
      "Section-4/7ef3308c-0661-4f0d-be78-3a56910ae7fb.png",
    alt: "Everyday Tote Bags",
    aos: "fade-up",
    duration: 450,
  },
  {
    id: 2,
    title: "LEE TWEED",
    route: "Shoulder Bag",
    image:
      "/Section-4/80a33f46-9793-4ba1-8b8e-29ba0070a6a2.png",
    alt: "Party & Evening Bags",
    aos: "fade-down",
    duration: 450,
  },
  {
    id: 3,
    title: "NYLON",
    route: "Top Handle",
    image:
      "/Section-4/9cda5393-9578-4e89-a32b-812842a5f7b9.png",
    alt: "Office & Work Bags",
    aos: "fade-up",
    duration: 450,
  },
  {
    id: 4,
    title: "FIERCE",
    route: "Tote Bag",
    image:
      "/Section-4/90440378-ce69-4a83-a3ec-c9e00764c088.png",
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
                to={`/MainBagComponent/${route}`}
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
                <Link to={`/MainBagComponent/${route}`}>{title}</Link>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Iconic;
