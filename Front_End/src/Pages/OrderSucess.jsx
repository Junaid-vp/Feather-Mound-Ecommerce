// ============================================================================
// 📌 OrderSuccess.jsx — Order Confirmation Screen
// - Displays visual success UI after placing an order
// - Shows Order ID & provides navigation options
// ============================================================================

import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function OrderSuccess() {
  // ------------------------------------------------------------------------
  // 📍 Route Params & Navigation
  // ------------------------------------------------------------------------
  const { orderId } = useParams();
  const navigate = useNavigate();

  // ------------------------------------------------------------------------
  // 🚀 Auto-scroll to top on mount
  // ------------------------------------------------------------------------
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // ------------------------------------------------------------------------
  // 🎨 UI Render
  // ------------------------------------------------------------------------
  return (
    <div
      className="min-h-screen bg-white flex items-center justify-center p-6"
      data-aos="zoom-out-up"
      data-aos-duration="1600"
      data-aos-easing="ease-in-out-cubic"
    >
      <div
        className="w-full max-w-2xl text-center rounded-2xl border border-gray-100 bg-white shadow-lg"
        style={{ padding: 32 }}
        role="main"
        aria-labelledby="os-title"
      >
        {/* --------------------- Success Icon --------------------- */}
        <div
          className="mx-auto mb-6 flex items-center justify-center rounded-full border-2 border-gray-200"
          style={{
            width: 92,
            height: 92,
            background:
              "linear-gradient(180deg, rgba(255,255,255,0.9), rgba(250,250,250,0.95))",
            boxShadow: "0 10px 30px rgba(0,0,0,0.06)",
          }}
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="w-11 h-11 text-black"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        {/* --------------------- Text Content --------------------- */}
        <h1 id="os-title" className="font-serif text-3xl font-semibold text-black mb-2">
          Order Placed Successfully
        </h1>

        <p className="text-gray-600 mb-3">Thank you — your order is on its way.</p>

        <p className="text-sm text-gray-400 mb-8">
          <span className="text-gray-500 mr-2">Order ID:</span>
          <span className="text-black font-medium">{orderId}</span>
        </p>

        {/* --------------------- Action Buttons --------------------- */}
        <div className="flex justify-center gap-4">
          <button
            onClick={() => navigate(`/vieworder/${orderId}`)}
            className="bg-black text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:opacity-95"
          >
            View Orders
          </button>

          <button
            onClick={() => navigate("/")}
            className="bg-white border border-gray-200 text-black px-6 py-3 rounded-lg text-sm font-semibold shadow-sm hover:bg-gray-50"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
