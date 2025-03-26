


interface DeviceData {
  id: number;
  deviceName: string;
  "User ": string;
  location: {
    building: string;
    city: string;
    district: string;
    state: string;
    country: string;
    pinCode: string;
  };
  connectionStatus: {
    connected: string | null;
    disconnected: null | boolean | string;
    isConnected: boolean;
    lastUpdated: string;
  };
  hw_data: {
    battery: {
      temperature: number | string;
      percentage: number | string;
    };
    sim: {
      signalStrength: number | string;
    };
  };
}

const EngagementMetrics = ({deviceData}: { deviceData: DeviceData[] }) => {

  console.log("deviceData",deviceData)
  const activeDevices = deviceData.filter(
    (device) => device.connectionStatus.connected !== null
  ).length;

  const engagementRate = activeDevices * 10;
  const preEngagementRate = activeDevices * 8;
  const totalFootfalls = activeDevices * 20;

  return (
    <div className="bg-gray-800 rounded-lg p-4 h-full text-white shadow-lg">
      <h3 className="font-medium mb-4">Engagement Metrics</h3>

      <div className="flex justify-between text-sm mb-4">
        <span className="text-green-400">Active Devices</span>
        <span>{activeDevices}</span>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Engagement Rate</span>
          <div>
            <span className="text-gray-400 mr-2">{engagementRate}x</span>
            <span>{engagementRate}</span>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-green-500 h-2 rounded-full"
            style={{ width: `${engagementRate}%` }}
          ></div>
        </div>
      </div>

      <div className="mb-4">
        <div className="flex justify-between text-sm mb-1">
          <span>Pre-Engagement Rate</span>
          <div>
            <span className="text-gray-400 mr-2">{preEngagementRate}x</span>
            <span>{preEngagementRate}</span>
          </div>
        </div>
        <div className="w-full bg-gray-700 rounded-full h-2">
          <div
            className="bg-red-500 h-2 rounded-full"
            style={{ width: `${preEngagementRate}%` }}
          ></div>
        </div>
      </div>

      <div>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-blue-400 cursor-pointer hover:underline">
            Total Footfalls
          </span>
          <span>{totalFootfalls}</span>
        </div>
      </div>
    </div>
  );
};

export default EngagementMetrics;
