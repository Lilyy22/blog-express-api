const jwt = require("jsonwebtoken");
const secret = process.env.SECRET_KEY;

const getToken = async (data, exp) => {
  try {
    return jwt.sign(data, secret, exp);
  } catch (error) {
    throw error;
  }
};

const verifyToken = async (token) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    throw error;
  }
};

module.exports = { getToken, verifyToken };
