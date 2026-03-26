const jwt = require("jsonwebtoken");
require("dotenv").config();

const protectRoutes = (req, res, next) => {
  try {
    let token = req.cookies?.Access_Token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.match(/^bearer\s+/i)) {
        token = authHeader.split(/\s+/)[1];
      }
    }

    // Add debug logging for Render logs if token is STILL missing
    if (!token) {
      console.log(`[AUTH DEBUG] No token found. Headers:`, {
        hasCookie: !!req.cookies?.Access_Token,
        hasAuthHeader: !!req.headers.authorization,
        headerPrefix: req.headers.authorization?.slice(0, 10),
        userAgent: req.headers['user-agent']?.slice(0, 50)
      });
      return res
        .status(401)
        .json({ Message: "Unauthorized,Please Login First" });
    }

    const decode = jwt.verify(token, process.env.ACCESS_TOKEN_KEY);

    req.user = {
      Email: decode.Email,
      userId: decode.Id,
      role: decode.role ?? decode.user,
    };

    next();
  } catch (e) {
    res.status(401).json({ Message: "Protect Router Issue", Error: e.message });
  }
};

module.exports = protectRoutes;
