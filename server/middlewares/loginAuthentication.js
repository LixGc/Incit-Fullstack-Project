// to check if the user have a valid access token or no
const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");
async function loginAuthentication(req, res, next) {
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
    req.user = {
      id: findUser.id,
    };
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = loginAuthentication;
