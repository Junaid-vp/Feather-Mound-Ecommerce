const { default: mongoose } = require("mongoose");
const cartModule = require("../../Models/cartsModel");

const AdminCartController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("No user Id");
      err.status = 400;
      throw err;
    }

    const userCart = await cartModule
      .findOne({ user: id })
      .populate("items.product")
      .lean();

    if (!userCart) {
      const err = new Error("No Cart For the User");
      err.status = 404;
      throw err;
    }

    res.status(200).json({ Status: "Success", CartData: userCart.items });
  } catch (e) {
    res.status(e.status || 500).json({ Message: e.message });
  }
};

module.exports = AdminCartController;
