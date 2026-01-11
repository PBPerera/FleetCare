import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/passwordRoutes.js";
import driverFormRoutes from "./routes/driverFormRoutes.js";
import vehicleFormRoutes from "./routes/vehicleFormRoutes.js";

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/driverforms", driverFormRoutes);
app.use("/api/vehicleforms", vehicleFormRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));