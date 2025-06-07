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
import GeneralSettingsSection from './sections/GeneralSettingsSection';
import NotificationsSection from './sections/NotificationsSection';
import UserManagementSection from './sections/UserManagementSection';
import BillingSection from './sections/BillingSection';
import SecuritySection from './sections/SecuritySection';
import BackupSection from './sections/BackupSection';
import LocalizationSection from './sections/LocalizationSection';

type IconType = typeof Cog6ToothIcon;

interface SettingSection {
  id: string;
  title: string;
  icon: IconType;
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

const sectionComponents: Record<string, React.FC> = {
  general: GeneralSettingsSection,
  notifications: NotificationsSection,
  users: UserManagementSection,
  billing: BillingSection,
  security: SecuritySection,
  backup: BackupSection,
  localization: LocalizationSection,
};

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

  const SectionComponent = sectionComponents[activeSection] || (() => null);

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
            <SectionComponent />
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