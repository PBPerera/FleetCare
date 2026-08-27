import Notification from "../models/Notification.js";

/**
 * GET staff notifications
 *
 * Only notifications from the last 30 days are shown here - older ones
 * are simply hidden from this list, never deleted from the database.
 */
export const getStaffNotifications = async (req, res) => {
  try {
    const { userId } = req.params;

    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);

    const notifications = await Notification.find({
      userId,
      role: "staff",
      isRead: false,
      createdAt: { $gte: thirtyDaysAgo },
    }).sort({ createdAt: -1 });

    res.status(200).json(notifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Mark notification as read
 */
export const markAsRead = async (req, res) => {
  try {
    const { id } = req.params;

    await Notification.findByIdAndUpdate(id, { isRead: true });

    res.status(200).json({ message: "Notification marked as read" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Create notification (used by request approval/rejection)
 */
export const createNotification = async (data) => {
  try {
    await Notification.create(data);
  } catch (error) {
    console.error("Notification error:", error.message);
  }
};
