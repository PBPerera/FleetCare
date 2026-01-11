import Service from '../models/Service.js';
import Repair from '../models/Repair.js';

export const getDashboardStats = async (req, res) => {
  try {
    const totalServices = await Service.countDocuments();
    const scheduledServices = await Service.countDocuments({ status: 'Scheduled' });
    const inProgressServices = await Service.countDocuments({ status: 'In Progress' });
    const completedServices = await Service.countDocuments({ status: 'Completed' });

    const totalRepairs = await Repair.countDocuments();
    const pendingRepairs = await Repair.countDocuments({ status: 'Pending' });
    const approvedRepairs = await Repair.countDocuments({ status: 'Approved' });
    const completedRepairs = await Repair.countDocuments({ status: 'Completed' });

    const totalRecords = totalServices + totalRepairs;
    const scheduled = scheduledServices + pendingRepairs;
    const inProgress = inProgressServices + approvedRepairs;
    
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const completedThisMonth = await Service.countDocuments({
      status: 'Completed',
      completeDate: { $gte: startOfMonth }
    }) + await Repair.countDocuments({
      status: 'Completed',
      completeDate: { $gte: startOfMonth }
    });

    const serviceCost = await Service.aggregate([
      { $group: { _id: null, total: { $sum: '$cost' } } }
    ]);
    const repairCost = await Repair.aggregate([
      { $group: { _id: null, total: { $sum: '$cost' } } }
    ]);

    const totalCost = (serviceCost[0]?.total || 0) + (repairCost[0]?.total || 0);

    res.status(200).json({
      success: true,
      data: {
        overview: {
          total: totalRecords,
          scheduled,
          inProgress,
          completedThisMonth
        },
        services: {
          total: totalServices,
          scheduled: scheduledServices,
          inProgress: inProgressServices,
          completed: completedServices
        },
        repairs: {
          total: totalRepairs,
          pending: pendingRepairs,
          approved: approvedRepairs,
          completed: completedRepairs
        },
        costs: {
          services: serviceCost[0]?.total || 0,
          repairs: repairCost[0]?.total || 0,
          total: totalCost
        }
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching dashboard statistics',
      error: error.message
    });
  }
};

export const searchMaintenance = async (req, res) => {
  try {
    const { query, type = 'all' } = req.query;

    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const searchQuery = {
      $or: [
        { maintenanceId: { $regex: query, $options: 'i' } },
        { vehicleId: { $regex: query, $options: 'i' } },
        { driverName: { $regex: query, $options: 'i' } },
        { companyName: { $regex: query, $options: 'i' } },
        { description: { $regex: query, $options: 'i' } }
      ]
    };

    let services = [];
    let repairs = [];

    if (type === 'all' || type === 'service') {
      services = await Service.find(searchQuery).limit(10);
    }

    if (type === 'all' || type === 'repair') {
      repairs = await Repair.find(searchQuery).limit(10);
    }

    res.status(200).json({
      success: true,
      data: {
        services,
        repairs,
        totalResults: services.length + repairs.length
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching maintenance records',
      error: error.message
    });
  }
};

export const getMaintenanceHistory = async (req, res) => {
  try {
    const { vehicleId } = req.params;

    const services = await Service.find({ vehicleId })
      .sort({ date: -1 });
    
    const repairs = await Repair.find({ vehicleId })
      .sort({ requestDate: -1 });

    const history = [
      ...services.map(s => ({ ...s.toObject(), type: 'service', date: s.date })),
      ...repairs.map(r => ({ ...r.toObject(), type: 'repair', date: r.requestDate }))
    ].sort((a, b) => new Date(b.date) - new Date(a.date));

    res.status(200).json({
      success: true,
      vehicleId,
      totalRecords: history.length,
      data: history
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching maintenance history',
      error: error.message
    });
  }
};