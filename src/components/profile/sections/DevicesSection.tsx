import React from 'react';
import { DevicePhoneMobileIcon } from '@heroicons/react/24/outline';

const DevicesSection: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium text-gray-200 flex items-center gap-2"><DevicePhoneMobileIcon className="h-5 w-5 text-indigo-400" /> Active Sessions</h3>
      <div className="mt-4 space-y-4">
        <div className="flex items-center justify-between p-4 bg-[#232B3B] rounded-lg">
          <div className="flex items-center space-x-3">
            <DevicePhoneMobileIcon className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-200">Windows PC</p>
              <p className="text-sm text-gray-400">Chrome on Windows • Active now</p>
            </div>
          </div>
          <button
            type="button"
            className="text-sm text-red-400 hover:text-red-600 transition-colors duration-200"
          >
            Sign out
          </button>
        </div>
        <div className="flex items-center justify-between p-4 bg-[#232B3B] rounded-lg">
          <div className="flex items-center space-x-3">
            <DevicePhoneMobileIcon className="h-6 w-6 text-gray-400" />
            <div>
              <p className="text-sm font-medium text-gray-200">iPhone 12</p>
              <p className="text-sm text-gray-400">Safari on iOS • Last active 2 hours ago</p>
            </div>
          </div>
          <button
            type="button"
            className="text-sm text-red-400 hover:text-red-600 transition-colors duration-200"
          >
            Sign out
          </button>
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-200 flex items-center gap-2"><DevicePhoneMobileIcon className="h-5 w-5 text-indigo-400" /> Device Management</h3>
      <div className="mt-4 space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
            defaultChecked
          />
          <label className="ml-2 block text-sm text-gray-300">
            Require approval for new devices
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
            defaultChecked
          />
          <label className="ml-2 block text-sm text-gray-300">
            Notify on new device login
          </label>
        </div>
      </div>
    </div>
  </div>
);

export default DevicesSection; 