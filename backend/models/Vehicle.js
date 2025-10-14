const mongoose = require('mongoose');
const VehicleSchema = new mongoose.Schema({
  plate: String,
  model: String,
  status: {type:String, default:'active'},
  createdAt:{type:Date, default: Date.now}
});
module.exports = mongoose.model('Vehicle', VehicleSchema);
