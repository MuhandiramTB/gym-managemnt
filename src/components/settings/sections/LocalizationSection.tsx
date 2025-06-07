import React from 'react';

const LocalizationSection: React.FC = () => (
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

export default LocalizationSection; 