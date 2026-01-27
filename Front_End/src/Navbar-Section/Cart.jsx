// Pages/Cart.jsx

import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import { Trash2, Plus, Minus, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Cart() {
  const navigate = useNavigate();
  const { cart, removeCart, addQuantity, lessQuantity } =
    useContext(CartContext);

  const totalAmount = cart.reduce(
    (sum, item) => sum + item.product.sale_price * item.quantity,
    0
  );

  const shippingFee = totalAmount > 5000 ? 0 : 199;
  const finalTotal = totalAmount + shippingFee;

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between">
          <button onClick={() => navigate("/")} className="flex gap-2">
            <ArrowLeft size={16} /> Back
          </button>
          <h1>Cart</h1>
          <span>{cart.length} items</span>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 py-6">
        {cart.length === 0 ? (
          <div className="text-center py-20">
            <h2>Your cart is empty</h2>
            <button
              onClick={() => navigate("/")}
              className="mt-4 bg-black text-white px-4 py-2"
            >
              Continue Shopping
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Cart Items */}
            <div className="lg:col-span-2 space-y-4">
              {cart.map((item) => (
                <div
                  key={item.product._id}
                  className="flex gap-4 border p-4 rounded"
                >
                  <img
                    src={item.product.image_url}
                    alt={item.product.name}
                    className="w-20 h-20 object-cover"
                  />

                  <div className="flex-1">
                    <h3>{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      {item.product.type}
                    </p>

                    <div className="flex justify-between items-center mt-2">
                      <p className="font-semibold">
                        ₹{item.product.sale_price * item.quantity}
                      </p>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => lessQuantity(item.product._id)}
                          disabled={item.quantity <= 1}
                        >
                          <Minus size={14} />
                        </button>

                        <span>{item.quantity}</span>

                        <button
                          onClick={() => addQuantity(item.product._id)}
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => removeCart(item.product)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))}
            </div>

            {/* Summary */}
            <div className="border p-4 rounded h-fit">
              <h3 className="mb-4">Order Summary</h3>

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shippingFee === 0 ? "FREE" : `₹${shippingFee}`}</span>
              </div>

              <hr className="my-3" />

              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹{finalTotal}</span>
              </div>

              <button
                onClick={() => navigate("/checkout")}
                className="w-full mt-4 bg-black text-white py-2"
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
