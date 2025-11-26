const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const app = express();
app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api/staff", require("./routes/staffRoutes"));

app.listen(5000, () => console.log("Server running on port 5000"));
