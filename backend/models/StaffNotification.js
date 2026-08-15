import mongoose from "mongoose";

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

export default mongoose.model("StaffNotification", StaffNotificationSchema);
