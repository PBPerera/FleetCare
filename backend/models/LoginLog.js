import mongoose from 'mongoose';

const loginLogSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true
  },
  fullName: {
    type: String,
    required: true,
    trim: true
  },
  designation: {
    type: String,
    required: true,
    trim: true
  },
  loginTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

const LoginLog = mongoose.model('LoginLog', loginLogSchema, 'loginlogs');

export default LoginLog;