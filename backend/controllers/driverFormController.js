import DriverForm from "../models/DriverForm.js";

// Add new driver
export const addDriverForm = async (req, res) => {
  try {
    const driver = new DriverForm(req.body);
    await driver.save();
    res.status(201).json({ msg: "Driver added successfully", driver });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
};

// Get all drivers
export const getDriverForm = async (req, res) => {
  try {
    const drivers = await Driver.find();
    res.json(drivers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: "Server error", error });
  }
<<<<<<< HEAD
};
=======
};
>>>>>>> 879ada679e825132febcdadc2d4ea122dd7293e3
