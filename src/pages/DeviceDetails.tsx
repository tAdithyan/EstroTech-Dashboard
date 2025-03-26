
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';
import { useNavigate, useParams } from 'react-router-dom';
import deviceData from '../Data/deviceData.json';
import EngagementMetrics from '../Components/EngagementDataDashboard';
import UptimeMetrics from '../Components/UptimeMetrics';
import { ChevronLeft } from 'lucide-react';
import Linechart from '../Components/Linechart';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const DeviceMonitoringDashboard = () => {
  const { id } = useParams();
  console.log(id)


  const deviceDetails = deviceData
    .filter((item) => item.id === Number(id))
    .map((item) => ({
      ...item,
      User: item["User "], 
    }));
  console.log(deviceDetails);
  
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-900 text-gray-200 p-6">
      <div className='flex gap-4 flex-col'>
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-400 hover:text-gray-200">
          <ChevronLeft className="w-5 h-5" />
          <span className="ml-2">Back</span>
        </button>
      <div className="flex items-center text-sm mb-6 text-gray-400">

        <span>Devices</span>
        <span className="mx-2">&gt;</span>
        <span className="text-gray-200">{deviceDetails[0].deviceName}</span>
      </div>
      </div>
   
          <div className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-4">
          <div>
            <div className="text-gray-400 text-sm mb-1">Name</div>
            <div className="font-medium">{deviceDetails[0].deviceName}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Status</div>
            <div className="flex items-center">
              <span className={`${deviceDetails[0].connectionStatus.disconnected ? 'bg-red-500' : 'bg-green-500'} text-xs text-white px-2 py-0.5 rounded mr-2`}>{deviceDetails[0].connectionStatus.disconnected ? 'Disconnected' : 'Connected'}</span>
           
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">USB</div>
            <div className="flex items-center">
              <span className="bg-green-500 text-xs text-white px-2 py-0.5 rounded">Connected</span>
            </div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Store</div>
            <div className="font-medium">{deviceDetails[0].location.building}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">FMCG</div>
            <div className="font-medium">FMCG Name</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">User</div>
            <div className="font-medium">{deviceDetails[0]['User ']}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Location</div>
            <div className="font-medium">{deviceDetails[0].location.city},{deviceDetails[0].location.district},{deviceDetails[0].location.country}</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <div className="text-gray-400 text-sm mb-1">Battery Temperature</div>
            <div className="font-medium">{deviceDetails[0].hw_data.battery.temperature}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Battery</div>
            <div className="font-medium">{deviceDetails[0].hw_data.battery.percentage}</div>
          </div>
          <div>
            <div className="text-gray-400 text-sm mb-1">Network</div>
            <div className="font-medium flex items-center">
              signalStrength:
       
                          <div className="font-medium">{deviceDetails[0].hw_data.sim.signalStrength}</div>

            </div>
          </div>
        </div>
      </div>
      
      <div className="mb-4">
        <div className="border-b border-gray-700">
          <button className="text-blue-400 border-b-2 border-blue-400 px-4 py-2 font-medium text-sm">
            Analytics
          </button>
        </div>
      </div>
      
      <div className="flex justify-end mb-4">
        <div className="inline-flex items-center bg-gray-800 px-3 py-1 rounded text-sm">
          <svg className="mr-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Tue,04 Mar 2025
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      
        <div className='lg:col-span-2'>
                          <Linechart />

        </div>
        <EngagementMetrics deviceData={deviceData}/>
        
      </div>
      <UptimeMetrics deviceData={deviceDetails}/>
    </div>
  );
};

export default DeviceMonitoringDashboard;