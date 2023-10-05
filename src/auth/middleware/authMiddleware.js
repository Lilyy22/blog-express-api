const { verifyToken } = require("../../token/jwt");

const isAuthenticated = async (req, res, next) => {
  const token = req.headers?.authorization?.substr(7);
  if (token) {
    try {
      const validToken = await verifyToken(token);
      if (validToken) {
        next();
      } else {
        res.send({ error: "token is not valid" });
      }
    } catch (error) {
      res.send({ error: error.message });
    }
  } else {
    res.status(400).send({ error: "Authorization header is required." });
  }
};

module.exports = isAuthenticated;
