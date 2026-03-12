const mongoose = require("mongoose");

const StaffNotificationSchema = new mongoose.Schema({
    type: String,
    title: String,
    message: String,
    from: String,
    reason: String,
    schedule: String,
    time: String,
    read: { type: Boolean, default: false }
});

module.exports = mongoose.model("StaffNotification", StaffNotificationSchema);
