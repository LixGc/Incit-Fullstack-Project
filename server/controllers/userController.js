const { activeSessionChecker, countTodayActiveSessions, countAverageActiveSessionsLast7Days } = require("../helpers/activeSessionChecker");
const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { User, UserHistory } = require("../models");
const redis = require("../helpers/redis");
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
      const user = await User.findAll({ include: [UserHistory], attributes: { exclude: ["password", "verified", "verificationLink"] } });
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
    } catch (error) {
      console.error(error);
      next(error);
    }
  }
  static async resetName(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
