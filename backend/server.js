const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const expiredRoutes = require("./routes/expiredRoutes");

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

// Routes
app.use("/api/notifications", require("./routes/notificationRoutes"));
app.use("/api", expiredRoutes);
app.use("/api/staff", require("./routes/staffRoutes"));

app.listen(4000, () => console.log("Server running on port 4000"));

