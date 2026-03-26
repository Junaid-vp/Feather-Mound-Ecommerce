const jwt = require("jsonwebtoken");

const getCookieOptions = () => {
  const isDevelopment = process.env.NODE_ENV === "development";

  return {
    httpOnly: true,
    sameSite: isDevelopment ? "lax" : "none",
    secure: !isDevelopment,
    path: "/",
  };
};

const TokenRegenrator = (req, res) => {
  try {
    let token = req.cookies?.Refresh_Token || req.body?.RefreshToken;
    if (!token) {
      return res.status(401).json({ message: "No Refresh_Token Founded" });
    }

    const decode = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);
    const role = decode.role ?? decode.user;

    const AccessToken = jwt.sign(
      { Email: decode.Email, Id: decode.Id, role },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "30m",
      },
    );

    const RefreshToken = jwt.sign(
      { Email: decode.Email, Id: decode.Id, role },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "7d",
      },
    );

    res
      .cookie("Access_Token", AccessToken, getCookieOptions())
      .cookie("Refresh_Token", RefreshToken, getCookieOptions())
      .json({
        Message: "SuccessFuly Regenrator Access_Token",
        AccessToken,
        RefreshToken,
      });
  } catch (e) {
    res.status(401).json({ Message: "Refresh token expired" });
  }
};

module.exports = TokenRegenrator;
