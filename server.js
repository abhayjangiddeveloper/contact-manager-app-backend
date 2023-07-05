const express = require("express");
const app = express();
const errorHandler = require("./middleware/errorHandler");
const connectDB = require("./config/DB");
const dotenv = require("dotenv").config();

connectDB();

const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/user", require("./routes/userRoutes"));
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`server is running on port: ${PORT}`);
});
