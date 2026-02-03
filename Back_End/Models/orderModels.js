const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
      required: true,
    },
  
    items: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quantity: {
          type: Number,
          required: true,
          default: 1,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },

    paymentMethod: {
      type: String,
      enum: ["COD", "Razorpay"],
      required: true,
    },

    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid", "Failed"],
      default: "Pending",
    },

    razorpay: {
      type: {
        orderId: String,
        paymentId: String,
        signature: String,
      },
      default: null,
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Confirmed", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true },
);

const orderModule = mongoose.model("order", orderSchema);

module.exports = orderModule;
