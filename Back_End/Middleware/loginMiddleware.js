// import loginValidate from "../Validator/loginValidate";

// const loginMiddleware = (req, res, next) => {
//   try {
//     const result = loginValidate.safeParse(req.body);
//     if (!result.success) {
//       console.log("Login Time Validation Error");
//       return res.status(400).json({ message: result.error });
//     }

//     next();
//   } catch (e) {
//     console.log("LoginMiddleWare Error", e);
//   }
// };


// export default loginMiddleware