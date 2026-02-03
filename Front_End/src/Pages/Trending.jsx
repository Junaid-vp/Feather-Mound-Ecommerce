// ============================================================================
// 📌 TRENDING-Section.jsx — Category Navigation Grid
// ============================================================================

import React from "react";
import { Link } from "react-router-dom";

const categories = [
  {
    id: 1,
    title: "THE TRAVEL EDIT",
    route: "Tote Bag",
    image: "/Section-2/25722e82-0291-4ce0-85dc-91e9ab95b6cb.png",
    alt: "Everyday Tote Bags",
    aos: "fade-up",
    duration: 450,
  },
  {
    id: 2,
    title: "THE FALL PALETTE",
    route: "Shoulder Bag",
    image: "/Section-2/3d57c39a-4109-444c-905f-d4eb9c1eaaf7.png",
    alt: "Party & Evening Bags",
    aos: "fade-down",
    duration: 450,
  },
  {
    id: 3,
    title: "THE FALL FAVOURITES",
    route: "Top Handle",
    image: "/Section-2/af129d28-b860-4068-a278-38f60caf467e.png",
    alt: "Office & Work Bags",
    aos: "fade-up",
    duration: 450,
  },
];

function Trending() {
  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-white">
      <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 sm:py-12 lg:max-w-7xl lg:px-8 lg:py-16">
        <h2 className="text-xl sm:text-2xl font-light tracking-wide text-gray-900 mb-4 sm:mb-6 lg:mb-8 text-center">
          TRENDING NOW
        </h2>

        <div className="space-y-6 sm:space-y-0">
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6 lg:gap-8">
            {categories.slice(0, 2).map(
              ({ id, title, image, route, alt, aos, duration }) => (
                <div
                  key={id}
                  className="group relative"
                  data-aos={aos}
                  data-aos-duration={duration}
                >
                  <Link
                    to={`/MainBagComponent/${route}`}
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
                      to={`/MainBagComponent/${route}`}
                      onClick={handleClick}
                      className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                    >
                      {title}
                    </Link>
                  </h3>
                </div>
              )
            )}

            {/* Third card - tablet+ */}
            <div
              className="hidden sm:block group relative"
              data-aos="fade-up"
              data-aos-duration={450}
            >
              <Link
                to={`/MainBagComponent/${categories[2].route}`}
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
                  to={`/MainBagComponent/${categories[2].route}`}
                  onClick={handleClick}
                  className="text-sm font-medium text-gray-700 transition-colors hover:text-gray-900"
                >
                  {categories[2].title}
                </Link>
              </h3>
            </div>
          </div>

          {/* Mobile third card */}
          <div className="sm:hidden flex justify-center">
            <div
              className="w-full max-w-xs group relative"
              data-aos="fade-up"
              data-aos-duration={450}
            >
              <Link
                to={`/MainBagComponent/${categories[2].route}`}
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
                  to={`/MainBagComponent/${categories[2].route}`}
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
