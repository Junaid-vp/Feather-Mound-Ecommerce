// ============================================================================
// 📌 CheckOut.jsx — Checkout page to review cart items and place an order
// - Builds order object from cart context
// - Patches user's order array via API and clears cart on success
// ============================================================================

import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import Address from "../Authentication/Address";

import { AuthContext } from "../Context/AuthContext";
import { api } from "../Api/Axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CheckOut() {
  // ------------------------------------------------------------------------
  // 📍 Navigation
  // ------------------------------------------------------------------------
  const navigate = useNavigate();

  // ------------------------------------------------------------------------
  // 🛒 Cart Context (items, helpers)
  // ------------------------------------------------------------------------
  const { cart, cartLength, HandleClearCart } = useContext(CartContext);

  // ------------------------------------------------------------------------
  // 👤 Auth Context (user info)
  // ------------------------------------------------------------------------
  const { user, setUser } = useContext(AuthContext);

  // ------------------------------------------------------------------------
  // 🧾 BUILD ORDER ITEMS FROM CART
  // - Add item_id, order date, and default status
  // ------------------------------------------------------------------------
  const OrderDatas = cart.map((item) => ({
    ...item,
    item_id: crypto.randomUUID(),
    OrderDate: new Date().toLocaleDateString("en-IN"),
    status: "Pending",
    payment: user?.address[0]?.paymentMethod,
  }));

  // ------------------------------------------------------------------------
  // 🔢 CALCULATIONS
  // - totalAmount: sum of sale_price * Quantity
  // - totalQuantity: sum of Quantity
  // - totalCost: sum of cost_price * Quantity (fallback to 1)
  // ------------------------------------------------------------------------
  const totalAmount = OrderDatas.reduce(
    (sum, item) => sum + item.sale_price * item.Quantity,
    0
  );

  const totalQuantity = OrderDatas.reduce(
    (sum, item) => sum + item.Quantity,
    0
  );

  const totalCost = OrderDatas?.reduce(
    (sum, item) => sum + item.cost_price * (item.Quantity || 1),
    0
  );

  // ------------------------------------------------------------------------
  // ✅ placeOrder — PATCH user orders, clear cart, navigate to success
  // ------------------------------------------------------------------------
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
      console.log(res.data);

      // Clear cart using provided handler
      HandleClearCart(user.id);

      // Navigate to order success page
      navigate(`/order-success/${newOrder.id}`);
    } catch (e) {
      console.log("Something error", e);
      // optional toast for failure (keeps original import)
      // toast.error("Failed to place order. Try again.");
    }
  };

const confirmOrder = () => {
  if (user.address && user.address.length!== 0) {
    placeOrder();
  } else {
    toast.warning("Write and save the address");
  }
};




  // ------------------------------------------------------------------------
  // 🖥️ RENDER — Left: Cart Items / Right: Address & Place Order button
  // ------------------------------------------------------------------------
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* ----------------------- Cart Items Section ----------------------- */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Cart Items</h2>
          <div className="space-y-4">
            {OrderDatas.map((item, index) => (
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
                  <p className="text-gray-500">Quantity: {item.Quantity}</p>
                  <p className="text-gray-500">Price: ₹{item.sale_price}</p>
                  <p className="text-gray-700 font-semibold">
                    Subtotal: ₹{item.sale_price * item.Quantity}
                  </p>
                </div>
              </div>
            ))}

            {/* ----------------------- Totals ----------------------- */}
            <div className="mt-4 border-t border-gray-200 pt-4 space-y-1">
              <p className="font-medium text-gray-800">Total Items: {cartLength}</p>
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

export default CheckOut;
