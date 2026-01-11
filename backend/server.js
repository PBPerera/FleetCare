import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/passwordRoutes.js";
import driverFormRoutes from "./routes/driverFormRoutes.js";
import vehicleFormRoutes from "./routes/vehicleFormRoutes.js";

//MaintenanceManagement Routes
import maintenanceRoutes from "./routes/maintenance.js";
import serviceRoutes from "./routes/services.js";
import repairRoutes from "./routes/repairs.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/driverforms", driverFormRoutes);
app.use("/api/vehicleforms", vehicleFormRoutes);

//Register Maintenance Routes
app.use("/api/maintenance", maintenanceRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/repairs", repairRoutes);

//Health endpoints
app.get("/api/health", (req, res) => {
    res.json({ 
      status: "OK", 
      message: "FleetCare API is running",
      timestamp: new Date().toISOString()
    });
  });
  

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));