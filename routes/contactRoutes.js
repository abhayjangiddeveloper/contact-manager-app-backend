const express = require("express");
const router = express.Router();
// const multer = require("multer");
const {
  getContacts,
  createContacts,
  getSingleContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, "./public/upload");
//   },
//   filename: function (req, file, cb) {
//     const uniqueSuffix = Date.now() + "-" + file.originalname;
//     cb(null, uniqueSuffix);
//   },
// });

// const upload = multer({ storage: storage });

router.use(validateToken);
router.route("/").get(getContacts).post(createContacts);
router
  .route("/:id")
  .get(getSingleContacts)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;
