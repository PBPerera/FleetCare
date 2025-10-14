const mongoose = require('mongoose');
const TripSchema = new mongoose.Schema({
  vehicle: {type: mongoose.Schema.Types.ObjectId, ref:'Vehicle'},
  driver: {type: mongoose.Schema.Types.ObjectId, ref:'Driver'},
  from: String,
  to: String,
  status: {type:String, default:'scheduled'},
  scheduledAt: Date
});
module.exports = mongoose.model('Trip', TripSchema);
