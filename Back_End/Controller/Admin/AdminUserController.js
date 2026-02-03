const userModel = require("../../Models/userModel");

const FetchAllUser = async (req, res) => {
  try {
    const UserData = await userModel.find({ role: "user" });
    if (UserData.length === 0) {
      const err = Error("No User");
      err.status = 404;
      throw err;
    }
    res.status(200).json({ Status: "Success", UserData: UserData });
  } catch (e) {
    res.status(e.status || 500).json({ Error: e.message });
  }
};

const AdminBlockTheUser = async (req, res) => {
  try {
    const { _id } = req.params;

    if (!_id) {
      const err = new Error("No User ID");
      err.status = 400;
      throw err;
    }

    const user = await userModel.findById(_id);

    if (!user) {
      const err = new Error("No User Found");
      err.status = 404;
      throw err;
    }

    user.isBlock = !user.isBlock;

    await user.save();

    return res.status(200).json({
      Message: user.isBlock
        ? "User Blocked Successfully"
        : "User UnBlocked Successfully",
    });
  } catch (e) {
    res.status(e.status || 500).json({ Message: e.message });
  }
};

module.exports = { FetchAllUser, AdminBlockTheUser };
