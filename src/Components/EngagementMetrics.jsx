import React from "react";
import deviceData from '../Data/deviceData.json'


const EngagementMetrics = () => {
  const activeDevices = deviceData.filter(
    (device) => device.connectionStatus.connected
  ).length;

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full text-white">
      <h3 className="font-medium mb-6">Engagement Metrics</h3>
      <div className="mb-6">
        <div className="flex justify-between text-sm mb-1">
          <span className="text-green-400">Active Devices</span>
          <span>{activeDevices}</span>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${(activeDevices / deviceData.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default EngagementMetrics;
