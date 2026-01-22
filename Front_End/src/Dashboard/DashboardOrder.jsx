import { User } from "lucide-react";
import React, { useContext, useState } from "react";
import { OrderContext } from "./Context/OrderContext";

function DashboardOrder() {
  const [search, setSearch] = useState("");
  const { AllOrder, UpdateStatus } = useContext(OrderContext);

  const filteredData = AllOrder?.filter((item) =>
    item.userName?.toLowerCase().includes(search.toLowerCase())
  );

  const statusColors = {
    Cancelled: "text-red-600 bg-red-50",
    Delivered: "text-green-600 bg-green-50",
    Shipped: "text-blue-600 bg-blue-50",
    Pending: "text-amber-600 bg-amber-50",
  };

  const StatusBadge = ({ status }) => (
    <span
      className={`font-semibold px-2 py-1 rounded-full text-xs ${
        statusColors[status] || statusColors.Pending
      }`}
    >
      {status || "Pending"}
    </span>
  );

  const StatusSelect = ({ item }) => (
    <select
      value={item?.status || "Pending"}
      onChange={(e) =>
        UpdateStatus(item.userId, item.orderId, item.item_id, e.target.value)
      }
      className="border border-gray-300 px-2 py-1 rounded text-xs focus:outline-none focus:ring-1 focus:ring-[#d6b98d]"
    >
      <option>Pending</option>
      <option>Shipped</option>
      <option>Delivered</option>
      <option>Cancelled</option>
    </select>
  );

  const ProductImage = ({ item }) => (
    <div className="w-12 h-12 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
      {item?.image_url ? (
        <img
          src={item.image_url}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      ) : (
        <div className="text-xs text-gray-400">No Image</div>
      )}
    </div>
  );

  return (
    <div className="p-4 lg:p-6 bg-[#faf8f4] min-h-[70vh]">
      {/* Header */}
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
          <div className="text-sm bg-[#4b3f2f] text-white px-4 py-2.5 rounded-lg shadow text-center">
            Total: {filteredData?.length || 0}
          </div>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white/90 border border-[#e9e0d4] rounded-2xl shadow-lg">
        <table className="w-full text-sm text-[#4b3f2f]">
          <thead className="bg-[#f7f3ee]">
            <tr>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Customer</th>
              <th className="px-4 py-3 text-left">Details</th>
              <th className="px-4 py-3 text-right">Price</th>
              <th className="px-4 py-3 text-center">Qty</th>
              <th className="px-4 py-3 text-center">Date</th>
              <th className="px-4 py-3 text-center">Payment Method</th>
              <th className="px-4 py-3 text-center">Status</th>
              <th className="px-4 py-3 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredData?.map((item) => (
              <tr
                key={item.item_id}
                className="border-t border-[#f0e9dd] hover:bg-[#fcfbf9]"
              >
                <td className="px-4 py-3">
                  <ProductImage item={item} />
                </td>
                <td className="px-4 py-3">
                  <div className="max-w-[150px]">
                    <div className="font-medium truncate">{item.userName}</div>
                    <div className="text-xs text-[#7a6a55]">
                      ID: {item.userId}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="max-w-[180px]">
                    <div className="font-medium truncate">{item.name}</div>
                    <div className="text-xs text-[#7a6a55]">
                      {item.type} • {item.color}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="text-green-600 font-semibold">
                    ₹{item.sale_price}
                  </div>
                  <div className="text-xs text-red-500 line-through">
                    ₹{item.original_price}
                  </div>
                </td>
                <td className="px-4 py-3 text-center font-medium">
                  {item.Quantity || 1}
                </td>
                <td className="px-4 py-3 text-center text-sm">
                  {item.OrderDate}
                </td>
                <td className="px-4 py-3 text-center text-sm">
                  {item.payment}
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusBadge status={item.status} />
                </td>
                <td className="px-4 py-3 text-center">
                  <StatusSelect item={item} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Tablet Cards */}
      <div className="hidden md:block lg:hidden space-y-4">
        {filteredData?.map((item) => (
          <div
            key={item.item_id}
            className="bg-white/90 border border-[#e9e0d4] rounded-xl p-4 shadow-sm"
          >
            <div className="flex gap-4">
              <ProductImage item={item} />
              <div className="flex-1">
                <div className="mb-2">
                  <div className="font-semibold text-[#4b3f2f]">
                    {item.userName}
                  </div>
                  <div className="text-sm text-[#7a6a55]">{item.name}</div>
                  <div className="text-xs text-[#7a6a55]">
                    {item.type} • {item.color}
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-green-600 font-semibold">
                      ₹{item.sale_price}
                    </div>
                    <div className="text-xs">Qty: {item.Quantity || 1}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-[#7a6a55]">
                      {item.OrderDate}
                    </span>
                    <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                      {item.payment}
                    </span>
                    <StatusBadge status={item.status} />
                    <StatusSelect item={item} />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-3">
        {filteredData?.map((item) => (
          <div
            key={item.item_id}
            className="bg-white/90 border border-[#e9e0d4] rounded-lg p-3 shadow-sm"
          >
            <div className="mb-2">
              <div className="font-semibold text-[#4b3f2f] text-sm">
                {item.userName}
              </div>
              <div className="text-xs text-[#7a6a55]">ID: {item.userId}</div>
            </div>
            <div className="flex gap-3">
              <ProductImage item={item} />
              <div className="flex-1">
                <div className="font-medium text-sm">{item.name}</div>
                <div className="text-xs text-[#7a6a55]">
                  {item.type} • {item.color}
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div>
                    <div className="text-green-600 font-semibold text-sm">
                      ₹{item.sale_price}
                    </div>
                    <div className="text-xs">Qty: {item.Quantity || 1}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <StatusBadge status={item.status} />
                    <StatusSelect item={item} />
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="text-xs text-[#7a6a55]">
                    {item.OrderDate}
                  </div>
                  <span className="text-xs bg-gray-100 px-2 py-1 rounded">
                    {item.payment}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!filteredData || filteredData.length === 0) && (
        <div className="text-center text-[#7a6a55] py-8">No orders found</div>
      )}
    </div>
  );
}

export default DashboardOrder;