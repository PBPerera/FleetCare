import RegUser from "../models/RegUser.js";
import LoginLog from "../models/LoginLog.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function getLoginLogs(req, res) {
  try {
    const logs = await LoginLog.find().sort({ loginTime: -1 });
    res.status(200).json({
      success: true,
      data: logs
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// Registered users (from Signup) merged with each user's most recent login,
// used to populate the User Management table.
export async function getAllUsers(req, res) {
  try {
    const [regUsers, logs] = await Promise.all([
      RegUser.find().select("-Password").sort({ createdAt: -1 }),
      LoginLog.find().sort({ loginTime: -1 })
    ]);

    // logs are sorted newest first, so the first entry seen per username is the latest login
    const lastLoginByUsername = new Map();
    for (const log of logs) {
      if (!lastLoginByUsername.has(log.username)) {
        lastLoginByUsername.set(log.username, log.loginTime);
      }
    }

    const users = regUsers.map((user) => {
      const loginTime = lastLoginByUsername.get(user.UserName) || null;
      let lastLoginDate = null;
      let lastLoginTime = null;

      if (loginTime) {
        const d = new Date(loginTime);
        lastLoginDate = d.toISOString().slice(0, 10);
        let hours = d.getHours();
        const minutes = `${d.getMinutes()}`.padStart(2, "0");
        const ampm = hours >= 12 ? "pm" : "am";
        hours = hours % 12 || 12;
        lastLoginTime = `${hours}:${minutes} ${ampm}`;
      }

      return {
        username: user.UserName,
        fullName: user.FullName,
        role: user.Role,
        email: user.emailaddress,
        lastLoginDate,
        lastLoginTime
      };
    });

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}
export async function registerUser(req, res) {
  try {
    const hashedPassword = await bcrypt.hash(req.body.Password, 10);
    
    const user = await RegUser.create({
      ...req.body,
      Password: hashedPassword
    });
    
    res.status(201).json({ 
      message: "User registered successfully!",
      data: { ...user.toObject(), Password: undefined }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}



export async function loginUser(req, res) {
  try {
    const { UserName, Password } = req.body;
    
    const user = await RegUser.findOne({ UserName });
    if (!user) return res.status(401).json({ error: "Invalid credentials" });
    
    const isValid = await bcrypt.compare(Password, user.Password);
    if (!isValid) return res.status(401).json({ error: "Invalid credentials" });
    
    // Log the login
    await LoginLog.create({
      username: user.UserName,
      fullName: user.FullName,
      designation: user.Designation,
      loginTime: new Date()
    });
    
    const token = jwt.sign(
      { userId: user._id, userName: user.UserName, role: user.Role },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );
    
    // Set cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000 // 24 hours
    });
    
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        fullName: user.FullName,
        emailAddress: user.emailaddress,
        phoneNumber: user.PhoneNumber,
        nic: user.NIC,
        department: user.DepartmentORUnit,
        role: user.Role,
        employeeId: user.EmployeeID,
        designation: user.Designation,
        userName: user.UserName
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}






