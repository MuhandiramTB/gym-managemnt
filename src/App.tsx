import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import './App.css';

// Placeholder components for other routes
const Packages: React.FC = () => <div>Packages Management</div>;
const Members: React.FC = () => <div>Members Management</div>;
const Attendance: React.FC = () => <div>Attendance Tracking</div>;
const Billing: React.FC = () => <div>Billing Management</div>;
const Logs: React.FC = () => <div>Activity Logs</div>;
const Branches: React.FC = () => <div>Branches Overview</div>;
const Settings: React.FC = () => <div>Settings</div>;

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="packages" element={<Packages />} />
          <Route path="members" element={<Members />} />
          <Route path="attendance" element={<Attendance />} />
          <Route path="billing" element={<Billing />} />
          <Route path="logs" element={<Logs />} />
          <Route path="branches" element={<Branches />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
