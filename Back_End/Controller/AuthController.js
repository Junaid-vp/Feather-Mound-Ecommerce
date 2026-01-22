const userModel = require("../Models/userModel");
const GenrateToken = require("../Utils/tokenGenrator");
const bcrypt = require("bcryptjs");
const mongoose =  require("mongoose");
const RegisterContoller = async (req, res) => {
  try {
    const { firstName, lastName, email, password } = req.body;
    const isExist = await userModel.findOne({ email: email });
    
    if (isExist) {
      console.log("User Already Exist");
      return res.status(400).json({ message: "User Already Exist" });
    }

    const hashPassword = await bcrypt.hash(password, 10);
    
    await userModel.create({
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: hashPassword,
    });
    res.status(201).json({ Message: "Registered Successfully" });
  } catch (e) {
    console.log("Something Issue on RegisterController : ", e);
    res.status(500).json({ 
      status:"something went wroung",
      message:e.message
    });
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUser = await userModel
      .findOne({ email: email })
      .select("+password");

    if (!isUser) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const isValid = await bcrypt.compare(password, isUser.password);

    if (!isValid) {
      return res.status(400).json({ message: "Invalid Email or Password" });
    }

    const { RefreshToken, AccessToken } = await GenrateToken(
      isUser.email,
      isUser._id,
    );

    return res
      .status(201)
      .cookie("Access_Token", AccessToken)
      .cookie("Refresh_Token", RefreshToken)
      .json({ message: "Login SuccessFull" });
  } catch (e) {
    console.log("Something Issue on LoginController : ", e);
    return res.status(500).json({ Message: e });
  }
};

module.exports = { RegisterContoller, LoginController };
