const { Router } = require("express");
const {LoginController,RegisterContoller, GetLoginUser, LogoutController,setAddressController,clearAddressController} = require("../Controller/AuthController.js");
const { Validate } = require("../Middleware/Validate");
const loginValidate = require("../Validator/loginValidate");
const registerValidate = require("../Validator/registerValidate");
const protectRoutes = require("../Middleware/protectRouter.js");
const TokenRegenrator = require("../service/TokenRegenrator.js");

const route = Router();

route.post("/register", Validate(registerValidate), RegisterContoller);
route.post("/login", Validate(loginValidate), LoginController);
route.post('/logout',LogoutController)
route.post('/refresh',TokenRegenrator)
route.post('/address',protectRoutes,setAddressController)
route.get('/getUser',protectRoutes,GetLoginUser)
route.post('/address/clear',protectRoutes,clearAddressController)

module.exports = route;
