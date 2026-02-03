const razorpay = require("../Config/razorPay");
const cartModule = require("../Models/cartsModel");
const orderModule = require("../Models/orderModels");
const productsModel = require("../Models/productsModel");
require("dotenv").config();

const showOrderList = async (req, res) => {
  try {
    let userID = req.user.userId;

    const OrderData = await orderModule
      .find({ user: userID })
      .populate("items.product")
      .sort({ createdAt: -1 })
      .lean();

    if (OrderData.length === 0) {
      return res.status(200).json({ Message: "Order List Is Empty" });
    }
    res.status(200).json({ orderData: OrderData, status: "success" });
  } catch (e) {
    res
      .status(500)
      .json({ Message: "Error in showOrderList", Error: e.message });
  }
};

const orderSingleProduct = async (req, res) => {
  try {
    let userID = req.user.userId;
    const { ItemId, quantity, paymentMethod } = req.body;

    if (!quantity || quantity < 1) {
      return res.status(400).json({ Message: "Invalid Quantity" });
    }

    const product = await productsModel.findById(ItemId);
    if (!product) {
      return res.status(404).json({ Message: "Product Not Found" });
    }

    if (paymentMethod === "COD") {
      const totalAmount = product.sale_price * quantity;
      const order = await orderModule.create({
        user: userID,
        items: [{ product: ItemId, quantity: quantity }],
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
      });
      return res
        .status(200)
        .json({ Message: "Order Placed SuccessFully", orderId: order._id });
    }
    if (paymentMethod === "Razorpay") {
      const totalAmount = product.sale_price * quantity;

      const order = await orderModule.create({
        user: userID,
        items: [{ product: ItemId, quantity: quantity }],
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
      });

      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: order._id.toString(),
      });

      return res.status(200).json({
        success: true,
        razorpayOrder,
        orderId: order._id,
        key: process.env.RAZORPAY_KEY_ID,
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ Message: "Something on orderSingleProduct", Error: e.message });
  }
};

const orderCartProduct = async (req, res) => {
  try {
    const { paymentMethod } = req.body;
    let userID = req.user.userId;

    const cart = await cartModule
      .findOne({ user: userID })
      .populate("items.product");

    if (!cart || cart.items.length === 0) {
      return res.status(404).json({ Message: "Cart is Empty" });
    }

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.sale_price * item.quantity,
      0,
    );

    if (paymentMethod === "COD") {
      const order = await orderModule.create({
        user: userID,
        items: cart.items,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
      });

      await cartModule.updateOne({ user: userID }, { $set: { items: [] } });

      return res
        .status(201)
        .json({ Message: "Order Placed SuccessFully", orderId: order._id });
    }
    if (paymentMethod === "Razorpay") {
      const order = await orderModule.create({
        user: userID,
        items: cart.items,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
      });

      const razorpayOrder = await razorpay.orders.create({
        amount: totalAmount * 100,
        currency: "INR",
        receipt: order._id.toString(),
      });

      return res.status(200).json({
        success: true,
        razorpayOrder,
        orderId: order._id,
        key: process.env.RAZORPAY_KEY_ID,
      });
    }
    return res.status(400).json({ Message: "Invalid Payment Method" });
  } catch (e) {
    res.status(500).json({ Message: "Order Placed Fail" });
  }
};

const orderCancelController = async (req, res) => {
  try {
    const { id } = req.body;
    const userID = req.user.userId;

    const order = await orderModule.findOne({
      _id: id,
      user: userID,
    });

    if (!order) {
      return res.status(404).json({ Message: "Order Not Found" });
    }

    if (order.orderStatus === "Cancelled") {
      return res.status(409).json({ Message: "Order Is Already Cancelled" });
    }

    await orderModule.updateOne(
      { _id: id },
      { $set: { orderStatus: "Cancelled", paymentStatus: "Cancelled" } },
    );

    res.status(200).json({ Message: "Canceled Success" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ Message: "Canceled Failed" });
  }
};

module.exports = {
  showOrderList,
  orderSingleProduct,
  orderCartProduct,
  orderCancelController,
};
