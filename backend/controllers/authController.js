import RegUser from "../models/RegUser.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
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
        emailAddress: user.EmailAddress,
        role: user.Role,
        userName: user.UserName
      }
    });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
}






