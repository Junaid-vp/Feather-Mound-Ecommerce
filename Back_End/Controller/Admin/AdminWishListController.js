const { default: mongoose } = require("mongoose");
const wishlistModule = require("../../Models/wishlistModel");

const AdminWishController = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id || !mongoose.Types.ObjectId.isValid(id)) {
      const err = new Error("No user Id");
      err.status = 400;
      throw err;
    }

    const WishList = await wishlistModule.findOne({ user: id }).populate("items.product").lean()

    if (!WishList) {
      const err = new Error("No WishList For the User");
      err.status = 404;
      throw err;
    }

    res.status(200).json({ Status: "Success", WishListData: WishList.items });
  } catch (e) {
    res.status(e.status || 500).json({ Message: e.message });
  }
};

module.exports = AdminWishController;
