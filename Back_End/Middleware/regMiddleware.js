// import registerValidate from "../Validator/registerValidate";

// const regMiddlware = (req, res,next) => {
//   try{
//     const result = registerValidate.safeParse(req.body);

//   if (!result.success) {
//     console.log("Validation Error");
//    return res.status(400).json({ message: result.error });
//   } 
//     next();
//   }catch(e){
//     console.log("regMiddleware Error",e);
    
//   }
  
// };

// export default regMiddlware;
