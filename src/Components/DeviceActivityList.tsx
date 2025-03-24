import { useState } from "react";
import {  Filter } from "lucide-react";
import { Link } from "react-router-dom";

interface Device {
  id: string;
  deviceName: string;
  time?: {
    data: number;
  };
  location: {
    building: string;
    city: string;
    pinCode: string;
  };
}

interface DeviceActivityListProps {
  updatedDeviceData: Device[];
}

const DeviceActivityList = ({ updatedDeviceData }: DeviceActivityListProps) => {
  const [sortOrder, setSortOrder] = useState("desc"); 
  const sortedDevices = [...updatedDeviceData].sort((a, b) => {
    const dataA = a.time?.data || 0;
    const dataB = b.time?.data || 0;
    return sortOrder === "asc" ? dataA - dataB : dataB - dataA;
  });

  const handleFilter = () => {
    setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    console.log("Sorting Order:", sortOrder);
    console.log("Sorted Devices:", sortedDevices);
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-white">Device Activity</h2>
        <div className="flex gap-3">
          <button onClick={handleFilter} className="text-white">
            <Filter size={18} />
          </button>
        </div>
      </div>

      {sortedDevices.map((device) => (
        <Link
          to={`/Devices/${device.id}`}
          key={device.id}
          className="mb-4 last:mb-0 block p-3 rounded-lg hover:bg-gray-800 transition"
        >
          <div className="flex justify-between mb-1">
            <span className="font-medium text-white">{device.deviceName}</span>
            <span className="text-gray-400">{device.time?.data}</span>
          </div>
          <div className="text-xs text-gray-400 flex flex-col gap-0.5">
            <div>Store: {device.location.building}</div>
            <div>City: {device.location.city}</div>
            <div>PoC: {device.location.pinCode}</div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default DeviceActivityList;
