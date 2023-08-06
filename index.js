const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/DB");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDB();

const PORT = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
