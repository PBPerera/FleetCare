const mongoose = require('mongoose');
const DriverSchema = new mongoose.Schema({
  name:String,
  license:String,
  phone:String,
  createdAt:{type:Date, default: Date.now}
});
module.exports = mongoose.model('Driver', DriverSchema);
