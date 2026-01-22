const { Router } = require("express");

const {
  LoginController,
  RegisterContoller,
} = require("../Controller/AuthController.js");

const { Validate } = require("../Middleware/Validate");
const loginValidate = require("../Validator/loginValidate");
const registerValidate = require("../Validator/registerValidate");
const route = Router();

route.post("/register", Validate(registerValidate), RegisterContoller);
route.post("/login", Validate(loginValidate), LoginController);

module.exports = route;
