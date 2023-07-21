const express = require("express");
const router = express.Router();
const multer = require("multer");
const {
  getContacts,
  createContacts,
  getSingleContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

// File upload configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./public/upload");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + file.originalname;
    cb(null, uniqueSuffix);
  },
});

// File filter to allow only image files (you can customize the filter based on your requirements)
const fileFilter = (req, file, cb) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed!"), false);
  }
};

// Multer upload middleware with storage and fileFilter
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

router.use(validateToken);

router
  .route("/")
  .get(getContacts)
  .post(upload.single("contact_profile"), createContacts);
router
  .route("/:id")
  .get(getSingleContacts)
  .put(upload.single("contact_profile"), updateContact)
  .delete(deleteContact);

module.exports = router;
