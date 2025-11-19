// ============================================================================
// 📌 ProductCard.jsx — Mobile-Friendly Luxury Product Card
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
      className="group relative bg-white border border-gray-200 rounded-lg overflow-hidden"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
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

        {/* Wishlist Button - Always visible on mobile */}
        <button
          onClick={() => toggleWishlist(product)}
          className="absolute top-2 right-2 p-1.5 bg-white bg-opacity-80 rounded-full backdrop-blur-sm"
        >
          <Heart 
            className={`w-4 h-4 transition-all ${
              isInWishlist 
                ? "fill-red-500 text-red-500" 
                : "text-gray-600"
            }`} 
            strokeWidth={1.5}
          />
        </button>

        {/* Discount Badge */}
        {product.discount_percentage > 0 && (
          <div className="absolute top-2 left-2 bg-black text-white px-2 py-1 rounded text-xs font-medium">
            {product.discount_percentage}% OFF
          </div>
        )}

        {/* Cart Action Button - Always visible on mobile, hover effect on desktop */}
        <div className={`absolute bottom-2 left-2 right-2 md:left-1/2 md:transform md:-translate-x-1/2 md:bottom-3 transition-all duration-300 ${
          hover ? "md:opacity-100 md:translate-y-0" : "md:opacity-0 md:translate-y-4"
        }`}>
          <button
            onClick={() => isInCart ? navigate("/cart") : addCart(product)}
            className={`w-full py-2 px-3 rounded text-sm font-medium transition-colors flex items-center justify-center gap-2 ${
              isInCart 
                ? "bg-green-600 text-white hover:bg-green-700" 
                : "bg-black text-white hover:bg-gray-800"
            } md:bg-white md:border md:py-1.5 md:px-2 md:text-xs ${
              isInCart 
                ? "md:text-green-600 md:border-green-600 md:hover:bg-green-50" 
                : "md:text-gray-900 md:border-gray-900 md:hover:bg-gray-900 md:hover:text-white"
            }`}
          >
            <ShoppingBag className="w-3 h-3 md:w-3 md:h-3" />
            <span className="md:hidden">
              {isInCart ? "View Cart" : "Add to Cart"}
            </span>
            <span className="hidden md:inline">
              {isInCart ? "VIEW CART" : "ADD TO CART"}
            </span>
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-3 md:p-4 space-y-2 md:space-y-3">
        <h3 className="font-medium text-gray-900 text-sm md:text-lg line-clamp-2 leading-tight">
          {product.name}
        </h3>

        {/* Product Meta */}
        <p className="text-xs text-gray-500 uppercase tracking-wide">
          {product.type} • {product.color}
        </p>

        {/* Price */}
        <div className="flex items-center gap-2 md:gap-3 flex-wrap">
          <p className="text-base md:text-xl font-semibold text-gray-900">₹{salePrice}</p>
          {product.discount_percentage > 0 && (
            <>
              <p className="text-xs md:text-sm text-gray-500 line-through">
                ₹{product.original_price}
              </p>
              <p className="text-xs text-green-600 font-medium">
                Save ₹{product.original_price - salePrice}
              </p>
            </>
          )}
        </div>
      </div>

      {/* Luxury Border Effect - Desktop only */}
      <div className={`hidden md:block absolute inset-0 border-2 border-transparent group-hover:border-gray-900 rounded-lg transition-all duration-300 pointer-events-none ${
        hover ? "opacity-20" : "opacity-0"
      }`}></div>
    </div>
  );
}

export default ProductCard;