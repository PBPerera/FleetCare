

const Notification = require("../models/Notification");

// ============================
// GET ALL NOTIFICATIONS
// ============================
exports.getAll = async (req, res) => {
  const filter = {};

  // optional filters
  if (req.query.type) filter.type = req.query.type;
  if (req.query.vehicleId) filter.vehicleId = req.query.vehicleId;

  try {
    const notifications = await Notification.find(filter)
      .sort({ createdAt: -1 })
      .limit(100);

    res.json(notifications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
// GET BY ID
// ============================
exports.getById = async (req, res) => {
  try {
    const n = await Notification.findById(req.params.id);
    if (!n) return res.status(404).json({ message: "Not found" });

    res.json(n);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
// CREATE NOTIFICATION
// ============================
exports.create = async (req, res) => {
  try {
    const n = new Notification(req.body);
    await n.save();
    res.status(201).json(n);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
// UPDATE
// ============================
exports.update = async (req, res) => {
  try {
    const updated = await Notification.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Not found" });

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================
// DELETE
// ============================
exports.remove = async (req, res) => {
  try {
    await Notification.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
