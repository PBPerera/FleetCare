// src/components/VehicleCard.jsx
import React from "react";

export function VehicleCard({
  name,
  type,
  status,
  location,
  mileage,
  fuelLevel,
  lastService,
}) {
  const statusColor =
    status === "active"
      ? "bg-green-100 text-green-700"
      : "bg-amber-100 text-amber-700";

  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm flex flex-col gap-3">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="font-bold text-gray-900">{name}</h3>
          <p className="text-sm text-gray-500">{type}</p>
        </div>
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColor}`}
        >
          {status === "active" ? "Active" : "Maintenance"}
        </span>
      </div>

      <div className="text-sm text-gray-600 space-y-1">
        <div>📍 {location}</div>
        <div>⛽ Fuel: {fuelLevel}%</div>
        <div>🛠 Last Service: {lastService}</div>
        <div className="font-medium text-gray-900">{mileage}</div>
      </div>

      <div className="flex gap-2 pt-2">
        <button className="flex-1 border rounded-lg py-2 font-semibold hover:bg-gray-50">
          View Details
        </button>
        <button className="flex-1 bg-blue-600 text-white rounded-lg py-2 font-semibold hover:bg-blue-700">
          Schedule Service
        </button>
      </div>
    </div>
  );
}

export default VehicleCard;
