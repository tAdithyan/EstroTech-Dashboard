import html2canvas from 'html2canvas';
import { Download } from 'lucide-react'
import { useRef } from 'react'
import {  Line, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, LineChart } from 'recharts';
import data_0 from "../../src/Data/data_0.json";
import data_1 from "../Data/data_1.json";
const Linechart = () => {
  const chartRef = useRef(null);

  const processedData = data_0.map((entry, index) => {
    const data0Value = entry.data;
    const data1Value = data_1[index]?.data ?? 0;
    const data2Value = data0Value + data1Value;
    
    return {
      name: entry.hour,
      "Data 0": data0Value,
      "Data 1": data1Value,
      "Data 2": data2Value,
    };
  });

    const downloadChart = async () => {
        if (chartRef.current) {
          const canvas = await html2canvas(chartRef.current);
          const link = document.createElement("a");
          link.href = canvas.toDataURL("image/png");
          link.download = "traffic-metrics-chart.png";
          link.click();
        }
      };
  return (
    <div className="lg:col-span-3 bg-gray-900 rounded-lg p-4 relative">
    <div className="flex justify-between items-center mb-6">
      <h2 className="font-medium">Daily Trend (Hourly Data)</h2>
      <div className="flex gap-2">
        <button onClick={downloadChart} className="text-white hover:text-gray-400">
          <Download size={20} />
        </button>
      </div>
    </div>

    <div className="flex justify-center gap-4 mb-4">
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
        <span className="text-sm">Data 2 (Total)</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-green-500 mr-2"></div>
        <span className="text-sm">Data 1</span>
      </div>
      <div className="flex items-center">
        <div className="w-2 h-2 rounded-full bg-red-500 mr-2"></div>
        <span className="text-sm">Data 0</span>
      </div>
    </div>

    <div ref={chartRef} className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={processedData}>
          <XAxis dataKey="name" stroke="#6B7280" />
          <YAxis stroke="#6B7280" />
          <Tooltip 
            contentStyle={{ backgroundColor: '#1F2937', border: 'none' }}
            formatter={(value, name) => [`${value}`, name]}
          />
          <Legend />
          <Line 
            type="monotone" 
            dataKey="Data 2" 
            stroke="#3B82F6" 
            strokeWidth={2} 
            dot={false} 
          />
          <Line 
            type="monotone" 
            dataKey="Data 1" 
            stroke="#22C55E" 
            strokeWidth={2} 
            dot={false} 
          />
          <Line 
            type="monotone" 
            dataKey="Data 0" 
            stroke="#EF4444" 
            strokeWidth={2} 
            dot={false} 
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  </div> 
  
)
}

export default Linechart