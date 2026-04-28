import React, { useEffect, useState } from "react";
import { api } from "../Api/Axios";
import OrderStatusChart from "./Chart/OrderStatusChart";
import BagTypeChart from "./Chart/BarGraph";

export default function DashboardHome() {
  const [products, setProducts] = useState([]);
  const [users, setUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [amount,setAmount] = useState(null)
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
      setAmount(res.data.AmountStatus[0])
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


 


  // ---------------- DERIVED DATA ----------------
  const totalUsers = users.filter((u) => u.role === "user").length;
  const activeUsers = users.filter((u) => !u.isBlock).length;
  const paidOrders = orders.filter((o) => o.paymentStatus === "Paid");





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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-6 gap-4 lg:gap-6 mb-8">

          {/* Paid Revenue */}
          <div className="flex flex-col justify-between p-5 bg-white rounded-2xl border border-[#e9e0d4] shadow-sm hover:shadow-md transition-all duration-300 min-h-[140px]">
            <div>
              <h3 className="text-[#7a6a55] text-xs font-medium uppercase tracking-wider">
                Paid Revenue
              </h3>
              <p className="text-xl lg:text-2xl font-bold mt-3 text-green-700 whitespace-nowrap">
                ₹{amount?.Paid?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </p>
            </div>
            <div className="text-[11px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md self-start mt-2">
              Completed Payments
            </div>
          </div>

          {/* Pending Amount */}
          <div className="flex flex-col justify-between p-5 bg-white rounded-2xl border border-[#e9e0d4] shadow-sm hover:shadow-md transition-all duration-300 min-h-[140px]">
            <div>
              <h3 className="text-[#7a6a55] text-xs font-medium uppercase tracking-wider">
                Pending Amount
              </h3>
              <p className="text-xl lg:text-2xl font-bold mt-3 text-amber-600 whitespace-nowrap">
                ₹{amount?.Pending?.toLocaleString()}
              </p>
            </div>
            <div className="text-[11px] font-medium text-amber-600 bg-amber-50 px-2 py-1 rounded-md self-start mt-2">
              Awaiting Payment
            </div>
          </div>

          {/* Total Users */}
          <div className="flex flex-col justify-between p-5 bg-white rounded-2xl border border-[#e9e0d4] shadow-sm hover:shadow-md transition-all duration-300 min-h-[140px]">
            <div>
              <h3 className="text-[#7a6a55] text-xs font-medium uppercase tracking-wider">
                Total Users
              </h3>
              <p className="text-xl lg:text-2xl font-bold mt-3 text-[#4b3f2f]">
                {totalUsers}
              </p>
            </div>
            <div className="text-[11px] font-medium text-[#7a6a55] bg-gray-50 px-2 py-1 rounded-md self-start mt-2">
              Registered Accounts
            </div>
          </div>

          {/* Total Products */}
          <div className="flex flex-col justify-between p-5 bg-white rounded-2xl border border-[#e9e0d4] shadow-sm hover:shadow-md transition-all duration-300 min-h-[140px]">
            <div>
              <h3 className="text-[#7a6a55] text-xs font-medium uppercase tracking-wider">
                Total Products
              </h3>
              <p className="text-xl lg:text-2xl font-bold mt-3 text-[#4b3f2f]">
                {products.length}
              </p>
            </div>
            <div className="text-[11px] font-medium text-[#7a6a55] bg-gray-50 px-2 py-1 rounded-md self-start mt-2">
              Items in Catalog
            </div>
          </div>

          {/* Active Users */}
          <div className="flex flex-col justify-between p-5 bg-white rounded-2xl border border-[#e9e0d4] shadow-sm hover:shadow-md transition-all duration-300 min-h-[140px]">
            <div>
              <h3 className="text-[#7a6a55] text-xs font-medium uppercase tracking-wider">
                Active Users
              </h3>
              <p className="text-xl lg:text-2xl font-bold mt-3 text-[#4b3f2f]">
                {activeUsers}
              </p>
            </div>
            <div className="text-[11px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md self-start mt-2">
              Currently Active
            </div>
          </div>

          {/* Paid Orders */}
          <div className="flex flex-col justify-between p-5 bg-white rounded-2xl border border-[#e9e0d4] shadow-sm hover:shadow-md transition-all duration-300 min-h-[140px]">
            <div>
              <h3 className="text-[#7a6a55] text-xs font-medium uppercase tracking-wider">
                Paid Orders
              </h3>
              <p className="text-xl lg:text-2xl font-bold mt-3 text-[#4b3f2f]">
                {paidOrders.length}
              </p>
            </div>
            <div className="text-[11px] font-medium text-green-600 bg-green-50 px-2 py-1 rounded-md self-start mt-2">
              Successful Sales
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
