const cartModule = require("../Models/cartsModel");

const getCartItems = async (req, res) => {
  try {
    let userID = req.user.userId;

    const cartData = await cartModule
      .findOne({ user: userID })
      .populate("items.product");

    if (!cartData) {
      return res
        .status(200)
        .json({ cartData: { items: [] }, Message: "Cart is Empty" });
    }

    res.status(200).json({ cartData: cartData, status: "success" });
  } catch (e) {
    res
      .status(500)
      .json({ Message: "Get Cart Items System Error", Error: e.message });
  }
};

const addTocart = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { productId } = req.params;

    const result = await cartModule.updateOne(
      { user: userID },
      { $addToSet: { items: { product: productId } } },
      { upsert: true },
    );

    if (result.modifiedCount === 0) {
      return res.status(409).json({
        Message: "Product Already In Cart",
      });
    }

    res
      .status(200)
      .json({ Message: "Add To Cart Successfull", Status: "Success" });
  } catch (e) {
    res.status(500).json({ Message: "Add to Cart Error", Error: e.message });
  }
};

const removeFromcart = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { productId } = req.params;

    const result = await cartModule.updateOne(
      { user: userID },
      { $pull: { items: { product: productId } } },
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({
        Message: "No Product Found In Cart",
      });
    }

    res.status(200).json({
      Message: "Successfully Removed From Cart",
      Status: "Success",
    });
  } catch (e) {
    res.status(500).json({
      Message: "Error In removeFromcart Function",
      Error: e.message,
    });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    let userID = req.user.userId;
    const { productId } = req.params;
    const cartData = await cartModule.updateOne(
      {
        user: userID,
        items: {
          $elemMatch: {
            product: productId,
            quantity: { $lt: 10 },
          },
        },
      },
      { $inc: { "items.$.quantity": 1 } },
    );

    if (cartData.modifiedCount === 0) {
      return res.status(406).json({ Message: "Maximum-Limit-10" });
    }

    res.status(200).json({ Message: "Quantity-Increased" });
  } catch (e) {
    res
      .status(500)
      .json({ Message: "increase-Quantity-Error", Error: e.message });
  }
};

const decraseQuantity = async (req, res) => {
  try {
    let userID = req.user.userId;
    const { productId } = req.params;
    const cartData = await cartModule.updateOne(
      {
        user: userID,
        items: { $elemMatch: { product: productId, quantity: { $gt: 1 } } },
      },
      { $inc: { "items.$.quantity": -1 } },
    );

    if (cartData.modifiedCount === 0) {
      return res.status(406).json({ Message: "Minimum-Limit-1" });
    }
    res.status(200).json({ Message: "Quantity Decresed" });
  } catch (e) {
    res
      .status(500)
      .json({ Message: "decrase-Quantity-Error", Error: e.message });
  }
};

module.exports = {
  getCartItems,
  addTocart,
  removeFromcart,
  increaseQuantity,
  decraseQuantity,
};
