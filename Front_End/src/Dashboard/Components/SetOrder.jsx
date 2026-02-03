import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../Api/Axios";

function SetOrder() {
  const { Id } = useParams();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const res = await api.get(`/admin/order/userOrder/${Id}`);
      setOrders(res?.data?.orderData || []);
    } catch (e) {
      console.error(e.message);
      setOrders([]);
    }
  };

  useEffect(() => {
    if (Id) fetchOrders();
  }, [Id]);

  return (
    <div className="min-h-screen bg-[#faf8f4] p-4 lg:p-6 flex justify-center">
      <div className="bg-white w-full max-w-5xl rounded-2xl shadow-xl border border-[#e6dfd3] p-4 lg:p-8">

        {/* HEADER */}
        <div className="text-center mb-8">
          <h1 className="text-2xl lg:text-3xl font-serif font-semibold text-[#4b3f2f]">
            User Orders
          </h1>
          <span className="inline-block mt-3 px-4 py-1 rounded-full text-sm bg-[#4b3f2f] text-white">
            Total Orders: {orders.length}
          </span>
        </div>

        {/* EMPTY STATE */}
        {orders.length === 0 ? (
          <div className="text-center py-16 text-gray-500">
            <p className="text-lg">No Orders Found</p>
            <p className="text-sm mt-1">User hasn’t placed any orders yet</p>
          </div>
        ) : (
          <div className="space-y-8">
            {orders.map((order) => (
              <div
                key={order._id}
                className="border border-[#efe7db] rounded-2xl p-5 bg-white"
              >
                {/* ORDER HEADER */}
                <div className="flex flex-col sm:flex-row sm:justify-between gap-3 mb-5">
                  <div>
                    <p className="text-sm text-[#7a6a55]">Order ID</p>
                    <p className="font-mono text-sm">{order._id}</p>
                    <p className="text-sm text-[#7a6a55] mt-1">
                      {new Date(order.createdAt).toDateString()}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-sm text-[#7a6a55]">Order Status</p>
                    <span
                      className={`inline-block mt-1 px-3 py-1 rounded-full text-xs font-semibold ${
                        order.orderStatus === "Delivered"
                          ? "bg-green-100 text-green-700"
                          : order.orderStatus === "Shipped"
                          ? "bg-blue-100 text-blue-700"
                          : order.orderStatus === "Cancelled"
                          ? "bg-red-100 text-red-700"
                          : "bg-amber-100 text-amber-700"
                      }`}
                    >
                      {order.orderStatus}
                    </span>
                  </div>
                </div>

                {/* ORDER ITEMS */}
                <div className="space-y-4">
                  {order.items.map((item) => {
                    const product = item.product;
                    const itemTotal =
                      product.sale_price * item.quantity;

                    return (
                      <div
                        key={item._id}
                        className="flex flex-col md:flex-row gap-5 border border-[#e9e0d4] rounded-xl p-4"
                      >
                        {/* IMAGE */}
                        <img
                          src={product.image_url}
                          alt={product.name}
                          className="w-20 h-20 rounded-lg border object-cover"
                        />

                        {/* DETAILS */}
                        <div className="flex-1">
                          <h3 className="font-semibold text-[#4b3f2f]">
                            {product.name}
                          </h3>
                          <p className="text-sm text-[#7a6a55]">
                            Type: {product.type}
                          </p>

                          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mt-3 text-center">
                            <div>
                              <p className="text-xs">Original</p>
                              <p className="line-through text-red-600">
                                ₹{product.original_price}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs">Sale</p>
                              <p className="text-green-600 font-semibold">
                                ₹{product.sale_price}
                              </p>
                            </div>
                            <div>
                              <p className="text-xs">Discount</p>
                              <p className="text-blue-600">
                                {product.discount_percentage || 0}%
                              </p>
                            </div>
                            <div>
                              <p className="text-xs">Qty</p>
                              <p className="font-bold">{item.quantity}</p>
                            </div>
                            <div>
                              <p className="text-xs">Item Total</p>
                              <p className="font-bold">
                                ₹{itemTotal}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* ORDER FOOTER */}
                <div className="mt-6 pt-4 border-t border-[#e6dfd3] flex justify-end">
                  <div className="text-right">
                    <p className="text-sm text-[#7a6a55]">
                      Total Amount
                    </p>
                    <p className="text-lg font-semibold text-[#4b3f2f]">
                      ₹{order.totalAmount}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SetOrder;
