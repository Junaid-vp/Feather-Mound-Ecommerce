import React, { useEffect, useState } from "react";
import { api } from "../Api/Axios";
import OrderStatusChart from "./Chart/OrderStatusChart";
import BagTypeChart from "./Chart/BarGraph";

export default function DashboardHome() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  // ---------------- FETCH DATA ----------------
  const getProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res?.data?.Products || []);
    } catch (error) {
      console.error("Error fetching products:", error);
    }finally{
      setLoading(false)
    }
  };

  const getUsers = async () => {
    try {
      const res = await api.get("/admin/usersList");
      setUsers(res?.data?.UserData || []);
    } catch (error) {
      console.error("Error fetching users:", error);
    }finally{
      setLoading(false)
    }
  };

  const getOrders = async () => {
    try {
      const res = await api.get("/admin/order");
      setOrders(res?.data?.orderData || []);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }finally{
      setLoading(false)
    }
  };

  useEffect(() => {
    getProducts();
    getUsers();
    getOrders();
  }, []);


  console.log(orders);
  

  // ---------------- DERIVED DATA ----------------
  const totalUsers = users.filter((u) => u.role === "user").length;
  const activeUsers = users.filter((u) => !u.isBlock).length;

  const paidOrders = orders.filter(
    (o) => o.paymentStatus === "Paid"
  );

  const pendingOrders = orders.filter(
    (o) => o.paymentStatus === "Pending"
  );

  const paidTotalAmount = paidOrders.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0
  );

  const pendingTotalAmount = pendingOrders.reduce(
    (sum, o) => sum + (o.totalAmount || 0),
    0
  );

  const orderStatusData = orders.reduce((acc, o) => {
    acc[o.orderStatus] = acc[o.orderStatus]
      ? acc[o.orderStatus] + 1
      : 1;
    return acc;
  }, {});

    if (loading) {
    return (
      <div className="flex justify-center items-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#b6925e]"></div>
      </div>
    );
  }

  // ---------------- UI ----------------
  return (
    <div className="min-h-screen bg-[#fbf8f4] p-4 lg:p-6">
      <div className="max-w-screen-2xl mx-auto">

        {/* ================= SUMMARY CARDS ================= */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">

          {/* Paid Revenue */}
          <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">
              Paid Revenue
            </h3>
            <p className="text-xl lg:text-2xl font-bold mt-2 text-green-700">
              ₹{paidTotalAmount.toLocaleString()}
            </p>
            <div className="text-xs text-green-600 mt-1">
              Completed Payments
            </div>
          </div>

          {/* Pending Revenue */}
          <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">
              Pending Amount
            </h3>
            <p className="text-xl lg:text-2xl font-bold mt-2 text-amber-600">
              ₹{pendingTotalAmount.toLocaleString()}
            </p>
            <div className="text-xs text-amber-600 mt-1">
              Awaiting Payment
            </div>
          </div>

          {/* Total Users */}
          <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">
              Total Users
            </h3>
            <p className="text-xl lg:text-2xl font-bold mt-2 text-[#4b3f2f]">
              {totalUsers}
            </p>
            <div className="text-xs text-[#7a6a55] mt-1">
              Registered
            </div>
          </div>

          {/* Total Products */}
          <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">
              Total Products
            </h3>
            <p className="text-xl lg:text-2xl font-bold mt-2 text-[#4b3f2f]">
              {products.length}
            </p>
            <div className="text-xs text-[#7a6a55] mt-1">
              In Catalog
            </div>
          </div>

          {/* Active Users */}
          <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">
              Active Users
            </h3>
            <p className="text-xl lg:text-2xl font-bold mt-2 text-[#4b3f2f]">
              {activeUsers}
            </p>
            <div className="text-xs text-green-600 mt-1">
              Currently Active
            </div>
          </div>
            <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">
              Orders
            </h3>
            <p className="text-xl lg:text-2xl font-bold mt-2 text-[#4b3f2f]">
              {paidOrders.length}
            </p>
            <div className="text-xs text-green-600 mt-1">
              Paid Order
            </div>
          </div>

        </div>

        {/* ================= CHARTS ================= */}
        <div className="grid grid-cols-1 xl:grid-cols-1 gap-4 lg:gap-6">
          <div className="bg-white/95 border border-[#e9e0d4] rounded-xl lg:rounded-2xl shadow-lg p-3 lg:p-4 hover:shadow-xl transition">
            <BagTypeChart />
          </div>

          <div className="bg-white/95 border border-[#e9e0d4] rounded-xl lg:rounded-2xl shadow-lg p-3 lg:p-4 hover:shadow-xl transition">
            <OrderStatusChart data={orderStatusData} />
          </div>
        </div>

      </div>
    </div>
  );
}
