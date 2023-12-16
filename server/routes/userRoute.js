const router = require("express").Router();
const UserController = require("../controllers/userController");

router.get("/profile", UserController.profile);
router.get("/dashboard", UserController.dashboard);
router.patch("/resetPassword", UserController.resetPassword);
router.patch("/resetName", UserController.resetName);
module.exports = router;
