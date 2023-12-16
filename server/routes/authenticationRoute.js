const router = require("express").Router();
const AuthController = require("../controllers/authController");
const loginAuthentication = require("../middlewares/loginAuthentication");
const verificationAuthentication = require("../middlewares/verificationAuthentication");

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
router.post("/logout", loginAuthentication, AuthController.createLogoutHistory);
router.post("/google-login", AuthController.googleLogin);
router.post("/facebook-login", AuthController.facebookLogin);
router.patch("/resendVerification", AuthController.resendVerification);
router.get("/verify/:id/:uniqueString", AuthController.verify);

module.exports = router;
