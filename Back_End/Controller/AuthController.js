const userModel = require("../Models/userModel");
const GenrateToken = require("../Utils/tokenGenrator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const getCookieOptions = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return {
    httpOnly: true,
    sameSite: isDevelopment ? "lax" : "none",
    secure: !isDevelopment,
    path: "/",
  };
};

const RegisterContoller = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const normalizedEmail = email?.trim().toLowerCase();
    const isExist = await userModel.findOne({ 
      email: { $regex: new RegExp(`^${normalizedEmail}$`, "i") } 
    });

    if (isExist) {
      return res.status(409).json({ message: "User Already Exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    await userModel.create({
      firstName,
      lastName,
      email: normalizedEmail,
      password: hashPassword,
    });
    res.status(201).json({ Message: "Registered Successfully" });
  } catch (e) {
    res.status(500).json({
      status: "something went wroung",
      message: e.message,
    });
  }
};

const LoginController = async (req, res) => {
  try {
    const { password } = req.body;
    const email = req.body.email?.trim().toLowerCase();

    const isUser = await userModel.findOne({ 
      email: { $regex: new RegExp(`^${email}$`, "i") } 
    }).select("+password");

    if (!isUser) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }

    if (isUser.isBlock) {
      const err = new Error("This account is blocked");
      err.status = 403;
      throw err;
    }

    const isValid = await bcrypt.compare(password, isUser.password);

    if (!isValid) {
      const err = new Error("Invalid email or password");
      err.status = 401;
      throw err;
    }

    const { RefreshToken, AccessToken } = await GenrateToken(
      isUser.email,
      isUser._id,
      isUser.role,
    );

    const cookieOptions = getCookieOptions();

    return res
      .status(200)
      .cookie("Access_Token", AccessToken, cookieOptions)
      .cookie("Refresh_Token", RefreshToken, cookieOptions)
      .json({
        message: "Login successful",
        Role: isUser.role,
        AccessToken,
        RefreshToken,
      });
  } catch (e) {
    console.error("LoginController error:", e.message);

    return res.status(e.status || 500).json({
      message: e.message,
    });
  }
};

const GetLoginUser = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({
        Message: "Unauthorized",
      });
    }

    const userData = await userModel.findOne({ _id: req.user.userId });

    res.status(200).json({
      Message: "User found",
      User: req.user,
      UserData: userData,
    });
  } catch (e) {
    res.status(500).json({
      Message: "Error in GetLoginUser",
      Error: e.message,
    });
  }
};

const LogoutController = async (req, res) => {
  try {
    const cookieOptions = getCookieOptions();

    res
      .clearCookie("Access_Token", cookieOptions)
      .clearCookie("Refresh_Token", cookieOptions)
      .status(200)
      .json({ Message: "Logout successful" });
  } catch (e) {
    res.status(500).json({ Message: "Logout error" });
  }
};

const setAddressController = async (req, res) => {
  try {
    const userID = req.user.userId;
    const address = req.body;

    if (!address) {
      return res.status(404).json({ Message: "NO ADDRESS" });
    }

    await userModel.updateOne({ _id: userID }, { address: address });

    res.status(200).json({ Message: "Address Saved" });
  } catch (e) {
    res
      .status(500)
      .json({ Message: "setAddressController Error", Error: e.message });
  }
};

const clearAddressController = async (req, res) => {
  try {
    const userID = req.user.userId;
    await userModel.updateOne({ _id: userID }, { address: null });

    res.status(200).json({ Message: "Address Cleared" });
  } catch (e) {
    res
      .status(500)
      .json({ Message: "clearAddressController Error", Error: e.message });
  }
};

module.exports = {
  RegisterContoller,
  LoginController,
  GetLoginUser,
  LogoutController,
  setAddressController,
  clearAddressController,
};
