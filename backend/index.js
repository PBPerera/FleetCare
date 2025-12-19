const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

// Routes
const authRoutes = require('./routes/auth');
const vehicleRoutes = require('./routes/vehicles');
const userRoutes = require('./routes/users');
const driverRoutes = require('./routes/driver');
const tripRoutes = require('./routes/trips');
const maintenanceRoutes = require('./routes/maintenance');


const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.path}`);
  next();
});

// Root
app.get('/', (req, res) => {
  res.json({
    message: 'FleetCare Backend API',
    version: '1.0.0'
  });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', vehicleRoutes);
app.use('/api/users', userRoutes);
app.use('/api/drivers', driverRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);

// Health
app.get('/health', (req, res) => {
  res.json({ status: 'OK', time: new Date() });
});

// 404
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ message: 'Internal Server Error' });
});

const PORT = process.env.PORT || 4000;
const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/fleetcare';

let serverStarted = false;

function startServer() {
  if (serverStarted) return; // 🛑 prevent double listen
  serverStarted = true;

  app.listen(PORT, () => {
    console.log('');
    console.log('╔══════════════════════════════════════╗');
    console.log('║ 🚀 FleetCare Backend Started         ║');
    console.log(`║ 📍 Port: ${PORT}                       ║`);
    console.log(`║ 🔗 http://localhost:${PORT}           ║`);
    console.log('╚══════════════════════════════════════╝');
    console.log('');
  });
}

// MongoDB
mongoose
  .connect(MONGO)
  .then(() => {
    console.log('✅ Connected to MongoDB');
    startServer();
  })
  .catch(err => {
    console.error('❌ MongoDB connection failed');
    console.error(err.message);
    process.exit(1);
  });

