import React, { useState } from 'react';
import {
  UserCircleIcon,
  KeyIcon,
  BellIcon,
  ShieldCheckIcon,
  DevicePhoneMobileIcon,
} from '@heroicons/react/24/outline';
import PersonalInfoSection from './sections/PersonalInfoSection';
import SecuritySection from './sections/SecuritySection';
import NotificationsSection from './sections/NotificationsSection';
import DevicesSection from './sections/DevicesSection';

type IconType = typeof UserCircleIcon;

interface ProfileSection {
  id: string;
  title: string;
  icon: IconType;
  description: string;
}

const profileSections: ProfileSection[] = [
  {
    id: 'personal',
    title: 'Personal Information',
    icon: UserCircleIcon,
    description: 'Manage your personal details and contact information',
  },
  {
    id: 'security',
    title: 'Security',
    icon: ShieldCheckIcon,
    description: 'Update your password and security settings',
  },
  {
    id: 'notifications',
    title: 'Notifications',
    icon: BellIcon,
    description: 'Configure your notification preferences',
  },
  {
    id: 'devices',
    title: 'Devices',
    icon: DevicePhoneMobileIcon,
    description: 'Manage your connected devices',
  },
];

const sectionComponents: Record<string, React.FC> = {
  personal: PersonalInfoSection,
  security: SecuritySection,
  notifications: NotificationsSection,
  devices: DevicesSection,
};

const ProfilePage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('personal');
  const SectionComponent = sectionComponents[activeSection] || (() => null);

  return (
    <div className="p-6 bg-[#181F2A] min-h-screen">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-100">Profile Settings</h1>
        <p className="mt-1 text-sm text-gray-400">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <nav className="space-y-1">
            {profileSections.map((section) => (
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

export default ProfilePage; 