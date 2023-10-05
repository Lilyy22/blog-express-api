const User = require("../models/user");
const bcrypt = require("bcrypt");
const { getToken } = require("../../token/jwt");

const create = async ({ username, email, password }) => {
  try {
    const hashedPassword = await hashPassword(password);
    const newUser = new User({
      email: email,
      username: username,
      password: hashedPassword,
    });
    return await newUser.save();
  } catch (error) {
    throw error;
  }
};

const login = async ({ usernameOrEmail, password }) => {
  try {
    const user = await getUser(usernameOrEmail);
    if (!user) {
      throw new Error("User not found.");
    } else {
      const passwordmatch = await comparePassword(password, user.password);
      if (passwordmatch) {
        const userInfo = {
          username: user.username,
          email: user.email,
          role: user.role,
        };
        try {
          const token = await getToken(userInfo, { expiresIn: "1h" });
          return { access_token: token };
        } catch (error) {
          throw error;
        }
      } else {
        throw new Error("Password donot match.");
      }
    }
  } catch (error) {
    throw error;
  }
};

const getUser = async (usernameOrEmail) => {
  try {
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    }).exec();
    return user;
  } catch (error) {
    throw error;
  }
};

const comparePassword = async (password, userPassword) => {
  try {
    return await bcrypt.compare(password, userPassword);
  } catch (error) {
    return error;
  }
};

const hashPassword = async (password) => {
  try {
    return await bcrypt.hash(password, 10);
  } catch (error) {
    return error;
  }
};



module.exports = { create, login };
