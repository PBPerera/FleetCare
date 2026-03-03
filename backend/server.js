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
//MaintenanceManagement Routes
import maintenanceRoutes from "./routes/maintenance.js";
import serviceRoutes from "./routes/services.js";
import repairRoutes from "./routes/repairs.js";
import auditRoutes from "./routes/audit.js";
import vehicleRequestRoutes from "./routes/vehicleRequest.js";
import tripRoutes from "./routes/trips.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();
app.use("/api/loginauth", loginauthRoute); //1
app.use("/api/auth", authRoutes);
app.use("/api/driverforms", driverFormRoutes);
app.use("/api/vehicleforms", vehicleFormRoutes);
app.use("/api/vehicle", vehicleRoute); //2
app.use("/api/driver", driverRoute); //3

//Register Maintenance Routes
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/repairs", repairRoutes);

//Health endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "FleetCare API is running",
    timestamp: new Date().toISOString(),
  });
});

//Register Maintenance Routes
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/repairs", repairRoutes);

app.use("/api/audit", auditRoutes);
app.use("/api/vehicleRequests", vehicleRequestRoutes);
app.use("/api/trips", tripRoutes);

//Health endpoints
app.get("/api/health", (req, res) => {
  res.json({
    status: "OK",
    message: "FleetCare API is running",
    timestamp: new Date().toISOString(),
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
