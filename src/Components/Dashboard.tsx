import React, { useEffect, useRef } from "react";
import data_0 from "../../src/Data/data_0.json";
import data_1 from "../Data/data_1.json";
import DeviceAvailabilityChart from "./DeviceAvilabilityChart";
import deviceData from "../Data/deviceData.json";
import OfflineDevices from "./OfflineDevices";
import DeviceActivityList from "./DeviceActivityList";
import Linechart from "../Components/Linechart";

interface ConnectionStatus {
  connected: string;
  disconnected: string;
  isConnected: boolean;
}

interface Device {
  id: string;
  deviceName: string;
  connectionStatus: ConnectionStatus;
  location: {
    building: string;
    city: string;
    pinCode: string;
  };
}

interface DataItem {
  hour: number;
  data: number;
}

const Dashboard: React.FC = () => {
  useEffect(() => {
    const userDetails = localStorage.getItem("userDetails");
    if (!userDetails) {
      window.location.href = "/";
    }
  }, []);

  const totalData0 = data_0.reduce((sum, entry) => sum + entry.data, 0);
  const totalData1 = data_1.reduce((sum, entry) => sum + entry.data, 0);
  const totalData2 = totalData0 + totalData1;

  const percentageData0 = totalData2 > 0 ? (totalData0 / totalData2) * 100 : 0;
  const percentageData1 = totalData2 > 0 ? (totalData1 / totalData2) * 100 : 0;

  const processData = (hourValue: number): DataItem | undefined => {
    return data_1.find((item) => item.hour === hourValue);
  };
  const updatedDeviceData: Device[] = deviceData.map((entry: any) => {
    const connectedDateTime = new Date(entry.connectionStatus.connected);
    const disconnectedDateTime = new Date(entry.connectionStatus.disconnected);
    const connectedHour =
      connectedDateTime.getHours() - disconnectedDateTime.getHours();

    const time = processData(connectedHour);

    return {
      ...entry,
      time,
    };
  });

  return (
    <div className="p-6">
      <h1 className="text-xl font-medium mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Linechart />

        <DeviceAvailabilityChart deviceData={deviceData} />

        <div className="lg:col-span-2 bg-gray-900 rounded-lg p-4">
          <h2 className="font-medium mb-6">Data Contribution</h2>

          <div className="space-y-6">
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Data 0 </span>
                <span className="text-sm">{percentageData0.toFixed(1)}%</span>
              </div>
              <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-red-500 h-full"
                  style={{ width: `${percentageData0}%` }}
                ></div>
              </div>
            </div>

            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Data 1 </span>
                <span className="text-sm">{percentageData1.toFixed(1)}%</span>
              </div>
              <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-green-500 h-full"
                  style={{ width: `${percentageData1}%` }}
                ></div>
              </div>
            </div>
            <div className="mb-4">
              <div className="flex justify-between mb-1">
                <span className="text-sm">Data 2 </span>
                <span className="text-sm">
                  {(percentageData1 + percentageData0).toFixed(1)}%
                </span>
              </div>
              <div className="bg-gray-700 rounded-full h-4 overflow-hidden">
                <div
                  className="bg-blue-500 h-full"
                  style={{
                    width: `${(percentageData1 + percentageData0).toFixed(1)}%`,
                  }}
                ></div>
              </div>
            </div>
            <div className="flex flex-col gap-2 mt-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-xs">Data 2 = Data 0 + Data 1</span>
              </div>
            </div>
          </div>
        </div>
        <DeviceActivityList updatedDeviceData={updatedDeviceData} />
        <OfflineDevices deviceData={deviceData} />
      </div>
    </div>
  );
};

export default Dashboard;
