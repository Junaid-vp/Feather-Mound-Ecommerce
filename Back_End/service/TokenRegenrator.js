const jwt = require("jsonwebtoken");

const TokenRegenrator = (req, res) => {
  try {
    let token = req.cookies.Refresh_Token;
    if (!token) {
      return res.status(401).json({ message: "No Refresh_Token Founded" });
    }

    const decode = jwt.verify(token, process.env.REFRESH_TOKEN_KEY);

    const AccessToken = jwt.sign(
      { Email: decode.Email, Id: decode.Id, user: decode.role },
      process.env.ACCESS_TOKEN_KEY,
      {
        expiresIn: "30m",
      },
    );

    const RefreshToken = jwt.sign(
      { Email: decode.Email, Id: decode.Id, user: decode.role },
      process.env.REFRESH_TOKEN_KEY,
      {
        expiresIn: "7d",
      },
    );

    res
      .cookie("Access_Token", AccessToken, {
        httpOnly: true,
        sameSite: "none", // allow cross-site
        secure: true, // https only
      })
      .cookie("Refresh_Token", RefreshToken, {
        httpOnly: true,
        sameSite: "none", // allow cross-site
        secure: true, // https only
      })
      .json({ Message: "SuccessFuly Regenrator Access_Token" });
  } catch (e) {
    res.status(401).json({ Message: "Refresh token expired" });
  }
};

module.exports = TokenRegenrator;
