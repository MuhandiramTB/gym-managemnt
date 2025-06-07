import React from 'react';

const BackupSection: React.FC = () => (
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

export default BackupSection; 