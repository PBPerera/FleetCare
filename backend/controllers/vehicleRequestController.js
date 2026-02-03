import VehicleRequest from "../models/VehicleRequest.js";
import Vehicle from "../models/Vehicle.js";
import Driver from "../models/Driver.js";

// Create a new vehicle request
export const createVehicleRequest = async (req, res) => {
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
    } = req.body;

    // Validate required fields
    if (
      !requestId ||
      !vehicleId ||
      !driverName ||
      !driverContact ||
      !pickupDestination ||
      !tripDate ||
      !tripTime ||
      !purpose ||
      !vehicleType ||
      !noOfPassengers
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Check if request ID already exists
    const existingRequest = await VehicleRequest.findOne({ requestId });
    if (existingRequest) {
      return res.status(400).json({ message: "Request ID already exists" });
    }

    const newRequest = new VehicleRequest({
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
      status: "Pending",
    });

    const savedRequest = await newRequest.save();

    res.status(201).json({
      message: "Vehicle request created successfully",
      data: savedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all vehicle requests
export const getAllVehicleRequests = async (req, res) => {
  try {
    const { status } = req.query;
    let filter = {};

    if (status) filter.status = status;

    const requests = await VehicleRequest.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Vehicle requests retrieved successfully",
      data: requests,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get vehicle request by Request ID
export const getVehicleRequestByRequestId = async (req, res) => {
  try {
    const { requestId } = req.params;

    if (!request) {
      return res.status(404).json({ message: "Vehicle request not found" });
    }

    res.status(200).json({
      message: "Vehicle request retrieved successfully",
      data: request,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update vehicle request status
export const updateVehicleRequestStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status || !["Pending", "Approved", "Rejected"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const updateData = {
      status,
    };

    const updatedRequest = await VehicleRequest.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      },
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Vehicle request not found" });
    }

    res.status(200).json({
      message: "Vehicle request status updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Approve vehicle request
export const approveVehicleRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequest = await VehicleRequest.findByIdAndUpdate(
      id,
      { status: "Approved" },
      { new: true },
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Vehicle request not found" });
    }

    res.status(200).json({
      message: "Vehicle request approved successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reject vehicle request
export const rejectVehicleRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const updatedRequest = await VehicleRequest.findByIdAndUpdate(
      id,
      { status: "Rejected" },
      { new: true },
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Vehicle request not found" });
    }

    res.status(200).json({
      message: "Vehicle request rejected successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update vehicle request
export const updateVehicleRequest = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Don't allow updating requestId or status through this endpoint
    delete updateData.requestId;
    delete updateData.status;

    const updatedRequest = await VehicleRequest.findByIdAndUpdate(
      id,
      updateData,
      {
        new: true,
      },
    );

    if (!updatedRequest) {
      return res.status(404).json({ message: "Vehicle request not found" });
    }

    res.status(200).json({
      message: "Vehicle request updated successfully",
      data: updatedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete vehicle request
export const deleteVehicleRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedRequest = await VehicleRequest.findByIdAndDelete(id);

    if (!deletedRequest) {
      return res.status(404).json({ message: "Vehicle request not found" });
    }

    res.status(200).json({
      message: "Vehicle request deleted successfully",
      data: deletedRequest,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get statistics
export const getVehicleRequestStats = async (req, res) => {
  try {
    const stats = await VehicleRequest.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json({
      message: "Vehicle request statistics retrieved successfully",
      data: stats,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
