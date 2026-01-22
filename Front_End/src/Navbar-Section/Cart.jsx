// ============================================================================
// Cart.jsx — Minimal Shopping Cart with Sidebar Layout
// ============================================================================

import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeCart, addQuantity, lessQuantity } = useContext(CartContext);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.sale_price * item.Quantity,
    0
  );

  const shippingFee = totalAmount > 5000 ? 0 : 199;
  const finalTotal = totalAmount + shippingFee;

  return (
    <div className="min-h-screen bg-white"  data-aos="fade-up"
     data-aos-duration="1000">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="text-sm">Back</span>
            </button>
            
            <h1 className="text-lg font-medium text-gray-900">Cart</h1>

            <div className="text-sm text-gray-600">
              {cart.length} {cart.length === 1 ? 'item' : 'items'}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {cart.length === 0 ? (
          // Empty State
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🛒</span>
            </div>
            <h2 className="text-lg font-medium text-gray-900 mb-2">
              Your cart is empty
            </h2>
            <p className="text-gray-600 mb-6 text-sm">Add some items to get started</p>
            <button
              onClick={() => navigate("/")}
              className="bg-black text-white px-6 py-2 rounded text-sm hover:bg-gray-800"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items - Left Side (2/3 width) */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product_id}
                  className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white"
                >
                  {/* Product Image */}
                  <img
                    src={item.image_url}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded border border-gray-200"
                  />

                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex-1">
                        <h3 className="font-medium text-gray-900 text-sm line-clamp-2">
                          {item.name}
                        </h3>
                        <p className="text-gray-500 text-xs mt-1">
                          {item.type} • {item.color}
                        </p>
                      </div>
                      <button
                        onClick={() => removeCart(item)}
                        className="ml-2 p-1 hover:bg-gray-100 rounded"
                      >
                        <Trash2 className="w-4 h-4 text-gray-400" />
                      </button>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-gray-900">
                        ₹{item.sale_price * item.Quantity}
                      </p>
                      
                      <div className="flex items-center gap-2">
                        <button
                          className="w-8 h-8 flex justify-center items-center border border-gray-300 rounded hover:bg-gray-50"
                          onClick={() => lessQuantity(item.product_id)}
                          disabled={item.Quantity <= 1}
                        >
                          <Minus className="w-3 h-3" />
                        </button>

                        <span className="font-medium text-sm w-6 text-center">
                          {item.Quantity}
                        </span>

                        <button
                          className="w-8 h-8 flex justify-center items-center border border-gray-300 rounded hover:bg-gray-50"
                          onClick={() => addQuantity(item.product_id)}
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary - Right Side (1/3 width) */}
            <div className="lg:col-span-1">
              <div className="border border-gray-200 rounded-lg p-4 bg-white sticky top-4">
                <h3 className="font-medium text-gray-900 mb-4">Order Summary</h3>

                <div className="space-y-3 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Subtotal</span>
                    <span className="font-medium">₹{totalAmount}</span>
                  </div>
                  
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Shipping</span>
                    <span className="font-medium text-green-600">
                      {shippingFee === 0 ? "FREE" : "₹199"}
                    </span>
                  </div>

                  {shippingFee > 0 && (
                    <p className="text-xs text-gray-500 text-center">
                      Free shipping on orders over ₹5,000
                    </p>
                  )}
                </div>

                <div className="border-t pt-3 mb-4">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold text-gray-900">Total</span>
                    <span className="text-lg font-bold text-gray-900">
                      ₹{finalTotal}
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => navigate("/CheckOut")}
                  className="w-full bg-black text-white py-3 rounded text-sm font-medium hover:bg-gray-800 mb-3"
                >
                  Proceed to Checkout
                </button>

                <button
                  onClick={() => navigate("/")}
                  className="w-full border border-gray-300 text-gray-700 py-3 rounded text-sm font-medium hover:bg-gray-50"
                >
                  Continue Shopping
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;