const mongoose = require('mongoose');
const MaintenanceSchema = new mongoose.Schema({
  vehicle: {type: mongoose.Schema.Types.ObjectId, ref:'Vehicle'},
  title: String,
  dueDate: Date,
  status: {type:String, default:'open'}
});
module.exports = mongoose.model('Maintenance', MaintenanceSchema);
