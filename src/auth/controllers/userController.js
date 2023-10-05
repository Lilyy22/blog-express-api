const { create, login } = require("../services/user");
const sendEmail = require("../../email/emailTransport");

const register = async (req, res) => {
  try {
    const newUser = await create(req.body);
    try {
      const hh = await sendEmail(
        process.env.DOMAIN_EMAIL,
        newUser.email,
        "verification",
        "verify your email"
      );
      console.log(hh);
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
    res.send({ message: "we have sent verification email", data: newUser });
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const loginUser = async (req, res) => {
  try {
    const token = await login(req.body);
    res.send(token);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { register, loginUser };
