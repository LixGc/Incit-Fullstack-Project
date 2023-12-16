// verification to check if the user is verified and have a valid token
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
async function verificationAuthentication(req, res, next) {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw { name: "unauthenticated" };
    }
    const data = verifyToken(access_token);
    const findUser = await User.findByPk(data.id, { exclude: ["password"] });
    if (!findUser) {
      throw { name: "unauthenticated" };
    }
    if (!findUser.verified) {
      throw { name: "unverified" };
    }
    req.user = {
      id: findUser.id,
      email: findUser.email,
      name: findUser.username,
      verified: findUser.verified,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = verificationAuthentication;
