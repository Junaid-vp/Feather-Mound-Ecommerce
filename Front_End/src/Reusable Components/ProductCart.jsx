// ============================================================================
// 📌 ProductCard.jsx — Responsive Mobile & Desktop (FIXED per request)
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
  (item) => item.product?._id === product._id
);


  const isInCart = cart.some(
  (item) => item.product?._id === product._id
);


  const salePrice = Math.round(
    product.original_price -
      (product.original_price * product.discount_percentage) / 100
  );

  const discountAmount = product.original_price - salePrice;

  const navigateToDetail = () => {
    navigate(`/Detailpage/${product._id}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div 
      className="group relative bg-white rounded-lg overflow-hidden flex flex-col h-full shadow-sm hover:shadow-lg transition-shadow duration-300"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image Section - Tappable area for navigation */}
      <div
        onClick={navigateToDetail}
        className="relative overflow-hidden flex-shrink-0 w-full cursor-pointer"
      >
        <img
          src={product.image_url}
          alt={product.name}
          className={`w-full h-40 sm:h-48 md:h-56 object-cover transition-all duration-300 ${
            hover ? "md:scale-105" : "scale-100"
          }`}
        />

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation(); // Prevents navigating to detail page
            toggleWishlist(product);
          }}
          className="absolute top-2 right-2 p-2 bg-white/90 rounded-full shadow-md hover:bg-white transition"
          aria-label={isInWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart 
            className={`w-4 h-4 ${
              isInWishlist ? "fill-red-500 text-red-500" : "text-gray-600"
            } transition-colors`} 
            strokeWidth={1.5}
          />
        </button>

        {/* Discount Badge */}
        {product.discount_percentage > 0 && (
          <div className="absolute top-2 left-2 bg-black text-white px-2 py-0.5 text-xs font-semibold rounded">
            {product.discount_percentage}% OFF
          </div>
        )}

        {/* 📌 FIX: Desktop Hover Add to Cart Button (Only shows on desktop hover) */}
        <div 
          className={`hidden md:block absolute bottom-4 left-1/2 transform -translate-x-1/2 transition-all duration-300 pointer-events-none ${
          hover ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}>
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevents navigating to detail page
              isInCart ? navigate("/cart") : addCart(product);
            }}
            className={`py-2 px-4 text-sm font-medium flex items-center gap-2 rounded whitespace-nowrap shadow-lg pointer-events-auto transition-colors ${
              isInCart 
                ? "bg-white text-green-600 border border-green-600 hover:bg-gray-50" 
                : "bg-black text-white hover:bg-gray-800"
            }`}
          >
            <ShoppingBag className="w-4 h-4" />
            {isInCart ? "VIEW IN CART" : "ADD TO CART"}
          </button>
        </div>
      </div>

      {/* Product Info Section */}
      <div className="p-3 flex-grow flex flex-col">
        {/* Product Name */}
        <h3 
          className="font-medium text-gray-900 text-sm line-clamp-2 mb-1 min-h-[2.5rem] cursor-pointer"
          onClick={navigateToDetail}
        >
          {product.name}
        </h3>

        {/* 📌 FIX: Product Meta - HIDDEN on mobile, SHOW on tablet/desktop */}
        <p className="text-xs text-gray-500 mb-2 sm:block hidden"> 
          {product.type} 
        </p>

        {/* Price Section */}
        <div className="flex items-center gap-2 mt-auto">
          <p className="font-semibold text-gray-900 text-base">₹{salePrice}</p>
          
          {product.discount_percentage > 0 && (
            <>
              <p className="text-sm text-gray-500 line-through">
                ₹{product.original_price}
              </p>
              <span className="ml-auto text-xs text-green-600 font-medium">
                Save ₹{discountAmount}
              </span>
            </>
          )}
        </div>

        {/* 📌 FIX: Mobile Add to Cart Button DIV REMOVED - User requested no cart button on mobile */}
      </div>
      
      {/* 📌 FIX: Desktop Always Visible Button DIV REMOVED - Replaced by hover button */}
    </div>
  );
}

export default ProductCard;