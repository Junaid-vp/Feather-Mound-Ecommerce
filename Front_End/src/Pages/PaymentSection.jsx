import React from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { api } from "../Api/Axios";
import { toast } from "react-toastify";
import { useContext } from "react";
import { CartContext } from "../Context/CartContext";

export default function PaymentSection() {
  const [searchParams] = useSearchParams();
  const itemId = searchParams.get("ItemId");
  const quantity = Number(searchParams.get("quantity"));
  const { fetchCart } = useContext(CartContext)
  const navigate = useNavigate();
const orderId = 123
  const HandlePlaceOrder = async () => {
    try {
      if (!itemId || !quantity) {
        await api.post("/order/cart", { paymentMethod: "COD" });
        fetchCart()
        toast.success("Order Placed SuccesFull");
        navigate(`/order-success/${orderId}`, { replace: true });
        return
      }

      await api.post("/order/single", {
        ItemId: itemId,
        quantity: quantity,
        paymentMethod: "COD",
      });

      toast.success("Order Placed SuccesFull");
      navigate(`/order-success/${itemId}`, { replace: true });
    } catch (e) {
      toast.success(e?.response?.data?.message);
    }
  };

  return (
    <div className="min-h-screen flex items-start justify-center bg-white p-4 py-30">
      <div className="w-full max-w-2xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 p-6 text-center">
          <h2 className="text-2xl font-light tracking-wide text-black">
            Payment Options
          </h2>
        </div>

        <div className="p-6 space-y-4">
          <div className="border border-gray-200 p-4">
            <h3 className="text-sm uppercase tracking-wider font-light text-black mb-2">
              Cash on Delivery
            </h3>
            <p className="text-xs text-gray-500 font-light mb-4">
              Pay when your order is delivered to your address
            </p>
            <button
              className="w-full py-3 bg-black text-white border border-black
              hover:bg-white hover:text-black transition-all duration-300
              font-light tracking-wider text-xs uppercase"
              onClick={HandlePlaceOrder}
            >
              Place Order
            </button>
          </div>

          <div className="border border-gray-200 p-4">
            <h3 className="text-sm uppercase tracking-wider font-light text-black mb-2">
              Pay Online
            </h3>
            <p className="text-xs text-gray-500 font-light mb-4">Razor-Pay</p>
            <button
              className="w-full py-3 bg-white text-black border border-black
              hover:bg-black hover:text-white transition-all duration-300
              font-light tracking-wider text-xs uppercase"
            >
              Pay Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
