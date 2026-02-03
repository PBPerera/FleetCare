const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const vehicleRoutes = require('./routes/vehicles');
const userRoutes = require('./routes/users');
const driverRoutes = require('./routes/driver');
const tripRoutes = require('./routes/trips');
const maintenanceRoutes = require('./routes/maintenance');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);

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