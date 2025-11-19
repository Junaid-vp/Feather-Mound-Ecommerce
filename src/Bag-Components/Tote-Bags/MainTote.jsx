import React from "react";
import useFetch from "../../Hooks/UseFetch";
import { Link } from "react-router-dom";
import ProductCard from "../../Reusable Components/ProductCart";

function MainTote() {
  // Fetch all products using custom hook
  const { datas } = useFetch("/products");

  // Filter only Tote Bags
  const data = datas.filter((val) => val.type === "Tote Bag")
  ;

  return (
    <div
      className="bg-white"
      data-aos="fade-up"
      data-aos-duration="3000"
    >
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">

          {/* Hero Image */}
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <img
              className="w-full h-auto object-cover rounded-md"
              src="https://miraggiolife.com/cdn/shop/files/Bestsellers-Tote.jpg?v=1752921201&width=2600"
              alt="Tote Hero"
            />
          </div>

          {/* Hero Text */}
          <div className="w-full lg:w-2/5 order-2 lg:order-1 text-center lg:text-left">
            {/* Breadcrumb */}
            <h6 className="text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:underline">Home</Link> /{" "}
              <Link to="/MainTote" className="hover:underline">Bestseller Tote Bags</Link>
            </h6>

            {/* Title */}
            <h3 className="text-3xl font-bold text-gray-900 mb-4 mt-10">
              Bestseller Tote Bags
            </h3>

            {/* Description */}
            <p className="text-gray-600 leading-relaxed mt-10">
              Office runs, brunch plans, or travel days, our bestselling totes
              for women are made to multitask with elegance and ease.
            </p>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainTote;
