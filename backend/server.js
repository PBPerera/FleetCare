// const express = require("express");
// const cors = require("cors");
// const connectDB = require("./config/db");
// const expiredRoutes = require("./routes/expiredRoutes");

// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();

// // Routes
// app.use("/api/notifications", require("./routes/notificationRoutes"));
// app.use("/api", expiredRoutes);
// app.use("/api/staff", require("./routes/staffRoutes"));

// app.listen(4000, () => console.log("Server running on port 4000"));


const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");

const notificationRoutes = require("./routes/notificationRoutes");
const expiredRoutes = require("./routes/expiredRoutes");
const staffRoutes = require("./routes/staffRoutes");

const app = express();

/* =========================
   MIDDLEWARE
========================= */
app.use(cors({
  origin: "http://localhost:3000", // React frontend
  credentials: true,
}));

app.use(express.json());

/* =========================
   DATABASE CONNECTION
========================= */
connectDB();

/* =========================
   ROUTES
========================= */
app.use("/api/notifications", notificationRoutes);
app.use("/api", expiredRoutes);
app.use("/api/staff", staffRoutes);

/* =========================
   HEALTH CHECK (OPTIONAL)
========================= */
app.get("/", (req, res) => {
  res.send("FleetCare Backend API Running 🚀");
});

/* =========================
   SERVER START
========================= */
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
