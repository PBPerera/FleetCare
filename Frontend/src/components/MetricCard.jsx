// src/components/MetricCard.jsx
import React from "react";

export function MetricCard({ title, value, change, icon: Icon, trend }) {
  const trendColor =
    trend === "up"
      ? "text-green-600"
      : trend === "down"
      ? "text-red-500"
      : "text-gray-500";

  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm space-y-1">
      <div className="flex justify-between items-center">
        <span className="text-sm font-medium text-gray-600">{title}</span>
        {Icon && <Icon className="w-5 h-5 text-blue-500" />}
      </div>
      <div className="text-3xl font-bold text-gray-900">{value}</div>
      <div className={`text-sm font-semibold ${trendColor}`}>{change}</div>
    </div>
  );
}

export default MetricCard;
