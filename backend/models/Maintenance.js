// const mongoose = require("mongoose");

// const MaintenanceSchema = new mongoose.Schema({
//     vehicleId: String,
//     driver: String,
//     contact: String,
//     description: String,
//     company: String
// });

// module.exports = mongoose.model("Maintenance", MaintenanceSchema);


const mongoose = require("mongoose");

const MaintenanceSchema = new mongoose.Schema({
  vehicleId: String,
  driver: String,
  contact: String,
  description: String,
  company: String,
  date: Date
});

module.exports = mongoose.model("Maintenance", MaintenanceSchema);
