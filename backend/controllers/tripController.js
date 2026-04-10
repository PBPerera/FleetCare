import Trip from "../models/Trip.js";

// @desc    Get all trips
// @route   GET /api/trips
export const getTrips = async (req, res) => {
  try {
    const trips = await Trip.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: trips.length, data: trips });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new trip
// @route   POST /api/trips
export const createTrip = async (req, res) => {
  try {
    const trip = await Trip.create(req.body);
    res.status(201).json({ success: true, data: trip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

// @desc    Update trip status
// @route   PUT /api/trips/:id
export const updateTrip = async (req, res) => {
  try {
    const trip = await Trip.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!trip) {
      return res.status(404).json({ success: false, message: "Trip not found" });
    }
    res.status(200).json({ success: true, data: trip });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};
