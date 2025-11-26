
const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
  title: String,
  body: String,
  vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle' },
  read: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Notification', NotificationSchema);
