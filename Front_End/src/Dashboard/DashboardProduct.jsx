import React, { useEffect, useState } from "react";
import useFetch from "../Hooks/UseFetch";
import { api } from "../Api/Axios";
import { useNavigate } from "react-router-dom";

function DashboardProduct() {
  const { datas } = useFetch("/products");
  const [products, setProduct] = useState([]);
  const [Search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (datas) setProduct(datas);
  }, [datas]);

  const FilteredDatas = products?.filter((value) =>
    (value.name?.toLowerCase() || value.type?.toLowerCase())?.includes(Search?.toLowerCase())
  );

  const types = [...new Set(datas?.map((p) => p.type) || [])];

  const HandleActive = async (productId, status) => {
    await api.patch(`/products/${productId}`, { isActive: !status });
    setProduct((item) =>
      item.map((product) =>
        product.id === productId ? { ...product, isActive: !status } : product
      )
    );
  };

  return (
    <div className="p-4 lg:p-6 bg-[#fbf8f4] min-h-[70vh]">
      {/* Header */}
      <div className="mb-6 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-serif text-[#4b3f2f]">Products</h1>
          <p className="text-sm text-[#7a6a55] mt-1">Manage your product catalog</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">
          <div className="relative flex-1">
            <input
              type="text"
              value={Search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products..."
              className="w-full px-4 py-2 pr-10 rounded-lg border border-[#e6dfd3] bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6b98d]"
            />
            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#a8957b] bg-[#f7f3ee] px-1 rounded">
              {FilteredDatas?.length || 0}
            </span>
          </div>

          <select
            value={Search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-48 border border-[#e6dfd3] rounded-lg px-4 py-2 bg-white/90 text-sm focus:outline-none focus:ring-2 focus:ring-[#d6b98d]"
          >
            <option value="">All Types</option>
            {types.map((type, i) => (
              <option key={i} value={type}>{type}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Add Product Button */}
      <div className="mb-6">
        <button
          onClick={() => navigate("/dashboard/setproduct")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-[#4b3f2f] text-white text-sm hover:bg-[#3a3326] transition"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
          </svg>
          Add New Product
        </button>
      </div>

      {/* Desktop Table */}
      <div className="hidden lg:block bg-white/90 border border-[#e9e0d4] rounded-xl shadow-sm">
        <table className="w-full text-sm">
          <thead className="bg-[#f7f3ee] text-[#3e3223]">
            <tr>
              <th className="px-4 py-3 text-left">Image</th>
              <th className="px-4 py-3 text-left">Product</th>
              <th className="px-4 py-3 text-left">Type</th>
              <th className="px-4 py-3 text-right">Sale</th>
              <th className="px-4 py-3 text-right">Original</th>
              <th className="px-4 py-3 text-right">Cost</th>
              <th className="px-4 py-3 text-center">Actions</th>
              <th className="px-4 py-3 text-center">Status</th>
            </tr>
          </thead>
          <tbody>
            {FilteredDatas?.map((item) => (
              <tr key={item.id} className="border-b border-[#f0e9dd] hover:bg-[#fcfbf9]">
                <td className="px-4 py-3">
                  <div className="w-14 h-14 rounded-lg overflow-hidden bg-gray-100 border border-[#e6dfd3]">
                    <img
                      src={item.image_url}
                      alt={item.name}
                      className="w-full h-full object-cover"
                      onError={(e) => e.target.src = "https://via.placeholder.com/56?text=No+Image"}
                    />
                  </div>
                </td>
                <td className="px-4 py-3">
                  <div className="text-[#4b3f2f] font-medium truncate max-w-[200px]">{item.name}</div>
                </td>
                <td className="px-4 py-3">
                  <span className="px-2.5 py-0.5 rounded-full text-xs bg-[#f1e8dc] text-[#7a6a55]">
                    {item.type}
                  </span>
                </td>
                <td className="px-4 py-3 text-right text-green-600 font-semibold">₹{item.sale_price}</td>
                <td className="px-4 py-3 text-right text-red-500 line-through text-sm">₹{item.original_price}</td>
                <td className="px-4 py-3 text-right text-blue-600 font-medium">₹{item.cost_price}</td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => navigate(`/dashboard/setproduct/${item.id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-[#e6dfd3] bg-white hover:bg-[#f6f3ef] text-[#6b5a43] text-xs"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <button
                    onClick={() => HandleActive(item.id, item.isActive)}
                    className={`flex items-center gap-1 px-3 py-1.5 rounded-md text-xs font-medium ${
                      item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    <div className={`w-1.5 h-1.5 rounded-full ${item.isActive ? "bg-green-600" : "bg-red-600"}`}></div>
                    {item.isActive ? "Active" : "Inactive"}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="px-4 py-3 bg-[#faf7f2] text-xs text-[#7a6a55] flex justify-between border-t border-[#e6dfd3]">
          <div>Showing {FilteredDatas?.length || 0} products</div>
          <div>Miraggio • Product Catalog</div>
        </div>
      </div>

      {/* Mobile & Tablet Cards */}
      <div className="lg:hidden space-y-3">
        {FilteredDatas?.map((item) => (
          <div key={item.id} className="bg-white/90 border border-[#e9e0d4] rounded-lg p-3 shadow-sm">
            <div className="flex items-start gap-3">
              <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 border border-[#e6dfd3]">
                <img 
                  src={item.image_url} 
                  alt={item.name} 
                  className="w-full h-full object-cover"
                  onError={(e) => e.target.src = "https://via.placeholder.com/64?text=No+Image"}
                />
              </div>
              <div className="flex-1">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-sm font-semibold text-[#4b3f2f]">{item.name}</h3>
                    <span className="text-xs bg-[#f1e8dc] text-[#7a6a55] px-2 py-0.5 rounded-full">{item.type}</span>
                  </div>
                  <button
                    onClick={() => HandleActive(item.id, item.isActive)}
                    className={`px-2 py-1 rounded-full text-xs ${
                      item.isActive ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
                    }`}
                  >
                    {item.isActive ? "Active" : "Inactive"}
                  </button>
                </div>
                <div className="flex justify-between mt-2">
                  <div className="text-center">
                    <div className="text-[10px] text-[#7a6a55]">Sale</div>
                    <div className="text-green-600 font-semibold text-sm">₹{item.sale_price}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-[#7a6a55]">Original</div>
                    <div className="line-through text-red-500 text-xs">₹{item.original_price}</div>
                  </div>
                  <div className="text-center">
                    <div className="text-[10px] text-[#7a6a55]">Cost</div>
                    <div className="text-blue-600 font-medium text-sm">₹{item.cost_price}</div>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-3 pt-3 border-t border-[#e6dfd3]">
                  <div className="text-xs text-[#7a6a55]">ID: {item.id}</div>
                  <button
                    onClick={() => navigate(`/dashboard/setproduct/${item.id}`)}
                    className="flex items-center gap-1 px-3 py-1.5 rounded-md border border-[#e6dfd3] bg-white text-[#6b5a43] text-xs"
                  >
                    <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                    </svg>
                    Edit
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {(!FilteredDatas || FilteredDatas.length === 0) && (
        <div className="text-center py-12 text-[#7a6a55]">
          {Search ? "No products found" : "No products available"}
        </div>
      )}
    </div>
  );
}

export default DashboardProduct;