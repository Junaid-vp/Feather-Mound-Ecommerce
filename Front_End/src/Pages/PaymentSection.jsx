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
  const { fetchCart } = useContext(CartContext);
  const navigate = useNavigate();

  const HandlePlaceOrder = async () => {
    try {
      const url = itemId ? "/order/single" : "/order/cart";
      const Data = itemId
        ? { ItemId: itemId, quantity: quantity, paymentMethod: "COD" }
        : { paymentMethod: "COD" };
      const res = await api.post(url, Data);
      fetchCart();
      toast.success("Order placed successfully.", {
        position: "top-right",
        autoClose: 2200,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        className: "premium-toast success",
      });
      navigate(`/order-success/${res.data.orderId}`);
    } catch (e) {
      toast.success(e?.response?.data?.message);
    }
  };

  const handleRazorpay = async () => {
    const url = itemId ? "/order/single" : "/order/cart";
    const Data = itemId
      ? { ItemId: itemId, quantity: quantity, paymentMethod: "Razorpay" }
      : { paymentMethod: "Razorpay" };
    const res = await api.post(url, Data);
    const { razorpayOrder, orderId, key } = res.data;
    const options = {
      key,
      amount: razorpayOrder.amount,
      currency: "INR",
      order_id: razorpayOrder.id,
      name: "Feather-Mound",
      handler: async function (response) {
        
        try {
          const verifyRes = await api.post("/order/verify-payment", {
            ...response,
            orderId,
          });

          if (verifyRes.data.success) {
            toast.success("Payment successful");
            fetchCart();
            navigate(`/order-success/${orderId}`);
          } else {
            toast.error("Payment verification failed");
          }
        } catch (err) {
    
          toast.error("Payment verification error");
        }
      },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
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
              onClick={handleRazorpay}
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
