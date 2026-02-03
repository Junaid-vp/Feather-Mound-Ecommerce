const crypto = require("crypto");
const orderModule = require("../Models/orderModels");
require("dotenv").config();

const verifyPayment = async (req, res) => {
  try {
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      orderId,
    } = req.body;


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

    await orderModule.findByIdAndUpdate(orderId, {
      paymentStatus: "Paid",
      razorpay: {
        orderId: razorpay_order_id,
        paymentId: razorpay_payment_id,
        signature: razorpay_signature,
      },
    });

    return res.json({ success: true });
  } catch (err) {
    console.error("VERIFY PAYMENT ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};

module.exports = verifyPayment;
