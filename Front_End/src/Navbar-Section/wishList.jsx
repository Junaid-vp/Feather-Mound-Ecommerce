// ============================================================================
// WishList.jsx — Simple Wishlist (Horizontal Layout)
// ============================================================================

import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { WishListContext } from "../Context/WIshListContext";
import { CartContext } from "../Context/CartContext";
import { X, ArrowLeft } from "lucide-react";

function WishList() {
  const navigate = useNavigate();
  const { wishList, RemoveWishList } = useContext(WishListContext);
  const { addCart, cart } = useContext(CartContext);

  return (
    <div className="min-h-screen bg-white"  data-aos="fade-up"
     data-aos-duration="1000">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>

            <h1 className="text-lg font-medium text-gray-900">Wishlist</h1>

            <div className="text-sm text-gray-600">
              {wishList?.length || 0}{" "}
              {wishList?.length === 1 ? "item" : "items"}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 py-6">
        {!wishList || wishList.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">❤️</span>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Your wishlist is empty
            </h2>
            <p className="text-gray-600 mb-6 text-sm">
              Save items you love for later
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-6 py-2 rounded text-sm hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          // Wishlist Items - Horizontal Layout
          <div className="space-y-4">
            {wishList.map((item) => {
              const isInCart = cart.some(
                (cartItem) => cartItem.product_id === item.product_id
              );

              return (
                <div
                  key={item.product_id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white"
                >
                  {/* Product Image */}
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border border-gray-200"
                  />

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1">
                          {item.type} • {item.color}
                        </p>
                      </div>
                      <button
                        onClick={() => RemoveWishList(item)}
                        className="ml-2 p-1 hover:bg-gray-100 rounded"
                      >
                        <X className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    {/* Price and Action Button */}
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">
                        ₹{item.sale_price}
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            isInCart ? navigate("/cart") : addCart(item)
                          }
                          className={`px-4 py-2 rounded text-sm font-small border ${
                            isInCart
                              ? "border-gray-300 text-green-700 hover:bg-gray-50"
                              : "border-gray-300 text-gray-700 hover:bg-gray-50"
                          }`}
                        >
                          {isInCart ? "View Cart" : "Add to Cart"}
                        </button>
                        <button
                          onClick={() =>
                            navigate(`/buyproduct/${item.product_id}`)
                          }
                          className="bg-black text-white py-2 px-4 rounded text-sm font-small hover:bg-gray-800 transition-colors"
                        >
                          Buy Now
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default WishList;
