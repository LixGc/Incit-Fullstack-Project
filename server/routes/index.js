const router = require("express").Router();
const user = require("./userRoute");
const auth = require("./authenticationRoute");
router.use("/user", user);
router.use("/auth", auth);

module.exports = router;
