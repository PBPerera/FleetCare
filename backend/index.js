const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();


const notificationRoutes = require('./routes/notificationRoutes');


const app = express();
app.use(cors());
app.use(express.json());


// add other routes (users, maintenance, etc.) before or after
app.use('/api/notifications', notificationRoutes);

const notificationStaffRoutes = require("./routes/notificationStaffRoutes");

app.use("/api/notifications", notificationStaffRoutes);


const notificationTripRoutes = require("./routes/notificationTripRoutes");
app.use("/api/notification/trips", notificationTripRoutes);


const MONGO = process.env.MONGO_URI || 'mongodb://localhost:27017/fleetcare';
mongoose.connect(MONGO, { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => console.log('Mongo connected'))
.catch(console.error);


const PORT = process.env.PORT || 4000;
app.listen(4000, () => console.log('Server running on', 4000));

