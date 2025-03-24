import { ArrowDown, Download } from "lucide-react";
import { PieChart, Pie, Cell, Tooltip, CellProps } from "recharts";
import { useRef } from "react";
import html2canvas from "html2canvas";

interface ConnectionStatus {
  isConnected: boolean;
}

interface Device {
  connectionStatus: ConnectionStatus;
}

interface DeviceAvailabilityData {
  name: string;
  value: number;
  percentage: string;
  count: number;
}

interface DeviceAvailabilityChartProps {
  deviceData: Device[];
}

const DeviceAvailabilityChart: React.FC<DeviceAvailabilityChartProps> = ({ deviceData }) => {
  const processData = (data: Device[]): DeviceAvailabilityData[] => {
    const onlineCount = data.filter((device) => device.connectionStatus.isConnected).length;
    const offlineCount = data.filter((device) => !device.connectionStatus.isConnected).length;
    
    const totalDevices = onlineCount + offlineCount;
        const onlinePercentage = ((onlineCount / totalDevices) * 100).toFixed(1);
    const offlinePercentage = ((offlineCount / totalDevices) * 100).toFixed(1);
      
    return [
      { name: "Online", value: onlineCount, percentage: onlinePercentage, count: onlineCount },
      { name: "Offline", value: offlineCount, percentage: offlinePercentage, count: offlineCount },
    ];
  };

  const COLORS = ["#22C55E", "#EF4444"]; 
  const chartData = processData(deviceData);
  const chartRef = useRef<HTMLDivElement>(null);

  const downloadChart = async () => {
    if (chartRef.current) {
      const canvas = await html2canvas(chartRef.current);
      const link = document.createElement("a");
      link.href = canvas.toDataURL("image/png");
      link.download = "traffic-metrics-chart.png";
      link.click();
    }
  };

  const CustomTooltip = ({ active, payload }: { active?: boolean, payload?: any[] }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-gray-800 p-2 border border-gray-700 rounded shadow-lg">
          <p className="text-sm text-white">{`${data.name}: ${data.percentage}%`}</p>
          <p className="text-xs text-gray-300">{`${data.count} device(s)`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-gray-900 rounded-lg p-4 relative">
      <div className="flex justify-between items-center mb-6">
        <h2 className="font-medium text-white">Device Availability</h2>
        <ArrowDown size={18} className="text-white" />
      </div>
      <div className="flex justify-center items-center h-48" ref={chartRef}>
        <PieChart width={160} height={160}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={45}
            outerRadius={70}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
            label={({ name, percentage }) => `${name}: ${percentage}%`}
            labelLine={false}
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </div>
      <button onClick={downloadChart} className="text-white hover:text-gray-400 absolute top-4 right-20">
        <Download size={20} />
      </button>
      <div className="flex justify-center gap-4 mt-4">
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
          <span className="text-sm text-white">Online ({chartData[0].percentage}%)</span>
        </div>
        <div className="flex items-center">
          <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
          <span className="text-sm text-white">Offline ({chartData[1].percentage}%)</span>
        </div>
      </div>
      <div className="flex justify-center mt-2">
        <p className="text-xs text-gray-400">
          Total Online: {chartData[0].count} devices | Total Offline: {chartData[1].count} devices
        </p>
      </div>
    </div>
  );
};

export default DeviceAvailabilityChart;
