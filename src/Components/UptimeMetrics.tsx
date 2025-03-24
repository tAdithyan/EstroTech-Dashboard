import { useState } from "react";

interface DeviceData {
  id: number;
  deviceName: string;
  User: string;
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
    disconnected: string | null;
    isConnected: boolean;
    lastUpdated: string;
  };
  hw_data: {
    battery: {
      timestamp: string;
      percentage: string;
      temperature: string;
    };
    sim: {
      signalStrength: string;
      operator: string;
      networkBand: string;
      connectedAt: string;
    };
  };
}

interface UptimeMetricsProps {
  deviceData: DeviceData[];
}

const UptimeMetrics: React.FC<UptimeMetricsProps> = ({ deviceData }) => {
  const [tooltip, setTooltip] = useState<{
    show: boolean;
    status: string;
    duration: string;
    batteryPercentage: string;
    signalStrength: string;
    x: number;
    y: number;
  }>({
    show: false,
    status: "",
    duration: "",
    batteryPercentage: "",
    signalStrength: "",
    x: 0,
    y: 0,
  });

  const calculateDuration = (start: string | null, end: string | null) => {
    if (!start) return "N/A";
    
    const endTime = end ? new Date(end) : new Date();
    const startTime = new Date(start);
    const diff = endTime.getTime() - startTime.getTime();
    
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    
    if (days > 0) {
      return `${days}d ${hours}h ${minutes}m`;
    }
    return `${hours}h ${minutes}m`;
  };

  const handleHover = (
    event: React.MouseEvent,
    device: DeviceData
  ) => {
    const status = device.connectionStatus.isConnected ? "Online" : "Offline";
    const duration = calculateDuration(
      device.connectionStatus.connected,
      device.connectionStatus.disconnected
    );
    
    setTooltip({
      show: true,
      status,
      duration,
      batteryPercentage: device.hw_data.battery.percentage,
      signalStrength: device.hw_data.sim.signalStrength,
      x: event.clientX,
      y: event.clientY,
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ 
      show: false, 
      status: "", 
      duration: "", 
      batteryPercentage: "",
      signalStrength: "",
      x: 0, 
      y: 0 
    });
  };

  return (
    <div className="mt-4 relative">
      <div className="bg-gray-800 rounded-lg p-4">
        <div className="flex items-center mb-4">
          <h3 className="font-medium mr-6 text-white">Uptime</h3>
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
            <span className="text-xs text-white">Online</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
            <span className="text-xs text-white">Offline</span>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {deviceData.map((device: DeviceData) => (
            <div key={device.id} className="flex items-center">
              <span className="text-white text-sm w-32 truncate">{device.deviceName}</span>
              <div className="flex-grow h-6 bg-gray-700 rounded overflow-hidden">
                <div
                  className={`h-full ${device.connectionStatus.isConnected ? "bg-green-500" : "bg-red-500"}`}
                  style={{ width: "100%" }}
                  onMouseMove={(event) => handleHover(event, device)}
                  onMouseLeave={handleMouseLeave}
                ></div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-between text-xs text-gray-400 mt-2">
          {Array.from({ length: 24 }, (_, i) => (
            <div key={i}>{i}</div>
          ))}
        </div>
      </div>
      {tooltip.show && (
        <div
          className="absolute bg-black text-white text-xs p-2 rounded shadow-lg z-10"
          style={{ 
            top: `${tooltip.y}px`, 
            left: `${tooltip.x}px`,
            transform: 'translate(-50%, 10px)'
          }}
        >
          <p className="font-bold">{tooltip.status}</p>
          <p>Duration: {tooltip.duration}</p>
          <p>Battery: {tooltip.batteryPercentage}</p>
          <p>Signal: {tooltip.signalStrength}</p>
        </div>
      )}
    </div>
  );
};

export default UptimeMetrics;