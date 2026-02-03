import React, { useState } from 'react';
import { addVehicle } from '../api';

export default function AddVehicle() {
  const [vehicle, setVehicle] = useState({
    vehicleId: '',
    vehicleType: '',
    chassisNo: '',
    engineNo: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addVehicle(vehicle);
      alert('Vehicle added successfully!');
      setVehicle({ vehicleId: '', vehicleType: '', chassisNo: '', engineNo: '' });
    } catch (error) {
      alert('Error adding vehicle: ' + error.response?.data?.message);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Vehicle ID"
        value={vehicle.vehicleId}
        onChange={(e) => setVehicle({...vehicle, vehicleId: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Vehicle Type"
        value={vehicle.vehicleType}
        onChange={(e) => setVehicle({...vehicle, vehicleType: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Chassis No"
        value={vehicle.chassisNo}
        onChange={(e) => setVehicle({...vehicle, chassisNo: e.target.value})}
        required
      />
      <input
        type="text"
        placeholder="Engine No"
        value={vehicle.engineNo}
        onChange={(e) => setVehicle({...vehicle, engineNo: e.target.value})}
        required
      />
      <button type="submit">Add Vehicle</button>
    </form>
  );
}