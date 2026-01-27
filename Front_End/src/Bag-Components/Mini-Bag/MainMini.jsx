import React from "react";
import useFetch from "../../Hooks/UseFetch";
import { Link } from "react-router-dom";
import ProductCard from "../../Reusable Components/ProductCart";
function MainMini() {

  const { datas } = useFetch(`products?type=Micro Bag`);

  return (
    <div className="bg-white" data-aos="fade-up"
     data-aos-duration="3000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <img
              className="w-full h-auto object-cover rounded-md"
              src="https://miraggiolife.com/cdn/shop/files/Bestsellers-Mini_bags.jpg?v=1753098469&width=2600"
              alt="MINI-BAGS"
            />
          </div>

          <div className="w-full lg:w-2/5 order-2 lg:order-1 text-center lg:text-left">
            <h6 className="text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:underline">
                Home
              </Link>{" "}
              / <Link className="hover:underline" to='/MainMini' > Bestseller Mini Bags</Link>
            </h6>

            <h3 className="text-3xl font-bold text-gray-900 mb-4 mt-10">
              Bestseller Mini Bags
            </h3>

            <p className="text-gray-600 leading-relaxed mt-10">
              Tap into micro glam with chic textures and bold colors. Explore
              our cult-fav mini bags that rule the runway and every feed
            </p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
      
       <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {datas.map((product) => (
         <ProductCard key={product._id} product={product}/>
          ))}
        </div>
      </div>
    </div>
  );
}

export default MainMini;
