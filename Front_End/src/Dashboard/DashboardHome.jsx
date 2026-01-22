import React, { useEffect, useState } from "react";
import { api } from "../Api/Axios";
import useFetch from "../Hooks/UseFetch";
import OrderStatusChart from "./Chart/OrderStatusChart";
import BagTypeChart from "./Chart/BarGraph";

export default function DashboardHome() {
  const [products, setProducts] = useState([]);

  const GetProducts = async () => {
    try {
      const res = await api.get("/products");
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  useEffect(() => {
    GetProducts();
  }, []);

  const { datas } = useFetch("/users");

  const Users = datas?.filter((item) => item.role === "user") || [];
  const Active = datas?.filter((item) => item.isBlock === false) || [];

  const allOrder = Users.flatMap((user) => user.order || []);
  const allItems = allOrder.flatMap((order) => order.items || []);

  const pie = allItems.reduce((acc, val) => {
    acc[val.status] = acc[val.status] ? acc[val.status] + 1 : 1;
    return acc;
  }, {});

  const pendingItems = allItems.filter(
    (item) =>
      item.status === "Pending" ||
      item.status === "Delivered" ||
      item.status === "Shipped"
  );

  const totalAmount = pendingItems.reduce(
    (sum, item) => sum + (item.sale_price || 0),
    0
  );
  const totalCost = pendingItems.reduce(
    (sum, item) => sum + (item.cost_price || 0),
    0
  );

  return (
    <div className="min-h-screen bg-[#fbf8f4] p-4 lg:p-6">
      <div className="max-w-screen-2xl mx-auto">
        {/* Top Summary Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 lg:grid-cols-3 gap-4 lg:gap-6 mb-6">
          {/* Total Revenue */}
          <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">Total Revenue</h3>
            <p className="text-xl lg:text-2xl font-bold mt-1 lg:mt-2 text-[#4b3f2f]">
              ₹{totalAmount.toLocaleString()}
            </p>
            <div className="text-xs text-green-600 mt-1">Active Orders</div>
          </div>

          {/* Estimated Profit */}
          <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">Estimated Profit</h3>
            <p className="text-xl lg:text-2xl font-bold mt-1 lg:mt-2 text-[#4b3f2f]">
              ₹{(totalAmount - totalCost).toLocaleString()}
            </p>
            <div className="text-xs text-blue-600 mt-1">Margin</div>
          </div>

          {/* Total Users */}
          <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">Total Users</h3>
            <p className="text-xl lg:text-2xl font-bold mt-1 lg:mt-2 text-[#4b3f2f]">
              {Users.length}
            </p>
            <div className="text-xs text-[#7a6a55] mt-1">Registered</div>
          </div>

          {/* Total Products */}
          <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">Total Products</h3>
            <p className="text-xl lg:text-2xl font-bold mt-1 lg:mt-2 text-[#4b3f2f]">
              {products.length}
            </p>
            <div className="text-xs text-[#7a6a55] mt-1">In Catalog</div>
          </div>

          {/* Active Users */}
          <div className="p-4 lg:p-6 bg-white/90 rounded-xl lg:rounded-2xl border border-[#e9e0d4] shadow-lg hover:shadow-xl transition col-span-full sm:col-span-1 xl:col-span-1 lg:col-span-1">
            <h3 className="text-[#7a6a55] text-xs lg:text-sm">Active Users</h3>
            <p className="text-xl lg:text-2xl font-bold mt-1 lg:mt-2 text-[#4b3f2f]">
              {Active.length}
            </p>
            <div className="text-xs text-green-600 mt-1">Currently Active</div>
          </div>
        </div>

        {/* Chart Section */}
        <div className="grid grid-cols-1 xl:grid-cols-1 gap-4 lg:gap-6">
          <div className="bg-white/95 border border-[#e9e0d4] rounded-xl lg:rounded-2xl shadow-lg p-3 lg:p-4 hover:shadow-xl transition">
            <BagTypeChart />
          </div>
          <div className="bg-white/95 border border-[#e9e0d4] rounded-xl lg:rounded-2xl shadow-lg p-3 lg:p-4 hover:shadow-xl transition">
            <OrderStatusChart data={pie} />
          </div>
        </div>
      </div>
    </div>
  );
}