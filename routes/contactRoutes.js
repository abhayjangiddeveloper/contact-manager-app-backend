const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContacts,
  getSingleContacts,
  updateContact,
  deleteContact,
} = require("../controllers/contactControllers");
const validateToken = require("../middleware/validateTokenHandler");

router.use(validateToken);
router.route("/").get(getContacts).post(createContacts);
router
  .route("/:id")
  .get(getSingleContacts)
  .put(updateContact)
  .delete(deleteContact);

module.exports = router;