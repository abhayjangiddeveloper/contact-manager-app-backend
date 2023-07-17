const express = require("express");
const {
  registerUser,
  loginUser,
  currentUser,
  updateProfile,
} = require("../controllers/userControllers");
const validateToken = require("../middleware/validateTokenHandler");
const multer = require("multer");
const upload = multer();

const router = express.Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
// router.get("/current", validateToken, currentUser);
router.route("/current").get(validateToken, currentUser);
router
  .route("/update/profile/:id")
  .put(validateToken, upload.single("profile_picture"), updateProfile);

module.exports = router;
