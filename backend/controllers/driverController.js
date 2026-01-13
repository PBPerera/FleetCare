import Driver from "../models/Driver.js";



export async function getDrivers(req, res) {
  try {
    const Drivers = await Driver.find().sort({ createdAt: -1 });
    res.json({ Drivers });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}


export async function getDriversById(req, res) {
  try {
   
    const Drivers = await Driver.findOne({ driver_id: req.params.driver_id });
  
    
    if (!Drivers) return res.status(404).json({ error: "Drivers not found" });
    res.json(Drivers);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}


export async function createDriver(req,res){
    try {
        const created=await Driver.create(req.body);
         res.status(201).json({ data: created, message: "Driver Create successfully!" });
    } catch (e) {
        res.status(400).json({msg:"Error creating Driver",error:e.message})
    }
}

export async function updateDriver(req, res) {
  try {
    console.log("Updating driver_id:", req.params.driver_id);
    console.log("Update data:", req.body);
    
    const updated = await Driver.findOneAndUpdate(
      { driver_id: req.params.driver_id },
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    
    console.log("Updated result:", updated);
    
    if (!updated) return res.status(404).json({ error: "Driver not found" });
    res.json({ data: updated, message: "Driver updated successfully!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}


export async function deleteDriver(req, res) {
  try {
    const deleted = await Driver.findOneAndDelete( { driver_id: req.params.driver_id });
    if (!deleted) return res.status(404).json({ error: "Driver not found" });
    res.json({ ok: true, vehicle_id: req.params.vehicle_id, message: "Driver deleted successfully!" });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}

