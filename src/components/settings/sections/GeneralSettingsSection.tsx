import React from 'react';

const GeneralSettingsSection: React.FC = () => (
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

export default GeneralSettingsSection; 