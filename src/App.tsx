import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Dashboard from './components/dashboard/Dashboard';
import PackagesPage from './components/packages/PackagesPage';
import MembersPage from './components/members/MembersPage';
import AttendancePage from './components/attendance/AttendancePage';
import BillingPage from './components/billing/BillingPage';
import LogsPage from './components/logs/LogsPage';
import BranchesPage from './components/branches/BranchesPage';
import SettingsPage from './components/settings/SettingsPage';
import SubscriptionsPage from './components/subscriptions/SubscriptionsPage';
import ProfilePage from './components/profile/ProfilePage';
import './App.css';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="packages" element={<PackagesPage />} />
          <Route path="members" element={<MembersPage />} />
          <Route path="attendance" element={<AttendancePage />} />
          <Route path="billing" element={<BillingPage />} />
          <Route path="logs" element={<LogsPage />} />
          <Route path="branches" element={<BranchesPage />} />
          <Route path="settings" element={<SettingsPage />} />
          <Route path="subscriptions" element={<SubscriptionsPage />} />
          <Route path="profile" element={<ProfilePage />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
