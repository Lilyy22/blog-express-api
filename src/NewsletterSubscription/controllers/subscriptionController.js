const { create, getAll } = require("../services/subscription");

const subscribe = async (req, res) => {
  try {
    const newSub = await create(req.body);
    res.send(newSub);
    try {
      await sendEmail(
        process.env.DOMAIN_EMAIL,
        newSub.email,
        "<strong>Email Verification</strong>",
        "verify your email"
      );
    } catch (error) {
      res.status(400).send({ error: error.message });
    }
  } catch (error) {
    res.status(400).send({ error: error });
  }
};

const getAllSubscribers = async (req, res) => {
  try {
    const allSub = await getAll();
    res.send(allSub);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

module.exports = { subscribe, getAllSubscribers };
