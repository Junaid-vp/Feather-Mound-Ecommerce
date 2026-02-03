import React from 'react'

export default function Modal({ onClose, onConfirm }) {
    return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[90%] max-w-md rounded-lg p-6 shadow-xl">

        {/* Title */}
        <h2 className="text-base font-medium tracking-wide text-black">
          Cancel Order
        </h2>

        {/* Description */}
        <p className="mt-3 text-sm text-gray-600 leading-relaxed">
          Are you sure you want to cancel this order?  
          Once cancelled, this action cannot be undone.
        </p>

        {/* Action buttons */}
        <div className="mt-8 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-light tracking-wide
                       border border-gray-300 text-gray-700
                       hover:border-black hover:text-black
                       transition"
          >
            Keep Order
          </button>

          <button
            onClick={onConfirm}
            className="px-4 py-2 text-xs font-light tracking-wide
                       bg-black text-white
                       hover:bg-gray-900
                       transition"
          >
            Cancel Order
          </button>
        </div>
      </div>
    </div>
  );
};

