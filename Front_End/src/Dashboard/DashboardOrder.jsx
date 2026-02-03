import { User } from "lucide-react";
import React, { useEffect, useState } from "react";
import { api } from "../Api/Axios";

function DashboardOrder() {
  const [orders, setOrders] = useState([]);
  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrder = async () => {
    try {
      const res = await api.get(`/admin/order?name=${search}&status=${status}`);
      setOrders(res?.data?.orderData || []);
    } catch (e) {
      setOrders([]);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (orderId, status) => {
    await api.post(`/admin/order/orderStatus/${orderId}`, { status });
    fetchOrder();
  };

  useEffect(() => {
    const timer = setTimeout(() => fetchOrder(), 500);
    return () => clearTimeout(timer);
  }, [search, status]);

  const statusColor = {
    Pending: "bg-amber-100 text-amber-700",
    Shipped: "bg-blue-100 text-blue-700",
    Delivered: "bg-green-100 text-green-700",
    Cancelled: "bg-red-100 text-red-700",
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b6925e]"></div>
      </div>
    );
  }

  return (
    <div className="p-4 lg:p-6 bg-[#faf8f4] min-h-screen">
      {/* HEADER */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <h1 className="text-2xl lg:text-3xl font-serif text-[#4b3f2f] flex items-center gap-2">
          <User size={24} /> Orders
        </h1>
        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search customer..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-[#e6dfd3] bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6b98d]"
          />
          <div className="flex gap-2">
            <select
              name="status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="px-4 py-2.5 rounded-lg border border-[#e6dfd3] bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6b98d]"
            >
              <option value="">All Status</option>
              <option value="Pending">Pending</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
            <div className="text-sm bg-[#4b3f2f] text-white px-4 py-2.5 rounded-lg shadow text-center">
              Total: {orders.length}
            </div>
          </div>
        </div>
      </div>

      {orders.length === 0 ? (
        <div className="text-center text-[#7a6a55] py-16">
          {search || status ? "No orders found" : "No orders available"}
        </div>
      ) : (
        <div className="space-y-4 lg:space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-[#e6dfd3] rounded-xl shadow-sm p-4"
            >
              {/* ORDER HEADER - Responsive */}
              <div className="flex flex-col lg:flex-row lg:justify-between gap-4 mb-4 pb-4 border-b border-[#f0e9dd]">
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-2">
                    <div>
                      <p className="text-xs text-[#7a6a55]">Order ID</p>
                      <p className="font-mono text-sm font-semibold truncate max-w-[200px]">
                        {order._id.slice(-12)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-[#7a6a55]">Date</p>
                      <p className="text-sm">
                        {new Date(order.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm">
                    Customer:{" "}
                    <span className="font-semibold text-[#4b3f2f]">
                      {order?.user?.firstName} {order?.user?.lastName}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="text-sm">
                    <p className="text-[#7a6a55]">Payment: {order.paymentMethod}</p>
                    <p className="text-[#7a6a55]">
                      Status:{" "}
                      <span className="font-semibold">{order.paymentStatus}</span>
                    </p>
                  </div>
                  <select
                    value={order.orderStatus}
                    onChange={(e) => updateStatus(order._id, e.target.value)}
                    className="border border-[#e6dfd3] rounded px-3 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-[#d6b98d]"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Shipped">Shipped</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              {/* ITEMS - Responsive */}
              <div className="space-y-3">
                {order.items.map((item) => (
                  <div
                    key={item._id}
                    className="flex gap-3 p-3 bg-[#faf7f2] rounded-lg"
                  >
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-12 h-12 lg:w-16 lg:h-16 rounded-lg object-cover border border-[#e6dfd3]"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-[#4b3f2f] truncate">
                        {item.product.name}
                      </p>
                      <p className="text-xs text-[#7a6a55] mb-2">
                        {item.product.type}
                      </p>
                      <div className="grid grid-cols-2 lg:grid-cols-4 gap-2 lg:gap-3 text-sm">
                        <div className="text-center">
                          <p className="text-xs text-[#7a6a55]">Price</p>
                          <p className="text-green-600 font-semibold">
                            ₹{item.product.sale_price}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-[#7a6a55]">Quantity</p>
                          <p className="font-bold">{item.quantity}</p>
                        </div>
                        <div className="text-center lg:block hidden">
                          <p className="text-xs text-[#7a6a55]">Original</p>
                          <p className="line-through text-red-600 text-xs">
                            ₹{item.product.original_price}
                          </p>
                        </div>
                        <div className="text-center">
                          <p className="text-xs text-[#7a6a55]">Total</p>
                          <p className="font-bold">
                            ₹{item.product.sale_price * item.quantity}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* FOOTER */}
              <div className="mt-4 pt-4 border-t border-[#e6dfd3] flex flex-col sm:flex-row justify-between items-center gap-3">
                <span
                  className={`px-3 py-1.5 rounded-full text-xs font-semibold ${
                    statusColor[order.orderStatus]
                  }`}
                >
                  {order.orderStatus}
                </span>
                <p className="font-semibold text-lg text-[#4b3f2f]">
                  Total: ₹{order.totalAmount}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default DashboardOrder;