const crypto = require("crypto");
const cartModule = require("../Models/cartsModel");
const orderModule = require("../Models/orderModels");
require("dotenv").config();

const verifyPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Missing payment verification details",
      });
    }

    const body = razorpay_order_id + "|" + razorpay_payment_id;

    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest("hex");


    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Signature mismatch",
      });
    }

    const order = await orderModule.findOneAndUpdate(
      {
        user: req.user.userId,
        paymentMethod: "Razorpay",
        "razorpay.orderId": razorpay_order_id,
      },
      {
        paymentStatus: "Paid",
        razorpay: {
          orderId: razorpay_order_id,
          paymentId: razorpay_payment_id,
          signature: razorpay_signature,
        },
      },
      { new: true },
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found for this payment",
      });
    }

    if (order.orderSource === "cart") {
      await cartModule.updateOne(
        { user: req.user.userId },
        { $set: { items: [] } },
      );
    }

    return res.json({ success: true, orderId: order._id });
  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = verifyPayment;
