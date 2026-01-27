
const cartModule = require("../Models/cartsModel");

const getCartItems = async (req, res) => {
  try {
    let userID = req.user.userId;

    const cartData = await cartModule
      .findOne({ user: userID })
      .populate("items.product");

  if (!cartData) {
      return res.status(200).json({
        cartData: { items: [] },
      });
    }

    res.status(200).json({ cartData: cartData, status: "success" });
  } catch (e) {
    res
      .status(500)
      .json({ Message: "Get Cart Items System Error", Error: e.message });
  }
};


// const getCartItems = async (req, res) => {
//   try {
//     const userID = req.user.userId;

//     const cartData = await cartModule
//       .findOne({ user: userID })
//       .populate("items.product");

//     // ✅ Always return 200
   

//     res.status(200).json({
//       cartData,
//     });
//   } catch (e) {
//     res.status(500).json({
//       Message: "Get Cart Items Error",
//       Error: e.message,
//     });
//   }
// };




const addTocart = async (req, res) => {
  try {
    const userID = req.user.userId;
    const { productId } = req.params;
    const cartLength = await cartModule.find({ user: userID });

    if (cartLength.length === 0) {
      await cartModule.create({
        user: userID,
        items: [{ product: productId }],
      });

      return res
        .status(200)
        .json({ Message: "Add To Cart Successfull", Status: "Success" });
    }

    const isExist = await cartModule.findOne({
      user: userID,
      "items.product": productId,
    });
    if (isExist) {
      return res.status(409).json({ Message: "Product Already In Cart" });
    }

    await cartModule.updateOne(
      { user: userID },
      { $push: { items: { product: productId } } },
    );

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

    const isExist = await cartModule.findOne({
      user: userID,
      "items.product": productId,
    });
    console.log(isExist);

    if (isExist) {
      await cartModule.updateOne(
        { user: userID },
        { $pull: { items: { product: productId } } },
      );
      return res
        .status(200)
        .json({ Message: "Successfully Removed From Cart", status: "Success" });
    }

    res.status(404).json({ Message: "No Product Found In Cart" });
  } catch (e) {
    res
      .status(500)
      .json({ Message: "Error In removeFromcart Function", Error: e.message });
  }
};

const increaseQuantity = async (req, res) => {
  try {
    let userID = req.user.userId;
    const { productId } = req.params;
    const cartData = await cartModule.findOne(
      { user: userID },
      { items: { $elemMatch: { product: productId } } },
    );

    if (10 <= cartData.items[0].quantity) {
      return res.status(406).json({ Message: "Maximum-Limit-10" });
    }

    await cartModule.updateOne(
      { user: userID, "items.product": productId },
      { $inc: { "items.$.quantity": 1 } },
    );

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
    const cartData = await cartModule.findOne(
      { user: userID },
      { items: { $elemMatch: { product: productId } } },
    );

    if (1 >= cartData.items[0].quantity) {
      return res.status(406).json({ Message: "Minimum-Limit-1" });
    }

    await cartModule.updateOne(
      { user: userID, "items.product": productId },
      { $inc: { "items.$.quantity": -1 } },
    );

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
