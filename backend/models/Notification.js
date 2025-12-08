const mongoose = require('mongoose');


const NotificationSchema = new mongoose.Schema({
type: { // 'service' | 'trip' | 'insurance' | 'license' | etc.
type: String,
required: true,
index: true,
},
maintenanceId: { type: mongoose.Schema.Types.ObjectId, ref: 'Maintenance', default: null },
vehicleId: { type: String, default: '' },
driverName: { type: String, default: '' },
driverId: { type: String, default: '' },
contactNo: { type: String, default: '' },
description: { type: String, default: '' },
companyName: { type: String, default: '' },
dueDate: { type: Date, default: null },
status: { type: String, default: 'Active' }, // Active | Resolved | Snoozed
read: { type: Boolean, default: false },
meta: { type: Object, default: {} },
}, { timestamps: true });


module.exports = mongoose.model('Notification', NotificationSchema);