import React from "react";
import useFetch from "../../Hooks/UseFetch";
import { useNavigate } from "react-router-dom";
import ProductCard from "../../Reusable Components/ProductCart";
export default function Mini() {
  const Navigate = useNavigate();
  const { datas } = useFetch("/products");
  const data = datas.filter((val) => val.type === "Micro Bag").splice(0, 4);
  
  return (
    <div className="bg-white" data-aos="fade-right"
     data-aos-offset="300"
     data-aos-easing="ease-in-sine">
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-1 lg:max-w-7xl lg:px-8">
        <div className="mt-6 grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {data.map((product) => (
         <ProductCard key={product.id} product={product}/>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <button
        className="px-2 py-1.5  bg-black text-white text-sm  hover:bg-gray-800 transition-all duration-200"
    onClick={() =>{ Navigate("/MainMini")
       window.scrollTo({
  top: 0,
  behavior: "smooth",
})
    }}
          >
            Shop Macro-Mini Bags
          </button>
        </div>
      </div>
    </div>
  );
}
