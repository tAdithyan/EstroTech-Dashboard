import React, { useState } from 'react';
import { Filter } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DeviceLocation {
  building: string;
  city: string;
}

interface DeviceConnectionStatus {
  isConnected: boolean;
  disconnected: string;
  lastUpdated: string;
}

interface DeviceHwData {
  sim: {
    signalStrength: string;
    operator: string;
  };
  battery: {
    percentage: number;
  };
}

interface Device {
  id: string;
  deviceName: string;
  connectionStatus: DeviceConnectionStatus;
  location: DeviceLocation;
  hw_data: DeviceHwData;
}

interface OfflineDevicesProps {
  deviceData: Device[];
}

const OfflineDevices: React.FC<OfflineDevicesProps> = ({ deviceData }) => {
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  const offlineDevices = deviceData.filter(device => !device.connectionStatus.isConnected);

  const processedDevices = offlineDevices.map(device => {
    const disconnectedTime = new Date(device.connectionStatus.disconnected);
    const currentTime = new Date();
    const timeDiffMs = currentTime.getTime() - disconnectedTime.getTime();
        const hours = Math.floor(timeDiffMs / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiffMs % (1000 * 60 * 60)) / (1000 * 60));
    const timeSince = `${hours} hours, ${minutes} minutes ago`;
    
    return {
      ...device,
      lastSeen: device.connectionStatus.disconnected || device.connectionStatus.lastUpdated,
      timeSince,
      store: device.location.building,
      city: device.location.city,
      poc: "Contact information not available", 
      timeOfflineMs: timeDiffMs
    };
  });

  const sortedDevices = [...processedDevices].sort((a, b) => {
    return sortOrder === 'asc' ? a.timeOfflineMs - b.timeOfflineMs : b.timeOfflineMs - a.timeOfflineMs;
  });

  const filterData = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-medium text-white">Offline Devices</h2>
        <button 
          onClick={filterData} 
          className="text-white hover:text-gray-400"
          title={sortOrder === 'desc' ? 'Showing newest offline first' : 'Showing oldest offline first'}
        >
          <Filter size={18} />
        </button>
      </div>

      {sortedDevices.length === 0 ? (
        <div className="text-gray-400 text-sm py-4 text-center">
          No offline devices detected
        </div>
      ) : (
        sortedDevices.map((device) => (
          <Link to={`/Devices/${device.id}`} key={device.id} className="mb-4 last:mb-0 block hover:bg-gray-800 p-2 rounded">
            <div className="flex justify-between mb-1">
              <span className="font-medium text-white">{device.deviceName}</span>
              <span className="text-red-500 text-sm">Offline</span>
            </div>
            <div className="text-xs text-gray-400 flex flex-col gap-0.5">
              <div>Last Seen: {new Date(device.lastSeen).toLocaleString()}</div>
              <div>{device.timeSince}</div>
              <div>Location: {device.location.building}</div>
              <div>City: {device.location.city}</div>
              <div>Signal: {device.hw_data.sim.signalStrength} ({device.hw_data.sim.operator})</div>
              <div>Battery: {device.hw_data.battery.percentage}</div>
            </div>
          </Link>
        ))
      )}
    </div>
  );
};

export default OfflineDevices;
