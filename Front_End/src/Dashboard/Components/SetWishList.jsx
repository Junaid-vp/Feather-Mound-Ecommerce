import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { api } from "../../Api/Axios";

function SetWishList() {
  const { Id } = useParams();
  const [wishList, setWishList] = useState([]);


  const fetchWishlist = async () => {
    try {
      const res = await api.get(`/admin/wishlist/userWishList/${Id}`);
      setWishList(res?.data?.WishListData || []);
    } catch (e) {
      console.error(e);
      toast.error("Failed to load wishlist");
      setWishList([]);
    }
  };

  useEffect(() => {
    if (Id) fetchWishlist();
  }, [Id]);

  const totalValue = wishList.reduce(
    (sum, item) => sum + item.product.sale_price,
    0
  );

  return (
    <div className="min-h-screen bg-[#faf8f4] p-4 lg:p-6 flex justify-center">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-[#e6dfd3] p-4 lg:p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-serif font-semibold text-[#4b3f2f]">
            User Wishlist Collection
          </h1>
          <span className="inline-block mt-3 px-4 py-1 rounded-full text-sm bg-[#4b3f2f] text-white">
            Total Items: {wishList.length}
          </span>
        </div>

        {/* EMPTY STATE */}
        {wishList.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">Wishlist is Empty</p>
            <p className="text-sm mt-1">
              No items found in user's wishlist
            </p>
          </div>
        ) : (
          <>
            {/* WISHLIST ITEMS */}
            <div className="space-y-5">
              {wishList.map((item) => (
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
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-center">
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
                        <p className="text-xs text-[#7a6a55]">Status</p>
                        <p className="font-semibold text-[#4b3f2f]">
                          {item.product.isActive ? "Available" : "Unavailable"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* SUMMARY */}
            <div className="mt-8 pt-6 border-t border-[#e6dfd3] flex justify-end">
              <div className="text-right">
                <p className="text-lg font-semibold text-[#4b3f2f]">
                  Total Wishlist Value: ₹{totalValue}
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

export default SetWishList;
