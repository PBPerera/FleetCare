// import express from "express";
// import cors from "cors";
// import dotenv from "dotenv";
// dotenv.config();

// import connectDB from "./config/db.js";
// import authRoutes from "./routes/passwordRoutes.js";
// import driverFormRoutes from "./routes/driverFormRoutes.js";
// import vehicleFormRoutes from "./routes/vehicleFormRoutes.js";
// import vehicleRoute from "./routes/vehicles.js";
// import driverRoute from "./routes/driver.js";
// import loginauthRoute from "./routes/auth.js";
// //MaintenanceManagement Routes
// import maintenanceRoutes from "./routes/maintenance.js";
// import serviceRoutes from "./routes/services.js";
// import repairRoutes from "./routes/repairs.js";
// import auditRoutes from "./routes/audit.js";
// import vehicleRequestRoutes from "./routes/vehicleRequest.js";
// import tripRoutes from "./routes/trips.js";

// const app = express();

// app.use(cors());
// app.use(express.json());

// connectDB();
// app.use("/api/loginauth", loginauthRoute); //1
// app.use("/api/auth", authRoutes);
// app.use("/api/driverforms", driverFormRoutes);
// app.use("/api/vehicleforms", vehicleFormRoutes);
// app.use("/api/vehicle", vehicleRoute); //2
// app.use("/api/driver", driverRoute); //3

// //Register Maintenance Routes
// app.use("/api/maintenance", maintenanceRoutes);
// app.use("/api/services", serviceRoutes);
// app.use("/api/repairs", repairRoutes);

// //Health endpoints
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "FleetCare API is running",
//     timestamp: new Date().toISOString(),
//   });
// });

// //Register Maintenance Routes
// app.use("/api/maintenance", maintenanceRoutes);
// app.use("/api/services", serviceRoutes);
// app.use("/api/repairs", repairRoutes);

// app.use("/api/audit", auditRoutes);
// app.use("/api/vehicleRequests", vehicleRequestRoutes);
// app.use("/api/trips", tripRoutes);

// //Health endpoints
// app.get("/api/health", (req, res) => {
//   res.json({
//     status: "OK",
//     message: "FleetCare API is running",
//     timestamp: new Date().toISOString(),
//   });
// });

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/passwordRoutes.js";
import driverFormRoutes from "./routes/driverFormRoutes.js";
import vehicleFormRoutes from "./routes/vehicleFormRoutes.js";
import vehicleRoute from "./routes/vehicles.js";
import driverRoute from "./routes/driver.js";
import loginauthRoute from "./routes/auth.js";

// Maintenance Management Routes
import maintenanceRoutes from "./routes/maintenance.js";
import serviceRoutes from "./routes/services.js";
import repairRoutes from "./routes/repairs.js";
import auditRoutes from "./routes/audit.js";
import vehicleRequestRoutes from "./routes/vehicleRequest.js";
import tripRoutes from "./routes/trips.js";

// ✅ ADD THIS
import notificationRoutes from "./routes/notificationRoutes.js";
import notificationStaffRoutes from "./routes/notificationStaffRoutes.js";
import notificationTripRoutes from "./routes/notificationTripRoutes.js";
import notifyRoutes from "./routes/notify.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/loginauth", loginauthRoute);
app.use("/api/auth", authRoutes);
app.use("/api/driverforms", driverFormRoutes);
app.use("/api/vehicleforms", vehicleFormRoutes);
app.use("/api/vehicle", vehicleRoute);
app.use("/api/driver", driverRoute);

app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/repairs", repairRoutes);
app.use("/api/audit", auditRoutes);
app.use("/api/vehicleRequests", vehicleRequestRoutes);
app.use("/api/trips", tripRoutes);

// Notification routes
app.use("/api/notifications", notificationRoutes);
app.use("/api/notifications", notificationStaffRoutes);
app.use("/api/notification/trips", notificationTripRoutes);
app.use("/api/notify", notifyRoutes);

// Health endpoint
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "FleetCare API is running",
    timestamp: new Date().toISOString(),
  });
});

const PORT = parseInt(process.env.PORT, 10) || 5000;
const server = app.listen(PORT, () =>
  console.log(`Server running on port ${PORT}`),
);

server.on("error", (error) => {
  if (error.code === "EADDRINUSE") {
    console.error(
      `Port ${PORT} is already in use. Stop the process using that port or change PORT in .env.`,
    );
    process.exit(1);
  }
  console.error("Server error:", error);
  process.exit(1);
});
