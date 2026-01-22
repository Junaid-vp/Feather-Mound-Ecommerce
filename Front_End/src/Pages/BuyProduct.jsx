// ============================================================================
// 📌 BuyProduct.jsx — Checkout / Place Order Page for Single Product Purchase
// - Reads product_id from route params
// - Builds order object from product details
// - Patches user's order array via API and navigates to success page
// ============================================================================

import React, { useContext } from "react";
import Address from "../Authentication/Address";
import { AuthContext } from "../Context/AuthContext";
import { api } from "../Api/Axios";
import { useNavigate, useParams } from "react-router-dom";
import useFetch from "../Hooks/UseFetch";
import { toast } from "react-toastify";

function BuyProduct() {
  // -------------------------------------------------------------------------
  // 🔍 ROUTE & NAVIGATION
  // -------------------------------------------------------------------------
  const { product_id } = useParams();
  const navigate = useNavigate();

  // -------------------------------------------------------------------------
  // 👤 AUTH & USER DATA
  // -------------------------------------------------------------------------
  const { user, setUser } = useContext(AuthContext);

  // -------------------------------------------------------------------------
  // 🛍 FETCH PRODUCTS (from your hook)
  // -------------------------------------------------------------------------
  const { datas } = useFetch("/products");

  // -------------------------------------------------------------------------
  // 🔎 FIND PRODUCT DETAIL (filter by product_id)
  // -------------------------------------------------------------------------
  const ProductDetail = datas.filter((item) => item.product_id == product_id);

  // -------------------------------------------------------------------------
  // 🧾 BUILD ORDER ITEM(S)
  // - Create unique item_id, order date, and default status
  // -------------------------------------------------------------------------
  const OrderDatas = ProductDetail.map((item) => ({
    ...item,
    item_id: crypto.randomUUID(),
    OrderDate: new Date().toLocaleDateString("en-IN"),
    status: "Pending",
    payment: user?.address[0]?.paymentMethod,
  }));

  // -------------------------------------------------------------------------
  // 🔢 QUANTITY & AMOUNTS
  // - totalQuantity is set to 1 (single product buy)
  // - totalAmount sums sale_price
  // - totalCost sums cost_price * Quantity (or 1)
  // -------------------------------------------------------------------------
  const totalQuantity = 1;

  const totalAmount = OrderDatas?.reduce((sum, item) => sum + item.sale_price, 0);

  const totalCost = OrderDatas?.reduce(
    (sum, item) => sum + item.cost_price * (item.Quantity || 1),
    0
  );

  // -------------------------------------------------------------------------
  // ✅ PLACE ORDER — PATCH USER ORDER ARRAY & NAVIGATE TO SUCCESS
  // -------------------------------------------------------------------------
  const placeOrder = async () => {
    try {
      const newOrder = {
        id: new Date().getTime().toString(),
        items: OrderDatas,
        totalAmount,
        totalCost,
        totalQuantity,
        date: new Date(),
        // status: "Pending"
      };

      const UpdateData = [...(user.order || []), newOrder];

      const res = await api.patch(`/users/${user.id}`, { order: UpdateData });

      setUser(res.data);
      // you may show a toast here if desired (keeps original import)
      // toast.success("Order placed successfully!");

      navigate(`/order-success/${newOrder.id}`);
    } catch (e) {
      console.log("Something error", e);
      // optional error toast
      // toast.error("Failed to place order. Try again.");
    }
  };


const confirmOrder = () => {
  if (user.address && user.address.length !==0) {
   placeOrder()
    
  } else {
    toast.warning("Write and save the address");
  }
};




  // -------------------------------------------------------------------------
  // 🖥️ RENDER
  // - Left: Cart Items (single product)
  // - Right: Address + Place Order button
  // -------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* ----------------------- Cart Items Section ----------------------- */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Cart Items</h2>
          <div className="space-y-4">
            {OrderDatas?.map((item, index) => (
              <div
                key={index}
                className="flex items-center gap-4 border-b border-gray-200 pb-4"
              >
                <img
                  src={item.image_url}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.name}</p>
                  <p className="text-gray-500">Quantity: {totalQuantity}</p>
                  <p className="text-gray-500">Price: ₹{item.sale_price}</p>
                  <p className="text-gray-700 font-semibold">
                    Subtotal: ₹{item.sale_price}
                  </p>
                </div>
              </div>
            ))}

            {/* ----------------------- Totals ----------------------- */}
            <div className="mt-4 border-t border-gray-200 pt-4 space-y-1">
              <p className="font-medium text-gray-800">Total Quantity: {totalQuantity}</p>
              <p className="font-bold text-lg text-gray-900">Total Amount: ₹{totalAmount}</p>
            </div>
          </div>
        </div>

        {/* ----------------------- Address & Payment Section ----------------------- */}
        <div className="flex-1 flex flex-col gap-6">
          <Address />

          <button
            onClick={confirmOrder}
            className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition duration-200 active:scale-95"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default BuyProduct;
