import React from "react";
import useFetch from "../../Hooks/UseFetch";
import { Link } from "react-router-dom";
import ProductCard from "../../Reusable Components/ProductCart";
function MainAllBags() {
  const { datas } = useFetch("/products");

  return (
    <div className="bg-white" data-aos="fade-up"
     data-aos-duration="3000">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row items-center gap-6">
          <div className="w-full lg:w-3/5 order-1 lg:order-2">
            <img
              className="w-full h-auto object-cover rounded-md"
              src="https://miraggiolife.com/cdn/shop/files/Bestsellers_14af212b-9a8a-4c06-8079-4868fbf3e7ad.jpg?v=1757071169&width=2600"
              alt="Shoulder bag"
            />
          </div>

          <div className="w-full lg:w-2/5 order-2 lg:order-1 text-center lg:text-left">
            <h6 className="text-sm text-gray-500 mb-2">
              <Link to="/" className="hover:underline">
                Home
              </Link>{" "}
               <Link className="hover:underline" to="/MainAllBag" >Bestsellers</Link>
            </h6>

            <h3 className="text-3xl font-bold text-gray-900 mb-4 mt-10">
              Bestsellers
            </h3>

            <p className="text-gray-600 leading-relaxed mt-10">
              Best-loved. Best carried. From totes and hobos to minis, clutches,
              and backpacks, these are the bestsellers that women keep coming
              back to.
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

export default MainAllBags;
