const { default: mongoose } = require("mongoose");

const contactSchema = mongoose.Schema(
  {
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the contact Name"],
    },
    email: {
      type: String,
      required: [true, "Please add the contact email"],
    },
    phone: {
      type: String,
      required: [true, "Please add the contact Phone Number"],
    },
    contact_profile: {
      type: String,
    },
  },
  { Timestamp: true }
);

module.exports = mongoose.model("Contact", contactSchema);
