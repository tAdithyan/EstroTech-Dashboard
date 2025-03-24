import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './Components/Dashboard';
import Layout from './Layout';
import DevicePage from './pages/DevicePage';
import DeviceDetails from './pages/DeviceDetails';
import Login from './pages/Login';
import { User } from 'lucide-react';
import UserDetails from './pages/UserDetails';

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      
      {/* Wrap protected routes with Layout */}
      <Route element={<Layout />}>
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Devices" element={<DevicePage />} />
        <Route path="/Devices/:id" element={<DeviceDetails />} />
        <Route path="/UserDetails" element={<UserDetails />} />

      </Route>
    </Routes>
  );
};

export default App;
