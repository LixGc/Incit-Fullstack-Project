const router = require("express").Router();
const UserController = require("../controllers/userController");
const verificationAuthentication = require("../middlewares/verificationAuthentication");
const userAuthorization = require("../middlewares/userAuthorization");

router.get("/profile", verificationAuthentication, UserController.profile);
router.get("/dashboard", verificationAuthentication, UserController.dashboard);
router.patch("/resetPassword", verificationAuthentication, userAuthorization, UserController.resetPassword);
router.patch("/resetName", verificationAuthentication, userAuthorization, UserController.resetName);
module.exports = router;
