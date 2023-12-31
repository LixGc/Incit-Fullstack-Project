const { comparePassword } = require("../helpers/bcrypt");
const sendEmail = require("../helpers/sendEmailVerification");
const { signToken } = require("../helpers/jwt");
const { OAuth2Client } = require("google-auth-library");
const { User, UserHistory } = require("../models");
class AuthController {
  static async register(req, res, next) {
    try {
      const { username, email, password, password2 } = req.body;
      if (!password2) {
        throw { name: "empty_input" };
      }
      if (password !== password2) {
        throw { name: "Password doesn't match" };
      }
      await User.create({ username, email, password });
      res.status(201).json({ message: `Account succesfully created!` });
    } catch (error) {
      console.log(error);
      next(error);
    }
  }
  static async login(req, res, next) {
    try {
      const { email, password } = req.body;
      if (!email) {
        throw { name: "invalid_email_or_password" };
      }
      if (!password) {
        throw { name: "invalid_email_or_password" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: `not_valid` };
      }
      const isPasswordValid = comparePassword(password, user.password);
      if (!isPasswordValid) {
        throw { name: `not_valid` };
      }
      const access_token = signToken({ id: user.id });
      if (user.verified) {
        await User.update({ totalLogin: user.totalLogin + 1 }, { where: { id: user.id } });
      }
      let verified = user.verified;
      res.status(200).json({ access_token, verified, email });
    } catch (error) {
      next(error);
    }
  }
  static async googleLogin(req, res, next) {
    try {
      const { google_token } = req.headers;
      const client = new OAuth2Client();
      const ticket = await client.verifyIdToken({
        idToken: google_token,
        audience: process.env.GOOGLE_CLIENT_ID,
      });
      const payload = ticket.getPayload();
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email: payload.email,
        },
        defaults: {
          username: payload.name,
          email: payload.email,
          password: process.env.USER_PASSWORD,
          verified: true,
        },
        hooks: false,
      });

      const access_token = signToken({
        id: user.id,
      });
      let status = 200;
      if (isCreated) {
        status = 201;
      }
      if (user.verified) {
        await User.update({ totalLogin: user.totalLogin + 1 }, { where: { id: user.id } });
      }
      let verified = user.verified;
      let email = user.email;
      res.status(status).json({ access_token, verified, email });
    } catch (error) {
      next(error);
    }
  }
  static async facebookLogin(req, res, next) {
    try {
      const { email, username } = req.headers;
      if (!email || !username) {
        throw { name: "invalid_data" };
      }
      const [user, isCreated] = await User.findOrCreate({
        where: {
          email,
        },
        defaults: {
          username,
          email,
          password: process.env.USER_PASSWORD,
          verified: true,
        },
        hooks: false,
      });
      const access_token = signToken({
        id: user.id,
      });
      let status = 200;
      if (isCreated) {
        status = 201;
      }
      if (user.verified) {
        await User.update({ totalLogin: user.totalLogin + 1 }, { where: { id: user.id } });
      }
      let verified = user.verified;
      res.status(status).json({ access_token, verified, email });
    } catch (error) {
      next(error);
    }
  }
  static async createLogoutHistory(req, res, next) {
    try {
      await UserHistory.create({ name: "logout", UserId: req.user.id });
      res.status(201).json({ message: "Success" });
    } catch (error) {
      next(error);
    }
  }
  static async verify(req, res, next) {
    try {
      let { id, uniqueString } = req.params;
      const user = await User.findByPk(id, { attributes: ["verificationLink", "verified", "email"] });
      if (!user) {
        throw { name: "Data is not found!" };
      }
      if (user.verificationLink !== uniqueString) {
        throw { name: "email_verification_not_valid" };
      }
      let updatedUser = "";
      if (!user.verified) {
        let [rowsUpdated, [newestUserData]] = await User.update({ verified: true }, { where: { id }, returning: true });
        updatedUser = newestUserData;
      }
      const access_token = signToken({ id });
      let userTotalLogin = user.totalLogin;
      if (!user.totalLogin) {
        userTotalLogin = 0;
      }
      await User.update({ totalLogin: userTotalLogin + 1 }, { where: { id } });
      res
        .status(200)
        .redirect(`http://incit-exam.web.app/verifyAccount?token=${access_token}&email=${updatedUser.email}&verified=${updatedUser.verified}`);
    } catch (error) {
      next(error);
    }
  }
  static async resendVerification(req, res, next) {
    try {
      const { email } = req.headers;
      if (!email) {
        throw { name: "invalid_data" };
      }
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw { name: "Data is not found!" };
      }
      if (user.verified) {
        throw { name: "Email already verified" };
      }
      sendEmail(user);
      res.status(201).json({ message: "Email verification successfully sent!" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
