const userModel = require("../Models/userModel");
const GenrateToken = require("../Utils/tokenGenrator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

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
      status: "something went wroung",
      message: e.message,
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
      isUser.role,
    );

    return res
      .status(200)
      .cookie("Access_Token", AccessToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .cookie("Refresh_Token", RefreshToken, {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .json({ message: "Login SuccessFull" });
  } catch (e) {
    console.log("Something Issue on LoginController : ", e);
    return res.status(500).json({ Message: e });
  }
};

const GetLoginUser = async (req, res) => {
  try {
     
    const userData = await userModel.findOne({ _id :req.user.userId})
 
      
    if (!req.user) {
      return res.status(401).json({
        Message: "Unauthorized",
      });
    }

    res.status(200).json({
      Message: "User found",
      User: req.user,
      UserData:userData
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
    res
      .clearCookie("Access_Token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .clearCookie("Refresh_Token", {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
      })
      .status(200)
      .json({ Message: "Logout successful" });
  } catch (e) {
    res.status(500).json({ Message: "Logout error" });
  }
};


const setAddressController = async(req,res)=>{
  try{
      const userID = req.user.userId;
     const address = req.body
     

     if(!address){
       return res.status(404).json({Message:"NO ADDRESS"})
     }
    

      await userModel.updateOne(
      { _id: userID },
      {  address: address } 
    );

     res.status(200).json({Message:"Address Saved"})
     
  }catch(e){
    res.status(500).json({Message:"setAddressController Error" , Error:e.message})
  }
}


const clearAddressController = async(req,res)=>{
  try{
      const userID = req.user.userId;

    

      await userModel.updateOne(
      { _id: userID },
      {  address: null } 
    );

     res.status(200).json({Message:"Address Cleared"})
     
  }catch(e){
    res.status(500).json({Message:"clearAddressController Error" , Error:e.message})
  }
}







module.exports = { RegisterContoller, LoginController, GetLoginUser ,LogoutController,setAddressController,clearAddressController};
