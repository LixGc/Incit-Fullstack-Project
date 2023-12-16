const { activeSessionChecker, countTodayActiveSessions, countAverageActiveSessionsLast7Days } = require("../helpers/activeSessionChecker");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { User, UserHistory } = require("../models");
const { Op } = require("sequelize");
class UserController {
  static async profile(req, res, next) {
    try {
      const user = await User.findByPk(req.user.id, { attributes: ["username", "email", "verified"], exclude: ["password", "verificationLink"] });
      res.json(user);
    } catch (error) {
      next(error);
    }
  }
  static async dashboard(req, res, next) {
    try {
      const option = {
        include: [UserHistory],
        attributes: { exclude: ["password", "verified", "verificationLink"] },
      };

      if (req.query.name) {
        option.where = {
          username: {
            [Op.iLike]: `%${req.query.name}%`,
          },
        };
      }
      const user = await User.findAll(option);
      const userLogoutData = user.reduce((acc, currentUser) => {
        const logoutHistories = currentUser.UserHistories.filter((history) => {
          return history.name === "logout" && history.UserId === req.user.id;
        });

        return acc.concat(logoutHistories);
      }, []);
      let userActiveSession = await User.findAll(
        {
          include: [
            {
              model: UserHistory,
              where: { name: "activeSession", UserId: req.user.id },
            },
          ],
        },
        { exclude: ["password", "verified", "verificationLink"] }
      );
      const activeToday = activeSessionChecker(userActiveSession);
      if (!activeToday) {
        await UserHistory.create({ name: "activeSession", UserId: req.user.id });
      }
      let todayActiveSession = countTodayActiveSessions(user);
      let averageActiveSessionsLast7Days = countAverageActiveSessionsLast7Days(user);
      averageActiveSessionsLast7Days = averageActiveSessionsLast7Days.toFixed(2);
      let result = {
        user,
        totalUser: user.length,
        todayActiveSession,
        averageActiveSessionsLast7Days,
        userLogoutData,
      };
      res.json(result);
    } catch (error) {
      next(error);
    }
  }
  static async resetPassword(req, res, next) {
    try {
      const { oldPassword, newPassword, confirmPassword } = req.body;

      if (!oldPassword || !newPassword || !confirmPassword) {
        throw { name: "empty_input" };
      }
      const user = await User.findByPk(req.user.id, { attributes: ["password"] });

      const isOldPasswordValid = comparePassword(oldPassword, user.password);
      if (!isOldPasswordValid) {
        throw { name: "invalid_password" };
      }

      if (newPassword !== confirmPassword) {
        throw { name: "Password doesn't match" };
      }

      const validPasswordFormat = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/;
      if (!validPasswordFormat.test(newPassword) || !validPasswordFormat.test(newPassword)) {
        throw { name: "notStrongPassword" };
      }

      if (comparePassword(newPassword, user.password)) {
        throw { name: "same_password" };
      }

      const hashedPassword = hashPassword(newPassword);

      await User.update({ password: hashedPassword }, { where: { id: req.user.id } });
      res.json({ message: "Password successfully updated!" });
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  static async resetName(req, res, next) {
    try {
      const { newName } = req.body;
      if (!newName) {
        throw { name: "empty_name" };
      }
      const user = await User.findByPk(req.user.id, { attributes: ["username"] });
      if (newName === user.username) {
        throw { name: "same_name" };
      }
      await User.update({ username: newName }, { where: { id: req.user.id } });
      res.json({ message: "Name successfully updated" });
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
