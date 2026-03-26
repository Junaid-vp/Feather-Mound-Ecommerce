const jwt = require("jsonwebtoken");
require("dotenv").config();

const buildTokenPayload = (email, userID, role) => ({
  Email: email,
  Id: userID,
  role,
});

const GenrateToken = async (email, userID, role) => {
  const payload = buildTokenPayload(email, userID, role);

  const RefreshToken = await jwt.sign(payload, process.env.REFRESH_TOKEN_KEY, {
    expiresIn: "7d",
  });

  const AccessToken = await jwt.sign(payload, process.env.ACCESS_TOKEN_KEY, {
    expiresIn: "30m",
  });

  return { RefreshToken, AccessToken };
};

module.exports = GenrateToken;
