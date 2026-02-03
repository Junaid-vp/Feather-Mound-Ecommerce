const wishlistModule = require("../Models/wishlistModel");

const getWishListData = async (req, res) => {
  try {
    let userID = req.user.userId;

    const WishlistData = await wishlistModule
      .findOne({ user: userID })
      .populate("items.product")
      .lean();

    if (!WishlistData || WishlistData?.items?.length === 0) {
      return res.status(200).json({
        Message: "WishList is Empty",
      });
    }

    res.status(200).json({
      WishlistDatas: WishlistData,
      Status: "Success",
    });
  } catch (e) {
    res.status(500).json({
      Message: "Error in getWishListData Function",
      Error: e.message,
    });
  }
};

const WishlistToggle = async (req, res) => {
  try {
    let userID = req.user.userId;
    let { productID } = req.params;

    let Exist = await wishlistModule.findOne({
      user: userID,
      "items.product": productID,
    });

    if (Exist) {
      await wishlistModule.updateOne(
        { user: userID, "items.product": productID },
        { $pull: { items: { product: productID } } },
      );
      return res.status(200).json({ Message: "Remove Product From Wish List" });
    }

    await wishlistModule.updateOne(
      { user: userID },
      { $addToSet: { items: { product: productID } } },
      { upsert: true },
    );

    return res.status(200).json({ Message: "Add to WishList Successfull" });
  } catch (e) {
    res.status(500).json({
      Message: "Error in WishlistToggle Function",
      Error: e.message,
    });
  }
};

module.exports = { getWishListData, WishlistToggle };
