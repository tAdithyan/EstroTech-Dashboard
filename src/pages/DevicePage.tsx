import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import devicedata from '../Data/deviceData.json'

const DevicesPage = () => {
  const [isSort, setIsSort] = useState(false);
  const [sortOrder, setSortOrder] = useState('high-to-low');
  const [searchTerm, setSearchTerm] = useState("");




  const handleSortChange = (order: React.SetStateAction<string>) => {
    setSortOrder(order);
    setIsSort(false);
  };

  const filteredDevices = devicedata.filter(device => {
    const term = searchTerm.toLowerCase();
    
    if (device.deviceName.toLowerCase().includes(term)) return true;
    
    
    return false;
  });

  const sortedDevices = [...filteredDevices].sort((a, b) => {
    const nameCompare = a.deviceName.localeCompare(b.deviceName);
        if (sortOrder === 'high-to-low' || sortOrder === 'low-to-high') {
      const batteryA = parseInt(a.hw_data.battery.percentage.replace('%', ''), 10);
      const batteryB = parseInt(b.hw_data.battery.percentage.replace('%', ''), 10);
      
      if (sortOrder === 'high-to-low') {
        return batteryB - batteryA;
      } else {
        return batteryA - batteryB; 
      }
    }
    
    return nameCompare;
  });

  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="flex-1 p-4">
        <header className="p-4 flex gap-[30rem] items-center">
          <h1 className="text-xl font-medium">Devices</h1>
          <div className="relative flex-1 max-w-md mx-4">
            <input
              type="text"
              placeholder="Search"
              className="w-full bg-gray-900 text-white pl-10 pr-4 py-2 rounded-full border border-gray-700 focus:outline-none focus:border-gray-600"
              onChange={(e) => setSearchTerm(e.target.value)}
              value={searchTerm}
            />
            <Search className="absolute left-3 top-3 text-gray-400" size={18} />
            <button className='filter' onClick={() => setIsSort(!isSort)}>
              <svg width="13" className='absolute right-3 top-4' height="12" viewBox="0 0 13 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1_579" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="13" height="12">
                  <rect x="0.5" width="12" height="12" fill="#D9D9D9"/>
                </mask>
                <g mask="url(#mask0_1_579)">
                  <path d="M6.21025 10.5C6.10342 10.5 6.01458 10.464 5.94375 10.3921C5.87292 10.3203 5.8375 10.2312 5.8375 10.125V8.0625C5.8375 7.95625 5.87367 7.86717 5.946 7.79525C6.01825 7.72342 6.10783 7.6875 6.21475 7.6875C6.32158 7.6875 6.41042 7.72342 6.48125 7.79525C6.55208 7.86717 6.5875 7.95625 6.5875 8.0625V8.725H10.625C10.7312 8.725 10.8203 8.76117 10.8923 8.8335C10.9641 8.90575 11 8.99533 11 9.10225C11 9.20908 10.9641 9.29792 10.8923 9.36875C10.8203 9.43958 10.7312 9.475 10.625 9.475H6.5875V10.125C6.5875 10.2312 6.55133 10.3203 6.479 10.3921C6.40675 10.464 6.31717 10.5 6.21025 10.5ZM2.375 9.475C2.26875 9.475 2.17971 9.43883 2.10788 9.3665C2.03596 9.29425 2 9.20467 2 9.09775C2 8.99092 2.03596 8.90208 2.10788 8.83125C2.17971 8.76042 2.26875 8.725 2.375 8.725H4.7125C4.81875 8.725 4.90783 8.76117 4.97975 8.8335C5.05158 8.90575 5.0875 8.99533 5.0875 9.10225C5.0875 9.20908 5.05158 9.29792 4.97975 9.36875C4.90783 9.43958 4.81875 9.475 4.7125 9.475H2.375ZM4.71025 7.4C4.60342 7.4 4.51458 7.36404 4.44375 7.29213C4.37292 7.22029 4.3375 7.13125 4.3375 7.025V6.375H2.375C2.26875 6.375 2.17971 6.33883 2.10788 6.2665C2.03596 6.19425 2 6.10467 2 5.99775C2 5.89092 2.03596 5.80208 2.10788 5.73125C2.17971 5.66042 2.26875 5.625 2.375 5.625H4.3375V4.95C4.3375 4.84375 4.37367 4.75467 4.446 4.68275C4.51825 4.61092 4.60783 4.575 4.71475 4.575C4.82158 4.575 4.91042 4.61092 4.98125 4.68275C5.05208 4.75467 5.0875 4.84375 5.0875 4.95V7.025C5.0875 7.13125 5.05133 7.22029 4.979 7.29213C4.90675 7.36404 4.81717 7.4 4.71025 7.4ZM6.2125 6.375C6.10625 6.375 6.01721 6.33883 5.94538 6.2665C5.87346 6.19425 5.8375 6.10467 5.8375 5.99775C5.8375 5.89092 5.87346 5.80208 5.94538 5.73125C6.01721 5.66042 6.10625 5.625 6.2125 5.625H10.625C10.7312 5.625 10.8203 5.66117 10.8923 5.7335C10.9641 5.80575 11 5.89533 11 6.00225C11 6.10908 10.9641 6.19792 10.8923 6.26875C10.8203 6.33958 10.7312 6.375 10.625 6.375H6.2125ZM8.28525 4.3125C8.17842 4.3125 8.08958 4.27654 8.01875 4.20462C7.94792 4.13279 7.9125 4.04375 7.9125 3.9375V1.875C7.9125 1.76875 7.94867 1.67967 8.021 1.60775C8.09325 1.53592 8.18283 1.5 8.28975 1.5C8.39658 1.5 8.48542 1.53592 8.55625 1.60775C8.62708 1.67967 8.6625 1.76875 8.6625 1.875V2.525H10.625C10.7312 2.525 10.8203 2.56117 10.8923 2.6335C10.9641 2.70575 11 2.79533 11 2.90225C11 3.00908 10.9641 3.09792 10.8923 3.16875C10.8203 3.23958 10.7312 3.275 10.625 3.275H8.6625V3.9375C8.6625 4.04375 8.62633 4.13279 8.554 4.20462C8.48175 4.27654 8.39217 4.3125 8.28525 4.3125ZM2.375 3.275C2.26875 3.275 2.17971 3.23883 2.10788 3.1665C2.03596 3.09425 2 3.00467 2 2.89775C2 2.79092 2.03596 2.70208 2.10788 2.63125C2.17971 2.56042 2.26875 2.525 2.375 2.525H6.7875C6.89375 2.525 6.98283 2.56117 7.05475 2.6335C7.12658 2.70575 7.1625 2.79533 7.1625 2.90225C7.1625 3.00908 7.12658 3.09792 7.05475 3.16875C6.98283 3.23958 6.89375 3.275 6.7875 3.275H2.375Z" fill="#BDBDBD"/>
                </g>
              </svg>
            </button>

            {isSort && (
              <div className="w-fit z-50 absolute right-0">
                <div className="bg-black text-white p-4 rounded-lg">
                  <div className="text-sm font-bold mb-4">Sort</div>
                  <div className="text-sm font-bold mb-2">Battery</div>
                  
                  <div className="flex flex-col space-y-3">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="w-4 h-4 border-2 border-blue-500"
                        checked={sortOrder === 'high-to-low'}
                        onChange={() => handleSortChange('high-to-low')}
                      />
                      <span className={`ml-3 text-sm ${sortOrder === 'high-to-low' ? 'border-2 border-blue-500 rounded-xl px-3 py-1' : ''}`}>
                        High to Low
                      </span>
                    </label>
                    
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        className="w-4 h-4"
                        checked={sortOrder === 'low-to-high'}
                        onChange={() => handleSortChange('low-to-high')}
                      />
                      <span className={`ml-3 text-sm ${sortOrder === 'low-to-high' ? 'border-2 border-blue-500 rounded-xl px-3 py-1' : ''}`}>
                        Low to High
                      </span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        </header>

        <div className="p-6">
          {sortedDevices.length === 0 && (
            <div className="text-center text-gray-400 py-8">
              No devices found matching "{searchTerm}"
            </div>
          )}
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {sortedDevices.map((device) => (
              <Link
                key={device.id}
                className="bg-gray-900 rounded-lg border border-gray-800 overflow-hidden"
                to={`/Devices/${device.id}`}
              >
                <div className="p-4">
                  <div className="flex justify-between items-center mb-3">
                    <h3 className="font-medium">{device.deviceName}</h3>
                    <div className="flex space-x-2">
                      <button className="text-gray-400 hover:text-white flex">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_4_29"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="18"
                            height="18"
                          >
                            <rect width="18" height="18" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_4_29)">
                            <path
                              d="M6.37524 8.77512H11.6252V3.82512H6.37524V8.77512ZM5.81274 16.5001C5.65337 16.5001 5.51981 16.4462 5.41206 16.3383C5.30418 16.2306 5.25024 16.097 5.25024 15.9376V3.26262C5.25024 3.10325 5.30418 2.96962 5.41206 2.86175C5.51981 2.754 5.65337 2.70012 5.81274 2.70012H7.50024V2.06262C7.50024 1.90325 7.55418 1.76962 7.66206 1.66175C7.76981 1.554 7.90337 1.50012 8.06274 1.50012H9.93774C10.0971 1.50012 10.2307 1.554 10.3386 1.66175C10.4464 1.76962 10.5002 1.90325 10.5002 2.06262V2.70012H12.1877C12.3471 2.70012 12.4807 2.754 12.5886 2.86175C12.6964 2.96962 12.7502 3.10325 12.7502 3.26262V15.9376C12.7502 16.097 12.6964 16.2306 12.5886 16.3383C12.4807 16.4462 12.3471 16.5001 12.1877 16.5001H5.81274Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                        {device.hw_data.battery.percentage}
                      </button>
                      <button className="text-gray-400 hover:text-white flex">
                        <svg
                          width="18"
                          height="18"
                          viewBox="0 0 18 18"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <mask
                            id="mask0_4_32"
                            style={{ maskType: "alpha" }}
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="18"
                            height="18"
                          >
                            <rect width="18" height="18" fill="#D9D9D9" />
                          </mask>
                          <g mask="url(#mask0_4_32)">
                            <path
                              d="M2.8501 16.5002C2.6751 16.5002 2.5376 16.4408 2.4376 16.322C2.3376 16.2033 2.2876 16.0752 2.2876 15.9377C2.2876 15.8752 2.3001 15.8095 2.3251 15.7408C2.3501 15.672 2.39385 15.6064 2.45635 15.5439L15.5438 2.45641C15.6063 2.39391 15.672 2.35016 15.7407 2.32516C15.8095 2.30016 15.8751 2.28766 15.9376 2.28766C16.0751 2.28766 16.2032 2.33766 16.322 2.43766C16.4407 2.53766 16.5001 2.67516 16.5001 2.85016V15.6564C16.5001 15.8939 16.4188 16.0939 16.2563 16.2564C16.0938 16.4189 15.8938 16.5002 15.6563 16.5002H2.8501ZM11.3626 15.3752H15.3751V4.20016L11.3626 8.21266V15.3752Z"
                              fill="white"
                            />
                          </g>
                        </svg>
                        {device.hw_data.sim.signalStrength}
                      </button>
                    </div>
                  </div>

                  <div className="flex space-x-2 mb-3">
                    <span
                      className={`px-2 py-0.5 text-xs rounded-md ${
                        !device.connectionStatus.isConnected
                          ? "bg-red-900 text-red-400"
                          : "bg-green-900 text-green-400"
                      }`}
                    >
                      {!device.connectionStatus.isConnected ? "Offline" : "Online"}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm text-gray-300">
                    <p>
                      Location: {device.location.city}, {device.location.country},{" "}
                      {device.location.district}, {device.location.pinCode}
                    </p>
                    <p>Store: {device.location.building}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicesPage;