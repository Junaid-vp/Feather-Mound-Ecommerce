import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../Api/Axios";

function SetCart() {
  const { Id } = useParams();
  const [cart, setCart] = useState([]);

  const fetchCart = async () => {
    try {
      const res = await api.get(`/admin/cart/userCart/${Id}`);
      setCart(res?.data?.CartData || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load cart");
      setCart([]);
    }
  };

  useEffect(() => {
    if (Id) fetchCart();
  }, [Id]);

  const totalValue = cart.reduce(
    (sum, item) => sum + item.product.sale_price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-[#faf8f4] p-4 lg:p-6 flex justify-center">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-[#e6dfd3] p-4 lg:p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-serif font-semibold text-[#4b3f2f]">
            User Cart Collection
          </h1>
          <span className="inline-block mt-3 px-4 py-1 rounded-full text-sm bg-[#4b3f2f] text-white">
            Total Items: {cart.length}
          </span>
        </div>

        {/* EMPTY CART */}
        {cart.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Cart is Empty</p>
            <p className="text-sm mt-1">No items found in user cart</p>
          </div>
        ) : (
          <>
            {/* CART ITEMS */}
            <div className="space-y-5">
              {cart.map((item) => {
                const totalItemPrice =
                  item.product.sale_price * item.quantity;

                return (
                  <div
                    key={item._id}
                    className="flex flex-col md:flex-row gap-5 border border-[#e9e0d4] rounded-2xl p-5 bg-white hover:shadow-md transition"
                  >
                    {/* IMAGE */}
                    <div className="flex-shrink-0">
                      <img
                        src={item.product.image_url}
                        alt={item.product.name}
                        className="w-24 h-24 rounded-xl object-cover border"
                        onError={(e) =>
                          (e.target.src =
                            "https://via.placeholder.com/96?text=No+Image")
                        }
                      />
                    </div>

                    {/* DETAILS */}
                    <div className="flex-1">
                      {/* TOP ROW */}
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="text-lg font-semibold text-[#4b3f2f]">
                            {item.product.name}
                          </h3>
                          <p className="text-sm text-[#7a6a55]">
                            Type: {item.product.type}
                          </p>
                        </div>

                        <span
                          className={`px-3 py-1 rounded-full text-xs font-semibold ${
                            item.product.isActive
                              ? "bg-green-100 text-green-700"
                              : "bg-red-100 text-red-700"
                          }`}
                        >
                          {item.product.isActive ? "Active" : "Inactive"}
                        </span>
                      </div>

                      {/* PRICE GRID */}
                      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 mt-4 text-center">
                        <div>
                          <p className="text-xs text-[#7a6a55]">Original</p>
                          <p className="text-red-600 line-through font-semibold">
                            ₹{item.product.original_price}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#7a6a55]">Sale</p>
                          <p className="text-green-600 font-semibold">
                            ₹{item.product.sale_price}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#7a6a55]">Discount</p>
                          <p className="font-semibold text-blue-600">
                            {item.product.discount_percentage || 0}%
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#7a6a55]">Quantity</p>
                          <p className="font-bold text-[#4b3f2f]">
                            {item.quantity}
                          </p>
                        </div>

                        <div>
                          <p className="text-xs text-[#7a6a55]">Item Total</p>
                          <p className="font-bold text-[#4b3f2f]">
                            ₹{totalItemPrice}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* SUMMARY */}
            <div className="mt-8 pt-6 border-t border-[#e6dfd3] flex justify-end">
              <div className="text-right">
                <p className="text-lg font-semibold text-[#4b3f2f]">
                  Total Cart Value: ₹{totalValue}
                </p>
                <p className="text-xs text-[#7a6a55]">
                  Based on sale prices
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default SetCart;
