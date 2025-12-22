import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import driverFormRoutes from "./routes/driverFormRoutes.js";
<<<<<<< HEAD
import vehicleFormRoutes from "./routes/vehicleFormRoutes.js";  

=======
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3

const app = express();

app.use(cors());
app.use(express.json());

connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/drivers", driverFormRoutes);
<<<<<<< HEAD
app.use("/api/vehicles", vehicleFormRoutes);

=======
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
