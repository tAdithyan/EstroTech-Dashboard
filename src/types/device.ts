// src/types/device.ts
export interface DeviceLocation {
    building: string;
    city: string;
    district?: string;
    state?: string;
    country?: string;
    pinCode: string;
  }
  
  export interface DeviceConnectionStatus {
    isConnected: boolean;
    connected: string;
    disconnected: string | null;
    lastUpdated: string;
  }
  
  export interface DeviceHwData {
    sim: {
      signalStrength: string;
      operator: string;
    };
    battery: {
      percentage: number;
    };
  }
  
  export interface Device {
    id: string ;
    deviceName: string;
    "User "?: string;
    connectionStatus: DeviceConnectionStatus;
    location: DeviceLocation;
    hw_data: DeviceHwData;
    time?: { hour: number; data: number } | undefined;
  }