const Subscription = require("../models/subscription");

const create = async ({ email }) => {
  try {
    const newSubscription = new Subscription({
      email: email,
    });
    return await newSubscription.save();
  } catch (error) {
    throw error;
  }
};

const getAll = async () => {
  try {
    const allSub = await Subscription.find({});
    return allSub;
  } catch (error) {
    throw error;
  }
};

module.exports = { create, getAll };
