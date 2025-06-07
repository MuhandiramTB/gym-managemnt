import React from 'react';

const NotificationsSection: React.FC = () => (
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

export default NotificationsSection; 