const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.get("/current", validateToken, currentUser);
router.route("/current").get(validateToken, currentUser);

module.exports = router;
