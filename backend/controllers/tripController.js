import Trip from "../models/Trip.js";
import VehicleRequest from "../models/VehicleRequest.js";

// Create a trip from vehicle request approval
export const createTripFromApproval = async (req, res) => {
  try {
    const {
      requestId,
      vehicleId,
      driverName,
      driverContact,
      pickupDestination,
      tripDate,
      tripTime,
      purpose,
      vehicleType,
      noOfPassengers,
      status,
      vehicleRequestId,
    } = req.body;

    if (!requestId || !vehicleRequestId || !status) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const existingTrip = await Trip.findOne({ requestId });
    if (existingTrip) {
      return res
        .status(400)
        .json({ message: "Trip for this request already exists" });
    }

    const newTrip = new Trip({
      requestId,
      vehicleId,
      driverName,
      driverContact,
      pickupDestination,
      tripDate: new Date(tripDate),
      tripTime,
      purpose,
      vehicleType,
      noOfPassengers,
      status,
      vehicleRequestId,
    });

    const savedTrip = await newTrip.save();

    res.status(201).json({
      message: "Trip created successfully",
      data: savedTrip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all trips
export const getAllTrips = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) filter.status = status;

    const trips = await Trip.find(filter)
      .populate("vehicleRequestId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Trips retrieved successfully",
      data: trips,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get trip by Request ID
export const getTripByRequestId = async (req, res) => {
  try {
    const { requestId } = req.params;

    const trip = await Trip.findOne({ requestId }).populate("vehicleRequestId");

    if (!trip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({
      message: "Trip retrieved successfully",
      data: trip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get approved trips
export const getApprovedTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ status: "Approved" })
      .populate("vehicleRequestId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Approved trips retrieved successfully",
      data: trips,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get rejected trips
export const getRejectedTrips = async (req, res) => {
  try {
    const trips = await Trip.find({ status: "Rejected" })
      .populate("vehicleRequestId")
      .sort({ createdAt: -1 });

    res.status(200).json({
      message: "Rejected trips retrieved successfully",
      data: trips,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete trip
export const deleteTrip = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedTrip = await Trip.findByIdAndDelete(id);

    if (!deletedTrip) {
      return res.status(404).json({ message: "Trip not found" });
    }

    res.status(200).json({
      message: "Trip deleted successfully",
      data: deletedTrip,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
