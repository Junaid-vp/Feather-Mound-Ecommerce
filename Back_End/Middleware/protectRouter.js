const jwt = require("jsonwebtoken");
require("dotenv").config();

const protectRoutes = (req, res, next) => {
  try {
    // Multi-channel token gathering:
    // 1. Cookies (Laptop/Chrome)
    // 2. Authorization Bearer (Standard)
    // 3. X-Access-Token (Fallback for mobile header stripping)
    // 4. Query Parameter (Absolute last resort for problematic mobile agents)
    let token = 
      req.cookies?.Access_Token || 
      req.headers['x-access-token'] || 
      req.query?.token;

    if (!token && req.headers.authorization) {
      const authHeader = req.headers.authorization;
      if (authHeader.match(/^bearer\s+/i)) {
        token = authHeader.split(/\s+/)[1];
      }
    }

    // Add debug logging for Render logs if token is STILL missing
    if (!token) {
      console.log(`[AUTH DEBUG] No token found in any channel. Headers:`, {
        hasAuthHeader: !!req.headers.authorization,
        hasXHeader: !!req.headers['x-access-token'],
        hasQueryToken: !!req.query?.token,
        headerPrefix: req.headers.authorization?.slice(0, 10),
        url: req.originalUrl,
        method: req.method
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
