//Protection so other people can't change other people's password
const { User } = require("../models");
async function userAuthorization(req, res, next) {
  try {
    const findUser = await User.findByPk(req.user.id);
    if (findUser.id !== req.user.id) {
      throw { name: "forbidden" };
    }
    next();
  } catch (error) {
    next(error);
  }
}

module.exports = userAuthorization;
