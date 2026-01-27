
import React, { useContext } from "react";
import { CartContext } from "../Context/CartContext";
import Address from "../Authentication/Address";
import { Plus, Minus ,Trash2} from "lucide-react";
import { AuthContext } from "../Context/AuthContext";
import { api } from "../Api/Axios";

import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

function CheckOut() {

  const { cart ,cartLength, addQuantity, lessQuantity,removeCart} =useContext(CartContext) 
const totalQuantity = cart.reduce(
  (sum, item) => sum + item?.quantity,
  0
);

  const totalAmount = cart.reduce(
  (sum, item) => sum + item.product.sale_price * item.quantity,
  0
);

  const navigate  = useNavigate()




  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-8">
        {/* ----------------------- Cart Items Section ----------------------- */}
        <div className="flex-1 bg-white shadow-lg rounded-2xl p-6 border border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Cart Items</h2>
          <div className="space-y-4">
            {cart.map((item, index) => (
              <div
                key={item.product._id}
                className="flex items-center gap-4 border-b border-gray-200 pb-4"
              >
                  <button
                    onClick={() => removeCart(item.product)}
                  >
                    <Trash2 size={18} />
                  </button>
                <img
                  src={item.product.image_url}
                  alt={item.product.name}
                  className="w-20 h-20 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <p className="font-medium text-gray-900">{item.product.name}</p>
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
                  <p className="text-gray-500">Price: ₹{item.product.sale_price}</p>
                  <p className="text-gray-700 font-semibold">
                    Subtotal: ₹{item.product.sale_price * item.quantity}
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
            onClick={()=>navigate('/paymentSection')}
            className="w-full bg-black text-white py-3 rounded-xl text-lg font-semibold hover:bg-gray-900 transition duration-200 active:scale-95"
          >
          Continue
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckOut;
