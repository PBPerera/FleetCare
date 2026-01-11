import Service from '../models/Service.js';

export const getAllServices = async (req, res) => {
  try {
    const { 
      status, 
      vehicleId, 
      dateFrom, 
      dateTo, 
      search,
      page = 1,
      limit = 10,
      sortBy = 'date',
      sortOrder = 'desc'
    } = req.query;

    let query = {};

    if (status) query.status = status;
    if (vehicleId) query.vehicleId = vehicleId;
    
    if (dateFrom || dateTo) {
      query.date = {};
      if (dateFrom) query.date.$gte = new Date(dateFrom);
      if (dateTo) query.date.$lte = new Date(dateTo);
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

    const services = await Service.find(query)
      .sort(sort)
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
    res.status(500).json({
      success: false,
      message: 'Error fetching services',
      error: error.message
    });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    res.status(200).json({
      success: true,
      data: service
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching service',
      error: error.message
    });
  }
};

export const createService = async (req, res) => {
  try {
    const count = await Service.countDocuments();
    const maintenanceId = `M${String(count + 1).padStart(4, '0')}`;

    const service = await Service.create({
      ...req.body,
      maintenanceId,
      createdBy: req.user?._id
    });

    res.status(201).json({
      success: true,
      message: 'Service created successfully',
      data: service
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating service',
      error: error.message
    });
  }
};

export const updateService = async (req, res) => {
  try {
    let service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    service = await Service.findByIdAndUpdate(
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
      message: 'Service updated successfully',
      data: service
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error updating service',
      error: error.message
    });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);

    if (!service) {
      return res.status(404).json({
        success: false,
        message: 'Service not found'
      });
    }

    await service.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Service deleted successfully',
      data: {}
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting service',
      error: error.message
    });
  }
};

export const getServiceStats = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments();
    const scheduled = await Service.countDocuments({ status: 'Scheduled' });
    const inProgress = await Service.countDocuments({ status: 'In Progress' });
    const completed = await Service.countDocuments({ status: 'Completed' });
    
    const costAggregation = await Service.aggregate([
      { $group: { _id: null, totalCost: { $sum: '$cost' } } }
    ]);
    const totalCost = costAggregation[0]?.totalCost || 0;

    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const completedThisMonth = await Service.countDocuments({
      status: 'Completed',
      completeDate: { $gte: startOfMonth }
    });

    res.status(200).json({
      success: true,
      data: {
        total: totalServices,
        scheduled,
        inProgress,
        completed,
        completedThisMonth,
        totalCost
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching service statistics',
      error: error.message
    });
  }
};