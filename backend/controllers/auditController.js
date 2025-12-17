// controllers/auditController.js
const Service = require('../models/Service');
const Repair = require('../models/Repair');

// @desc    Get all completed audit logs (services + repairs)
// @route   GET /api/audit/logs
// @access  Public
exports.getAuditLogs = async (req, res) => {
  try {
    const {
      vehicleId,
      company,
      dateFrom,
      dateTo,
      type, // 'service' or 'repair' or 'all'
      page = 1,
      limit = 20,
      sortBy = 'completeDate',
      sortOrder = 'desc'
    } = req.query;

    // Build query for completed items
    let serviceQuery = { status: 'Completed', completeDate: { $exists: true, $ne: null } };
    let repairQuery = { status: 'Completed', completeDate: { $exists: true, $ne: null } };

    // Apply filters
    if (vehicleId) {
      serviceQuery.vehicleId = { $regex: vehicleId, $options: 'i' };
      repairQuery.vehicleId = { $regex: vehicleId, $options: 'i' };
    }

    if (company) {
      serviceQuery.companyName = { $regex: company, $options: 'i' };
      repairQuery.companyName = { $regex: company, $options: 'i' };
    }

    if (dateFrom || dateTo) {
      const dateFilter = {};
      if (dateFrom) dateFilter.$gte = new Date(dateFrom);
      if (dateTo) dateFilter.$lte = new Date(dateTo);
      serviceQuery.completeDate = dateFilter;
      repairQuery.completeDate = dateFilter;
    }

    // Fetch data based on type
    let services = [];
    let repairs = [];

    if (type === 'service' || !type || type === 'all') {
      services = await Service.find(serviceQuery)
        .sort({ completeDate: sortOrder === 'desc' ? -1 : 1 })
        .select('maintenanceId vehicleId driverName description cost companyName completeDate status createdAt updatedAt');
    }

    if (type === 'repair' || !type || type === 'all') {
      repairs = await Repair.find(repairQuery)
        .sort({ completeDate: sortOrder === 'desc' ? -1 : 1 })
        .select('maintenanceId vehicleId driverName description cost companyName completeDate status priority createdAt updatedAt');
    }

    // Combine and sort
    const combined = [
      ...services.map(s => ({ ...s.toObject(), type: 'Service' })),
      ...repairs.map(r => ({ ...r.toObject(), type: 'Repair' }))
    ].sort((a, b) => {
      const dateA = new Date(a.completeDate);
      const dateB = new Date(b.completeDate);
      return sortOrder === 'desc' ? dateB - dateA : dateA - dateB;
    });

    // Pagination
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedResults = combined.slice(startIndex, endIndex);

    res.status(200).json({
      success: true,
      count: paginatedResults.length,
      total: combined.length,
      page: parseInt(page),
      pages: Math.ceil(combined.length / limit),
      data: paginatedResults
    });
  } catch (error) {
    console.error('Audit logs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching audit logs',
      error: error.message
    });
  }
};

// @desc    Get completed services
// @route   GET /api/audit/services
// @access  Public
exports.getCompletedServices = async (req, res) => {
  try {
    const {
      vehicleId,
      company,
      dateFrom,
      dateTo,
      page = 1,
      limit = 20
    } = req.query;

    let query = {
      status: 'Completed',
      completeDate: { $exists: true, $ne: null }
    };

    if (vehicleId) {
      query.vehicleId = { $regex: vehicleId, $options: 'i' };
    }

    if (company) {
      query.companyName = { $regex: company, $options: 'i' };
    }

    if (dateFrom || dateTo) {
      const dateFilter = {};
      if (dateFrom) dateFilter.$gte = new Date(dateFrom);
      if (dateTo) dateFilter.$lte = new Date(dateTo);
      query.completeDate = dateFilter;
    }

    const skip = (page - 1) * limit;

    const services = await Service.find(query)
      .sort({ completeDate: -1 })
      .limit(parseInt(limit))
      .skip(skip);

    const total = await Service.countDocuments(query);

    res.status(200).json({
      success: true,
      count: services.length,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / limit),
      data: services
    });
  } catch (error) {
    console.error('Completed services error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching completed services',
      error: error.message
    });
  }
};

// @desc    Get completed repairs
// @route   GET /api/audit/repairs
// @access  Public
exports.getCompletedRepairs = async (req, res) => {
  try {
    const {
      vehicleId,
      company,
      dateFrom,
      dateTo,
      page = 1,
      limit = 20
    } = req.query;

    let query = {
      status: 'Completed',
      completeDate: { $exists: true, $ne: null }
    };

    if (vehicleId) {
      query.vehicleId = { $regex: vehicleId, $options: 'i' };
    }

    if (company) {
      query.companyName = { $regex: company, $options: 'i' };
    }

    if (dateFrom || dateTo) {
      const dateFilter = {};
      if (dateFrom) dateFilter.$gte = new Date(dateFrom);
      if (dateTo) dateFilter.$lte = new Date(dateTo);
      query.completeDate = dateFilter;
    }

    const skip = (page - 1) * limit;

    const repairs = await Repair.find(query)
      .sort({ completeDate: -1 })
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
    console.error('Completed repairs error:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching completed repairs',
      error: error.message
    });
  }
};

