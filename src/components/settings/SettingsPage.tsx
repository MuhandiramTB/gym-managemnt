import React, { useState, useEffect } from 'react';
import {
  Cog6ToothIcon,
  BellIcon,
  UserGroupIcon,
  CreditCardIcon,
  ShieldCheckIcon,
  CloudArrowUpIcon,
  GlobeAltIcon,
  ClockIcon,
  CalendarIcon,
} from '@heroicons/react/24/outline';

interface SettingSection {
  id: string;
  title: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  description: string;
}

const settingSections: SettingSection[] = [
  {
    id: 'general',
    title: 'General Settings',
    icon: Cog6ToothIcon,
    description: 'Basic system configuration and preferences',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: BellIcon,
    description: 'Configure notification preferences and alerts',
  },
  {
    id: 'users',
    title: 'User Management',
    icon: UserGroupIcon,
    description: 'Manage user roles and permissions',
  },
  {
    id: 'billing',
    title: 'Billing',
    icon: CreditCardIcon,
    description: 'Payment and subscription settings',
  },
  {
    id: 'security',
    title: 'Security',
    icon: ShieldCheckIcon,
    description: 'Security and privacy settings',
  },
  {
    id: 'backup',
    title: 'Backup & Restore',
    icon: CloudArrowUpIcon,
    description: 'System backup and data recovery',
  },
  {
    id: 'localization',
    title: 'Localization',
    icon: GlobeAltIcon,
    description: 'Language and regional settings',
  },
];

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState('general');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-200">System Settings</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Gym Name</label>
                  <input
                    type="text"
                    className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue="Fitness Pro Gym"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Contact Email</label>
                  <input
                    type="email"
                    className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue="contact@fitnesspro.com"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Enable maintenance mode
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-200">Email Notifications</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Send email notifications for new members
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Send payment reminders
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'users':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-200">User Roles</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Default Role</label>
                  <select className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>Admin</option>
                    <option>Manager</option>
                    <option>Staff</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Allow role-based access control
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'billing':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-200">Payment Settings</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Default Currency</label>
                  <select className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>USD</option>
                    <option>EUR</option>
                    <option>GBP</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Enable automatic billing
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-200">Tax Settings</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Tax Rate (%)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue="20"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Include tax in displayed prices
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'security':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-200">Password Policy</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Minimum Password Length</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue="8"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Require special characters
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Require numbers
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-200">Session Settings</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Session Timeout (minutes)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue="30"
                  />
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Enable session activity logging
                  </label>
                </div>
              </div>
            </div>
          </div>
        );

      case 'backup':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-200">Backup Schedule</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Backup Frequency</label>
                  <select className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>Daily</option>
                    <option>Weekly</option>
                    <option>Monthly</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Backup Time</label>
                  <input
                    type="time"
                    className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue="02:00"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-200">Backup Storage</h3>
              <div className="mt-4 space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Enable cloud backup
                  </label>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Retention Period (days)</label>
                  <input
                    type="number"
                    className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                    defaultValue="30"
                  />
                </div>
              </div>
            </div>
          </div>
        );

      case 'localization':
        return (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium text-gray-200">Language Settings</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Default Language</label>
                  <select className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                    <option>German</option>
                  </select>
                </div>
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
                    defaultChecked
                  />
                  <label className="ml-2 block text-sm text-gray-300">
                    Allow users to change language
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-lg font-medium text-gray-200">Regional Settings</h3>
              <div className="mt-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300">Time Zone</label>
                  <select className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>UTC</option>
                    <option>EST</option>
                    <option>PST</option>
                    <option>GMT</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300">Date Format</label>
                  <select className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500">
                    <option>MM/DD/YYYY</option>
                    <option>DD/MM/YYYY</option>
                    <option>YYYY-MM-DD</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="p-6 bg-[#181F2A] min-h-screen">
      {/* Date and Time Display */}
      <div className="flex items-center justify-end space-x-4 mb-6 text-gray-300">
        <div className="flex items-center space-x-2">
          <CalendarIcon className="h-5 w-5" />
          <span>{formatDate(currentTime)}</span>
        </div>
        <div className="flex items-center space-x-2">
          <ClockIcon className="h-5 w-5" />
          <span>{formatTime(currentTime)}</span>
        </div>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Settings</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage your gym management system settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <nav className="space-y-1">
            {settingSections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`
                  w-full flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors duration-200
                  ${
                    activeSection === section.id
                      ? 'bg-[#232B3B] text-indigo-400'
                      : 'text-gray-400 hover:bg-[#232B3B] hover:text-gray-200'
                  }
                `}
              >
                <section.icon
                  className={`
                    mr-3 h-5 w-5
                    ${activeSection === section.id ? 'text-indigo-400' : 'text-gray-400'}
                  `}
                />
                {section.title}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="col-span-9">
          <div className="bg-[#232B3B] shadow-lg rounded-lg p-6">
            {renderSectionContent()}
            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                className="px-4 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-300 hover:bg-[#181F2A] transition-colors duration-200"
              >
                Cancel
              </button>
              <button
                type="button"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-colors duration-200"
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage; 