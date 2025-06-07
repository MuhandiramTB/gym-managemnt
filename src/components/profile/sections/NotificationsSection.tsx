import React from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

const NotificationsSection: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium text-gray-200 flex items-center gap-2"><BellIcon className="h-5 w-5 text-indigo-400" /> Email Notifications</h3>
      <div className="mt-4 space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
            defaultChecked
          />
          <label className="ml-2 block text-sm text-gray-300">
            System updates and maintenance
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
            defaultChecked
          />
          <label className="ml-2 block text-sm text-gray-300">
            Security alerts
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
          />
          <label className="ml-2 block text-sm text-gray-300">
            Marketing communications
          </label>
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-200 flex items-center gap-2"><BellIcon className="h-5 w-5 text-indigo-400" /> Push Notifications</h3>
      <div className="mt-4 space-y-4">
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
            defaultChecked
          />
          <label className="ml-2 block text-sm text-gray-300">
            New messages
          </label>
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-gray-600 bg-[#232B3B] text-indigo-600 focus:ring-indigo-500"
            defaultChecked
          />
          <label className="ml-2 block text-sm text-gray-300">
            Task assignments
          </label>
        </div>
      </div>
    </div>
  </div>
);

export default NotificationsSection; 