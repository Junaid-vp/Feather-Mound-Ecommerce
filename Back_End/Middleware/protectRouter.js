const jwt = require("jsonwebtoken");
require("dotenv").config();

const protectRoutes = (req, res, next) => {
  try {
    console.log("Fgsdfg");
    
    let token = req.cookies?.Access_Token;

    if (!token) {
      return res
        .status(401)
        .json({ Message: "Unauthorized,Please Login First" });
    }

    let decode = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);
    console.log(decode);
    
    req.user = {
      Email: decode.Email,
      userId: decode.Id,
      role:decode.user
    };

    next();
  } catch (e) {
    res.status(401).json({ Message: "Protect Router Issue", Error: e.message });
  }
};

module.exports = protectRoutes;
