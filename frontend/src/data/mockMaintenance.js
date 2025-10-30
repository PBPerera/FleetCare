export const mockServices = [
  {
    id: 'S001',
    maintenanceId: 'M0001',
    vehicleId: 'WP-CAR-1990',
    driverName: 'Kamal Silva',
    description: 'Oil Change',
    companyName: 'Jagath Motors',
    shiftDate: '2025-08-20',
    completeDate: '2025-09-23',
    cost: 'Rs.8500',
    status: 'Completed', // Has completeDate, so it's completed
  },
  {
    id: 'S002',
    maintenanceId: 'M0002',
    vehicleId: 'WP-CCR-2135',
    driverName: 'Amila Perera',
    description: 'Brake Service',
    companyName: 'Ajith Service and Repair',
    shiftDate: '2025-08-20',
    completeDate: '2025-09-25',
    cost: 'Rs.11500',
    status: 'Completed', // Has completeDate, so it's completed
  },
  {
    id: 'S003',
    maintenanceId: 'M0003',
    vehicleId: 'WP-SAR-3390',
    driverName: 'Athula Bandara',
    description: 'Engine Diagnostic',
    companyName: 'Jagath Motors',
    shiftDate: '2025-08-20',
    completeDate: '', // No completeDate yet
    cost: 'Rs.25000',
    status: 'Pending', // Not completed yet
  },
  {
    id: 'S004',
    maintenanceId: 'M0004',
    vehicleId: 'WP-GEB-4290',
    driverName: 'Kumara Silva',
    description: 'Preventive Maintenance',
    companyName: 'Ajith Service and Center',
    shiftDate: '2025-08-27',
    completeDate: '', // No completeDate yet
    cost: 'Rs.15500',
    status: 'Pending', // Not completed yet
  },
]

export const mockRepairs = [
  {
    id: 'R001',
    maintenanceId: 'M0001',
    vehicleId: 'WP-CAR-1990',
    driverName: 'Kamal Silva',
    description: 'Oil Change',
    companyName: 'Jagath Motors',
    shiftDate: '2025-08-25',
    completeDate: '2025-09-25',
    cost: 'Rs.8500',
    status: 'Completed', // Approved and has completeDate
    developmentOfficer: '2025-09-27',
    engineer: '2025-09-28',
    procurementStage1: '2025-09-27',
    tenderCall: '2025-09-27',
    procurementStage2: '2025-09-27',
  },
  {
    id: 'R002',
    maintenanceId: 'M0002',
    vehicleId: 'WP-CCR-2135',
    driverName: 'Amila Perera',
    description: 'Brake Service',
    companyName: 'Ajith Service and Repair',
    shiftDate: '2025-08-25',
    completeDate: '2025-09-25',
    cost: 'Rs.11500',
    status: 'Completed', // Approved and has completeDate
    developmentOfficer: '2025-09-27',
    engineer: '2025-09-29',
    procurementStage1: '2025-09-27',
    tenderCall: '2025-09-27',
    procurementStage2: '2025-09-27',
  },
  {
    id: 'R003',
    maintenanceId: 'M0003',
    vehicleId: 'WP-SAR-3390',
    driverName: 'Athula Bandara',
    description: 'Oil Change',
    companyName: 'Jagath Motors',
    shiftDate: '2025-08-26',
    completeDate: '', // No completeDate yet
    cost: 'Rs.25000',
    status: 'Approved', // Approved but not completed yet
    developmentOfficer: '2025-09-27',
    engineer: '2025-09-29',
    procurementStage1: '2025-09-27',
    tenderCall: '2025-09-27',
    procurementStage2: '2025-09-27',
  },
  {
    id: 'R004',
    maintenanceId: 'M0004',
    vehicleId: 'WP-GEB-4290',
    driverName: 'Kumara Silva',
    description: 'Brake Service',
    companyName: 'Jagath Motors',
    shiftDate: '2025-08-27',
    completeDate: '', // No completeDate yet
    cost: 'Rs.15500',
    status: 'Pending', // Still pending approval
    developmentOfficer: '2025-09-27',
    engineer: '2025-09-27',
    procurementStage1: '2025-09-27',
    tenderCall: '2025-09-27',
    procurementStage2: '2025-09-27',
  },
]