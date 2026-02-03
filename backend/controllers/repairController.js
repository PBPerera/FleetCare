import Repair from '../models/Repair.js';

// @desc    Get all repairs
// @route   GET /api/repairs
// @access  Public
export const getAllRepairs = async (req, res) => {
  try {
    const { 
      status, 
      vehicleId, 
      priority,
      dateFrom, 
      dateTo, 
      search,
      page = 1,
      limit = 10,
      sortBy = 'requestDate',
      sortOrder = 'desc'
    } = req.query;

    let query = {};

    if (status) query.status = status;
    if (vehicleId) query.vehicleId = vehicleId;
    if (priority) query.priority = priority;
    
    if (dateFrom || dateTo) {
      query.requestDate = {};
      if (dateFrom) query.requestDate.$gte = new Date(dateFrom);
      if (dateTo) query.requestDate.$lte = new Date(dateTo);
    }

    if (search) {
      query.$or = [
        { maintenanceId: { $regex: search, $options: 'i' } },
        { vehicleId: { $regex: search, $options: 'i' } },
        { driverName: { $regex: search, $options: 'i' } },
        { companyName: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const skip = (page - 1) * limit;
    const sort = { [sortBy]: sortOrder === 'desc' ? -1 : 1 };

    const repairs = await Repair.find(query)
      .sort(sort)
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Repair.countDocuments(query);

    res.status(200).json({
      success: true,
      count: repairs.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: repairs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching repairs',
      error: error.message
    });
  }
};

// @desc    Get pending repairs
// @route   GET /api/repairs/pending
// @access  Public
export const getPendingRepairs = async (req, res) => {
  try {
    const repairs = await Repair.find({ status: 'Pending' })
      .sort({ requestDate: -1 });

    res.status(200).json({
      success: true,
      count: repairs.length,
      data: repairs
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching pending repairs',
      error: error.message
    });
  }
};

// @desc    Get single repair
// @route   GET /api/repairs/:id
// @access  Public
export const getRepairById = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);

    if (!repair) {
      return res.status(404).json({
        success: false,
        message: 'Repair not found'
      });
    }

    res.status(200).json({
      success: true,
      data: repair
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching repair',
      error: error.message
    });
  }
};

// @desc    Create new repair
// @route   POST /api/repairs
// @access  Public
export const createRepair = async (req, res) => {
  try {
    const count = await Repair.countDocuments();
    const maintenanceId = `R${String(count + 1).padStart(4, '0')}`;

    const repair = await Repair.create({
      ...req.body,
      maintenanceId,
      createdBy: req.user?._id
    });

    res.status(201).json({
      success: true,
      message: 'Repair request created successfully',
      data: repair
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating repair',
      error: error.message
    });
  }
};

// @desc    Update repair
// @route   PUT /api/repairs/:id
// @access  Public
export const updateRepair = async (req, res) => {
  try {
    let repair = await Repair.findById(req.params.id);

    if (!repair) {
      return res.status(404).json({
        success: false,
        message: 'Repair not found'
      });
    }

    repair = await Repair.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        updatedBy: req.user?._id
      },
      {
        new: true,
        runValidators: true
      }
    );

    res.status(200).json({
      success: true,
      message: 'Repair updated successfully',
      data: repair
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating repair',
      error: error.message
    });
  }
};

// @desc    Approve repair
// @route   PUT /api/repairs/:id/approve
// @access  Private/Admin
export const approveRepair = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);

    if (!repair) {
      return res.status(404).json({
        success: false,
        message: 'Repair not found'
      });
    }

    const { comments } = req.body;
    await repair.approve(req.user?._id, comments);

    res.status(200).json({
      success: true,
      message: 'Repair approved successfully',
      data: repair
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error approving repair',
      error: error.message
    });
  }
};

// @desc    Reject repair
// @route   PUT /api/repairs/:id/reject
// @access  Private/Admin
export const rejectRepair = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);

    if (!repair) {
      return res.status(404).json({
        success: false,
        message: 'Repair not found'
      });
    }

    const { reason } = req.body;
    
    if (!reason) {
      return res.status(400).json({
        success: false,
        message: 'Rejection reason is required'
      });
    }

    await repair.reject(req.user?._id, reason);

    res.status(200).json({
      success: true,
      message: 'Repair rejected successfully',
      data: repair
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error rejecting repair',
      error: error.message
    });
  }
};

// @desc    Update approval stage
// @route   PUT /api/repairs/:id/approval-stage
// @access  Private
export const updateApprovalStage = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);

    if (!repair) {
      return res.status(404).json({
        success: false,
        message: 'Repair not found'
      });
    }

    const { 
      procurementStage1, 
      tenderCall, 
      engineer,
      engineerDate,
      procurementStage2,
      developmentOfficer
    } = req.body;

    if (procurementStage1) repair.procurementStage1 = procurementStage1;
    if (tenderCall) repair.tenderCall = tenderCall;
    if (engineer) repair.engineer = engineer;
    if (engineerDate) repair.engineerDate = engineerDate;
    if (procurementStage2) repair.procurementStage2 = procurementStage2;
    if (developmentOfficer) repair.developmentOfficer = developmentOfficer;

    repair.updatedBy = req.user?._id;
    await repair.save();

    res.status(200).json({
      success: true,
      message: 'Approval stage updated successfully',
      data: repair
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating approval stage',
      error: error.message
    });
  }
};

// @desc    Delete repair
// @route   DELETE /api/repairs/:id
// @access  Public
export const deleteRepair = async (req, res) => {
  try {
    const repair = await Repair.findById(req.params.id);

    if (!repair) {
      return res.status(404).json({
        success: false,
        message: 'Repair not found'
      });
    }

    await repair.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Repair deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting repair',
      error: error.message
    });
  }
};

// @desc    Get repair statistics
// @route   GET /api/repairs/stats
// @access  Public
export const getRepairStats = async (req, res) => {
  try {
    const totalRepairs = await Repair.countDocuments();
    const pending = await Repair.countDocuments({ status: 'Pending' });
    const approved = await Repair.countDocuments({ status: 'Approved' });
    const rejected = await Repair.countDocuments({ status: 'Rejected' });
    const inProgress = await Repair.countDocuments({ status: 'In Progress' });
    const completed = await Repair.countDocuments({ status: 'Completed' });

    const critical = await Repair.countDocuments({ priority: 'Critical', status: 'Pending' });
    const high = await Repair.countDocuments({ priority: 'High', status: 'Pending' });

    const costAggregation = await Repair.aggregate([
      { $group: { _id: null, totalCost: { $sum: '$cost' } } }
    ]);
    const totalCost = costAggregation[0]?.totalCost || 0;

    res.status(200).json({
      success: true,
      data: {
        total: totalRepairs,
        pending,
        approved,
        rejected,
        inProgress,
        completed,
        critical,
        high,
        totalCost
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching repair statistics',
      error: error.message
    });
  }
};