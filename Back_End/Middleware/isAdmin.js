const jwt = require("jsonwebtoken");
const userModel = require("../Models/userModel");

const isAdmin = async (req, res, next) => {
  try {
    const token = req.cookies?.Access_Token;

    if (!token) {
      const err = new Error("Unauthorized, please login first")
      err.status = 401
      throw err
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_KEY)
    const admin = await userModel.findById(decode.Id);
    if (!admin) {
      const err = new Error("Admin not found")
      err.status = 401
      throw err
    }

    if (admin.role !== "Admin") {
      const err = new Error("Access  Reject. Admin only")
      err.status = 403
      throw err
    }

    next();

  } catch (e) {
    res.status(e.status || 401).json({
      error: e.message
    });
  }
};

module.exports = isAdmin;
