const apiUrl = 'http://localhost:5000/api';

async function makeRequest(method, endpoint, body = null) {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }

  const response = await fetch(`${apiUrl}${endpoint}`, options);
  if (!response.ok) {
    throw new Error(`API Error: ${response.status} ${response.statusText}`);
  }
  return response.json();
}

async function testRejectionCascade() {
  try {
    // Step 1: Create a new pending request
    console.log('\n=== Step 1: Creating Test Vehicle Request ===');
    const createResponse = await makeRequest('POST', '/vehicleRequests', {
      requestId: `TEST_${Date.now()}`,
      vehicleId: '316453',
      driverName: 'Driver 2',
      driverContact: '0712345678',
      pickupDestination: 'Test Location',
      tripDate: '2026-05-01',
      tripTime: '14:00',
      purpose: 'Test Rejection Cascade',
      vehicleType: 'Truck',
      noOfPassengers: 2,
    });

    const requestId = createResponse.data._id;
    console.log(`✓ Request created with ID: ${requestId}`);
    console.log(`  Request Status: ${createResponse.data.status}`);

    // Step 2: Check initial vehicle status
    console.log('\n=== Step 2: Checking Initial Vehicle Status ===');
    const vehiclesResponse = await makeRequest('GET', '/vehicle');
    const vehicle = vehiclesResponse.vehicles.find(v => v.vehicle_id === 316453);
    console.log(`✓ Vehicle 316453 Status Before Rejection: ${vehicle.status}`);

    // Step 3: Check initial driver status
    console.log('\n=== Step 3: Checking Initial Driver Status ===');
    const driversResponse = await makeRequest('GET', '/driver');
    const driver = driversResponse.Drivers.find(d => d.name === 'Driver 2');
    console.log(`✓ Driver "Driver 2" Status Before Rejection: ${driver.status}`);

    // Step 4: Reject the request
    console.log('\n=== Step 4: Rejecting Vehicle Request ===');
    const rejectResponse = await makeRequest('PATCH', `/vehicleRequests/${requestId}/status`, {
      status: 'Rejected',
    });
    console.log(`✓ Request rejected successfully`);
    console.log(`  New Request Status: ${rejectResponse.data.status}`);

    // Step 5: Check vehicle status after rejection
    console.log('\n=== Step 5: Checking Vehicle Status After Rejection ===');
    const vehiclesAfter = await makeRequest('GET', '/vehicle');
    const vehicleAfter = vehiclesAfter.vehicles.find(v => v.vehicle_id === 316453);
    console.log(`✓ Vehicle 316453 Status After Rejection: ${vehicleAfter.status}`);

    // Step 6: Check driver status after rejection
    console.log('\n=== Step 6: Checking Driver Status After Rejection ===');
    const driversAfter = await makeRequest('GET', '/driver');
    const driverAfter = driversAfter.Drivers.find(d => d.name === 'Driver 2');
    console.log(`✓ Driver "Driver 2" Status After Rejection: ${driverAfter.status}`);

    // Verification
    console.log('\n=== CASCADE VERIFICATION ===');
    if (vehicleAfter.status === 'Available') {
      console.log('✅ Vehicle status successfully changed to "Available"');
    } else {
      console.log(`❌ Vehicle status NOT changed. Current: ${vehicleAfter.status}`);
    }

    if (driverAfter.status === 'Available') {
      console.log('✅ Driver status successfully changed to "Available"');
    } else {
      console.log(`❌ Driver status NOT changed. Current: ${driverAfter.status}`);
    }
  } catch (error) {
    console.error('Error during test:', error.message);
  }
}

testRejectionCascade();
