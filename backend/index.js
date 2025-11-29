const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
//const vehicleRoutes = require('./routes/vehicles');
//const userRoutes = require('./routes/users');
//const driverRoutes = require('./routes/drivers');
//const tripRoutes = require('./routes/trips');
const maintenanceRoutes = require('./routes/maintenance');
const serviceRoutes = require('./routes/service');
const repairRoutes = require('./routes/repair');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
//app.use('/api/vehicles', vehicleRoutes);
//app.use('/api/users', userRoutes);
//app.use('/api/drivers', driverRoutes);
//app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/services', serviceRoutes);
app.use('/api/repairs', repairRoutes);

// Health check route
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'FleetCare API is running',
    timestamp: new Date().toISOString()
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ 
    success: false,
    message: 'Route not found' 
  });
});

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/fleetcare';

mongoose.connect(MONGO, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(()=> {
    console.log('Connected to MongoDB');
    app.listen(PORT, ()=> console.log('Server started on port', PORT));
  })
  .catch(err=> {
    console.error('MongoDB connection error:', err.message);
    // still start server for demo (uses in-memory fallback)
    app.listen(PORT, ()=> console.log('Server started on port', PORT, '(no DB)'));
  });

  module.exports = app;