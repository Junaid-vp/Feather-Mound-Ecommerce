import React, { useContext ,useEffect} from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../Hooks/UseFetch";
import { CartContext } from "../Context/CartContext";
import { ArrowLeftIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { api } from "../Api/Axios";

function DetailsPage() {
  const { product_id } = useParams();
  const { addCart, cart } = useContext(CartContext);
  const [product,setProduct] = useState()

  useEffect(()=>{
    const fetchProduct = async()=>{
      const res = await api.get(`/products/${product_id}`)
      setProduct(res.data.Product)
    }
    fetchProduct()
  },[product_id])

 console.log(product);
 

const isExist = cart.some(
    (item) => item?.product?._id === product?._id
  );

  const salePrice = Math.round(
    product?.original_price -
      (product?.original_price * product?.discount_percentage) / 100
  );

  const navigate = useNavigate();
 useEffect(() => {
    window.scrollTo(0, 0); 
  }, []);
  

  return (
    <div className="min-h-screen bg-white py-6 px-4" data-aos="fade-up"
     data-aos-duration="1000">
      <div className="max-w-4xl mx-auto">
        {/* Header Navigation */}
        <button
          onClick={() => {
            navigate("/");
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <ArrowLeftIcon className="w-4 h-4" />
          <span className="text-sm">Back to Home</span>
        </button>

            <div key={product?.product_id} className="space-y-8">
              {/* Product Card */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-white border border-gray-200 rounded-lg p-6">
                {/* Product Image */}
                <div className="flex justify-center">
                  <img
                    src={product?.image_url}
                    alt={product?.name}
                    className="w-full max-w-sm h-80 object-contain"
                  />
                </div>

                {/* Product Info */}
                <div className="space-y-4">
                  <div>
                    <h1 className="text-xl font-semibold text-gray-900 mb-2">
                      {product?.name}
                    </h1>
                    <div className="flex gap-3 text-xs text-gray-600">
                      <span>Type: {product?.type}</span>
                     
                    </div>
                  </div>

                  {/* Price */}
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold text-gray-900">
                        ₹{salePrice}
                      </p>
                      <p className="text-sm text-gray-500 line-through">
                        ₹{product?.original_price}
                      </p>
                    </div>
                    <p className="text-sm text-green-600 font-medium">
                      {product?.discount_percentage}% OFF
                    </p>
                  </div>

                  {/* Description */}
                  {product?.description && (
                    <div>
                      <p className="text-sm text-gray-700 leading-relaxed">
                        {product?.description}
                      </p>
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={() => navigate(`/buyproduct/${product?._id}`)}
                      className="flex-1 bg-black text-white py-3 px-4 rounded text-sm font-medium hover:bg-gray-800 transition-colors"
                    >
                      Buy Now
                    </button>

                    {isExist ? (
                      <button
                        onClick={() => navigate("/cart")}
                        className="flex-1 border border-gray-300 text-green-700 py-3 px-4 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        View Cart
                      </button>
                    ) : (
                      <button
                        onClick={() => addCart(product)}
                        className="flex-1 border border-gray-300 text-gray-700 py-3 px-4 rounded text-sm font-medium hover:bg-gray-50 transition-colors"
                      >
                        Add to Cart
                      </button>
                    )}
                  </div>
                </div>
              </div>

             
            </div>
    
       
        {/* Loading State */}
        {!product && (
          <div className="text-center py-12">
            <div className="w-8 h-8 border-2 border-gray-300 border-t-black rounded-full animate-spin mx-auto mb-3"></div>
            <p className="text-gray-600 text-sm">Loading product...</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default DetailsPage;
















//  Shipping & Return Policy
//               <div className="bg-white border border-gray-200 rounded-lg p-6">
//                 <h2 className="text-lg font-semibold text-gray-900 mb-6">
//                   Shipping & Return Policy
//                 </h2>

//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//                   {/* Shipping Policy */}
//                   <div>
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//                         <svg
//                           className="w-4 h-4 text-gray-900"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M5 13l4 4L19 7"
//                           />
//                         </svg>
//                       </div>
//                       <h3 className="font-semibold text-gray-900">
//                         Shipping Policy
//                       </h3>
//                     </div>
//                     <ul className="text-sm text-gray-700 space-y-3">
//                       <li className="flex items-start gap-3">
//                         <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
//                         <span>
//                           Orders are dispatched within 24–48 hours of
//                           confirmation
//                         </span>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
//                         <span>
//                           Delivery takes 2–7 business days from the order date
//                         </span>
//                       </li>
//                     </ul>
//                   </div>

//                   {/* Return Policy */}
//                   <div>
//                     <div className="flex items-center gap-3 mb-4">
//                       <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
//                         <svg
//                           className="w-4 h-4 text-gray-900"
//                           fill="none"
//                           stroke="currentColor"
//                           viewBox="0 0 24 24"
//                         >
//                           <path
//                             strokeLinecap="round"
//                             strokeLinejoin="round"
//                             strokeWidth={2}
//                             d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
//                           />
//                         </svg>
//                       </div>
//                       <h3 className="font-semibold text-gray-900">
//                         Return Policy
//                       </h3>
//                     </div>
//                     <ul className="text-sm text-gray-700 space-y-3">
//                       <li className="flex items-start gap-3">
//                         <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
//                         <span>
//                           Returns accepted for unused items within 7 days of
//                           delivery
//                         </span>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
//                         <span>
//                           Original tags, dust bags, and boxes must be intact
//                         </span>
//                       </li>
//                       <li className="flex items-start gap-3">
//                         <span className="w-1.5 h-1.5 bg-gray-600 rounded-full mt-2 flex-shrink-0"></span>
//                         <span>Gift Boxes are final sale (non-returnable)</span>
//                       </li>
//                     </ul>
//                   </div>
//                 </div>

//                 {/* Support Info */}
//                 <div className="mt-8 pt-6 border-t border-gray-200">
//                   <div className="flex items-center gap-3 mb-3">
//                     <div className="w-6 h-6 bg-gray-100 rounded-lg flex items-center justify-center">
//                       <svg
//                         className="w-3 h-3 text-gray-900"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={2}
//                           d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                         />
//                       </svg>
//                     </div>
//                     <h4 className="font-semibold text-gray-900">Need Help?</h4>
//                   </div>
//                   <p className="text-sm text-gray-700">
//                     For damaged or defective items, contact us at{" "}
//                     <a
//                       href="mailto:support@abc.com"
//                       className="text-gray-900 hover:underline font-medium"
//                     >
//                       support@miraggiolife.com
//                     </a>{" "}
//                     or WhatsApp{" "}
//                     <a
//                       href="https://wa.me/0000000"
//                       className="text-gray-900 hover:underline font-medium"
//                     >
//                       +91 0000000
//                     </a>{" "}
//                     within 48 hours of delivery.
//                   </p>
//                 </div>
//               </div>
