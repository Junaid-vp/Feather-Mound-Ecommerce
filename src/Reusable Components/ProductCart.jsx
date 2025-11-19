// ============================================================================
// 📌 ProductCard.jsx — Fixed Mobile Version
// ============================================================================

import React, { useContext, useState } from "react";
import { Heart, ShoppingBag } from "lucide-react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";
import { WishListContext } from "../Context/WIshListContext";

function ProductCard({ product }) {
  const [hover, setHover] = useState(false);
  const { addCart, cart } = useContext(CartContext);
  const { wishList, toggleWishlist } = useContext(WishListContext);
  const navigate = useNavigate();

  if (!product?.isActive) return null;

  const isInWishlist = wishList.some(
    (item) => item.product_id === product.product_id
  );

  const isInCart = cart.some((item) => item.product_id === product.product_id);

  const salePrice = Math.round(
    product.original_price -
      (product.original_price * product.discount_percentage) / 100
  );

  return (
    <div 
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden flex flex-col h-full"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden flex-shrink-0">
        <button
          onClick={() => {
            navigate(`/Detailpage/${product.product_id}`);
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="w-full"
        >
          <img
            src={product.image_url}
            alt={product.name}
            className={`w-full h-64 md:h-80 object-cover transition-all duration-300 ${
              hover ? "md:scale-105" : "scale-100"
            }`}
          />
        </button>

        {/* Wishlist Button */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-3 right-3 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-sm"
        >
          <Heart 
            className={`w-5 h-5 md:w-4 md:h-4 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            }`} 
            strokeWidth={1.5}
          />
        </button>

        {/* Discount Badge */}
        {product.discount_percentage > 0 && (
          <div className="absolute top-3 left-3 bg-black text-white px-3 py-1 text-sm md:text-xs font-medium rounded">
            {product.discount_percentage}% OFF
          </div>
        )}

        {/* Desktop Hover Button */}
        <div className={`hidden md:block absolute bottom-2 left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
          hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <button
            onClick={() => isInCart ? navigate("/cart") : addCart(product)}
            className={`py-2 px-4 text-sm font-medium flex items-center gap-2 rounded-md whitespace-nowrap ${
              isInCart 
                ? "bg-white text-green-600 border border-green-600" 
                : "bg-white text-gray-900 border border-gray-900"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {isInCart ? "VIEW CART" : "ADD TO CART"}
          </button>
        </div>
      </div>

      {/* Product Info - Flex grow to push button to bottom */}
      <div className="p-4 flex-grow">
        <h3 className="font-medium text-gray-900 text-base md:text-sm line-clamp-2 mb-2 leading-tight">
          {product.name}
        </h3>

        {/* Product Meta */}
        <p className="text-sm md:text-xs text-gray-500 mb-3">
          {product.type} • {product.color}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2">
          <p className="font-semibold text-gray-900 text-lg md:text-base">₹{salePrice}</p>
          {product.discount_percentage > 0 && (
            <p className="text-sm md:text-xs text-gray-500 line-through">
              ₹{product.original_price}
            </p>
          )}
        </div>
      </div>
      
      {/* Mobile Cart Button - Fixed */}
      <div className="px-4 pb-4 md:hidden">
        <button
          onClick={() => isInCart ? navigate("/cart") : addCart(product)}
          className={`w-full py-2 text-base font-semibold flex justify-center items-center gap-2 rounded-lg transition-all active:scale-95 ${
            isInCart 
              ? "bg-white text-green-600 border border-green-600"
              : "bg-white text-black border border-gray-900 shadow-md"
          }`}
        >
          <ShoppingBag className="w-4 h-4" />
          {isInCart ? "VIEW IN CART" : "ADD TO CART"}
        </button>
      </div>
    </div>
  );
}

export default ProductCard;