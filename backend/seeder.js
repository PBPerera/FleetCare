import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Service from './models/Service.js';
import Repair from './models/Repair.js';

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/fleetcare';

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const services = [
  {
    maintenanceId: 'M0001',
    vehicleId: 'VH001',
    driverName: 'John Doe',
    description: 'Regular oil change and filter replacement',
    companyName: 'ABC Auto Services',
    date: new Date('2024-01-15'),
    shiftDate: new Date('2024-01-16'),
    completeDate: new Date('2024-01-16'),
    cost: 150.00,
    status: 'Completed'
  },
  {
    maintenanceId: 'M0002',
    vehicleId: 'VH002',
    driverName: 'Jane Smith',
    description: 'Brake pad replacement',
    companyName: 'XYZ Auto Works',
    date: new Date('2024-01-20'),
    shiftDate: new Date('2024-01-22'),
    completeDate: null,
    cost: 300.00,
    status: 'In Progress'
  },
  {
    maintenanceId: 'M0003',
    vehicleId: 'VH003',
    driverName: 'Mike Johnson',
    description: 'Tire rotation and alignment',
    companyName: 'ABC Auto Services',
    date: new Date('2024-02-01'),
    shiftDate: new Date('2024-02-02'),
    completeDate: null,
    cost: 200.00,
    status: 'Scheduled'
  }
];

const repairs = [
  {
    maintenanceId: 'R0001',
    vehicleId: 'VH001',
    driverName: 'John Doe',
    description: 'Engine overheating issue - needs radiator repair',
    companyName: 'Premium Auto Repair',
    requestDate: new Date('2024-01-18'),
    shiftDate: null,
    completeDate: null,
    cost: 0,
    status: 'Pending',
    priority: 'High',
    developmentOfficer: 'Sarah Williams',
    engineer: '',
    procurementStage1: 'Pending',
    tenderCall: '',
    procurementStage2: ''
  },
  {
    maintenanceId: 'R0002',
    vehicleId: 'VH004',
    driverName: 'Robert Brown',
    description: 'Transmission failure - complete replacement needed',
    companyName: 'Elite Auto Repairs',
    requestDate: new Date('2024-01-25'),
    shiftDate: new Date('2024-02-05'),
    completeDate: null,
    cost: 2500.00,
    status: 'Approved',
    priority: 'Critical',
    developmentOfficer: 'David Lee',
    engineer: 'Mark Wilson',
    engineerDate: new Date('2024-01-26'),
    procurementStage1: 'Approved',
    tenderCall: 'Completed',
    procurementStage2: 'Approved'
  },
  {
    maintenanceId: 'R0003',
    vehicleId: 'VH002',
    driverName: 'Jane Smith',
    description: 'AC system not working',
    companyName: 'Cool Auto Services',
    requestDate: new Date('2024-01-28'),
    shiftDate: null,
    completeDate: null,
    cost: 0,
    status: 'Pending',
    priority: 'Medium',
    developmentOfficer: '',
    engineer: '',
    procurementStage1: '',
    tenderCall: '',
    procurementStage2: ''
  }
];

const importData = async () => {
  try {
    await Service.deleteMany();
    await Repair.deleteMany();

    await Service.insertMany(services);
    await Repair.insertMany(repairs);

    console.log('✅ Data imported successfully');
    console.log('📊 Sample Services:', services.length);
    console.log('🔧 Sample Repairs:', repairs.length);
    
    process.exit();
  } catch (error) {
    console.error('❌ Error importing data:', error);
    process.exit(1);
  }
};

const deleteData = async () => {
  try {
    await Service.deleteMany();
    await Repair.deleteMany();

    console.log('✅ Data deleted successfully');
    process.exit();
  } catch (error) {
    console.error('❌ Error deleting data:', error);
    process.exit(1);
  }
};

if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
} else {
  console.log('Please use: node seeder.js -i (import) or node seeder.js -d (delete)');
  process.exit();
}