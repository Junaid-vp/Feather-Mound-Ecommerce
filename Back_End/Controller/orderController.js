const cartModule = require("../Models/cartsModel");
const orderModule = require("../Models/orderModels");
const productsModel = require("../Models/productsModel");

const showOrderList = async (req, res) => {
  try {
    let userID = req.user.userId;

    const OrderData = await orderModule
      .find({ user: userID })
      .populate("items.product");

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

    const product = await productsModel.findById(ItemId);
    if (!product) {
      return res.status(404).json({ Message: "Product Not Found" });
    }

    if (paymentMethod === "COD") {
      const totalAmount = product.sale_price * quantity;
      await orderModule.create({
        user: userID,
        items: [{ product: ItemId, quantity: quantity }],
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
      });
      return res.status(200).json({ Message: "Order Placed SuccessFully" });
    }

    // paymentMethod === "RazorPAY"
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

    console.log(cart);

    if (!cart) {
      return res.status(404).json({ Message: "Cart is Empty" });
    }
    console.log("dgfdg");

    const totalAmount = cart.items.reduce(
      (sum, item) => sum + item.product.sale_price * item.quantity,
      0,
    );
    console.log("Erwerw");

    console.log(totalAmount);

    if (paymentMethod === "COD") {
      await orderModule.create({
        user: userID,
        items: cart.items,
        totalAmount: totalAmount,
        paymentMethod: paymentMethod,
      });

      await cartModule.updateOne({ user: userID }, { $set: { items: [] } });

      return res.status(201).json({ Message: "Order Placed SuccessFully" });
    }
  } catch (e) {
    res.status(500).json({ Message: "Order Placed Fail" });
  }
};

const orderCancelController = async (req, res) => {
  try {
    console.log("CANCEL CONTROLLER HIT");

    const { id } = req.body;

    const order = await orderModule.findOne({ _id: id });
    if (!order) {
      return res.status(404).json({ Message: "No Found Order" });
    }

    await orderModule.updateOne(
      { _id: id },
      { $set: { orderStatus: "Cancelled", paymentStatus: "Cancelled" } }
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
