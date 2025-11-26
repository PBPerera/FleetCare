// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const authRoutes = require('./routes/auth');
// const vehicleRoutes = require('./routes/vehicles');
// const userRoutes = require('./routes/users');
// const driverRoutes = require('./routes/drivers');
// const tripRoutes = require('./routes/trips');
// const maintenanceRoutes = require('./routes/maintenance');

// dotenv.config();
// const app = express();
// app.use(cors());
// app.use(express.json());

// app.use('/api/auth', authRoutes);
// app.use('/api/vehicles', vehicleRoutes);
// app.use('/api/users', userRoutes);
// app.use('/api/drivers', driverRoutes);
// app.use('/api/trips', tripRoutes);
// app.use('/api/maintenance', maintenanceRoutes);

// const PORT = process.env.PORT || 4000;
// const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/fleetcare';

// mongoose.connect(MONGO, {useNewUrlParser:true, useUnifiedTopology:true})
//   .then(()=> {
//     console.log('Connected to MongoDB');
//     app.listen(PORT, ()=> console.log('Server started on port', PORT));
//   })
//   .catch(err=> {
//     console.error('MongoDB connection error:', err.message);
//     // still start server for demo (uses in-memory fallback)
//     app.listen(PORT, ()=> console.log('Server started on port', PORT, '(no DB)'));
//   });

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const authRoutes = require('./routes/auth');
const vehicleRoutes = require('./routes/vehicles');

const tripRoutes = require('./routes/trips');
const maintenanceRoutes = require('./routes/maintenance');
const notificationRoutes = require('./routes/notifications');
const userRoutes = require('./routes/users');

const app = express();

app.use(cors());
app.use(express.json());

// connect db
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fleetcare';
connectDB(MONGO_URI);

// base route
app.get('/', (req, res) => res.send({ message: 'FleetCare API running' }));

// api routes prefix /api
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/vehicles', vehicleRoutes);

app.use('/api/trips', tripRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/notifications', notificationRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
