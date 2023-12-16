"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");
const sendEmail = require("../helpers/sendEmailVerification");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasMany(models.UserHistory);
    }
  }
  User.init(
    {
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: {
            msg: "Name is required!",
          },
          notNull: {
            msg: "Name is required!",
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          msg: `Email already existed`,
        },
        validate: {
          notNull: {
            msg: "Please type your email",
          },
          notEmpty: {
            msg: "Please type your email",
          },
          isEmail: {
            msg: "Email format isn't valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Please type your password",
          },
          notEmpty: {
            msg: "Please type your password",
          },
          len: {
            args: [8],
            msg: "Minimum password character is 8",
          },
          isStrongPassword(value) {
            if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])/.test(value)) {
              throw new Error("notStrongPassword");
            }
          },
        },
      },
      verified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      verificationLink: {
        type: DataTypes.STRING,
      },
      totalLogin: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((el) => {
    el.password = hashPassword(el.password);
  });
  User.afterCreate((user) => {
    sendEmail(user);
  });
  return User;
};
