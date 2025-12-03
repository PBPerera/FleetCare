import VehicleForm from "../models/VehicleForm.js";

// Add new vehicle
export const addVehicleForm = async (req, res) => {
  try {
    const vehicle = new VehicleForm(req.body);
    await vehicle.save();
    res.status(201).json({ msg: "Vehicle added successfully", vehicle });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// Get all vehicle
export const getVehicleForm = async (req, res) => {
  try {
    const vehicles = await Vehicle.find();
    res.json(vehicles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};