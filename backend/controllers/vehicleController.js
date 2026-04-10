import Vehicle from "../models/Vehicle.js";
import Trip from "../models/Trip.js";


export async function getVehicles(req, res) {
  try {
    const vehicles = await Vehicle.find().sort({ createdAt: -1 });
    
    // Enrich with latest driver info from trips
    const enrichedVehicles = await Promise.all(vehicles.map(async (v) => {
      const vehicleObj = v.toObject();
      const latestTrip = await Trip.findOne({ vehicleId: v.vehicle_id }).sort({ createdAt: -1 });
      if (latestTrip) {
        vehicleObj.driverName = latestTrip.driverName;
        vehicleObj.driverContact = latestTrip.driverContact;
      } else {
        vehicleObj.driverName = "—";
        vehicleObj.driverContact = "—";
      }
      return vehicleObj;
    }));

    res.json({ vehicles: enrichedVehicles });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}



export async function createVehicle(req,res){
    try {
        const created=await Vehicle.create(req.body);
         res.status(201).json({ data: created, message: "Vehicle Created successfully!" });
    } catch (e) {
        res.status(400).json({msg:"Error creating driver",error:e.message})
    }
}


export async function getVehicleById(req, res) {
  try {
   
    const vehicle = await Vehicle.findOne({ vehicle_id: req.params.vehicle_id });
  
    
    if (!vehicle) return res.status(404).json({ error: "Vehicle not found" });
    res.json(vehicle);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}


export async function updateVehicle(req, res) {
  try {
    const updated = await Vehicle.findOneAndUpdate(
      { vehicle_id: req.params.vehicle_id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!updated) return res.status(404).json({ error: "Vehicle not found" });
    res.json({ data: updated, message: "Vehicle updated successfully!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}


export async function deleteVehicle(req, res) {
  try {
    const deleted = await Vehicle.findOneAndDelete({ vehicle_id: req.params.vehicle_id });
    if (!deleted) return res.status(404).json({ error: "Vehicle not found" });
    res.json({ ok: true, vehicle_id: req.params.vehicle_id, message: "Vehicle deleted successfully!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}








