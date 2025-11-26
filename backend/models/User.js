const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  role: { type: String, enum: ['admin','user','driver'], default: 'user' },
  createdAt: { type: Date, default: Date.now }
});

// password hashing helper
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

UserSchema.methods.matchPassword = async function(typed) {
  return bcrypt.compare(typed, this.password);
};

module.exports = mongoose.model('User', UserSchema);
