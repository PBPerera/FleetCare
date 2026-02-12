const Trip = require("../models/Trip");

exports.createTrip = async (req, res) => {
  try {
    const trip = new Trip(req.body);
    await trip.save();
    res.json({ message: "Trip added", trip });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTrips = async (req, res) => {
  try {
    const trips = await Trip.find();
    res.json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
