import React from 'react';
import { UserCircleIcon } from '@heroicons/react/24/outline';

const PersonalInfoSection: React.FC = () => (
  <div className="space-y-6">
    <div>
      <h3 className="text-lg font-medium text-gray-200">Profile Information</h3>
      <div className="mt-4 grid grid-cols-1 gap-4">
        <div className="flex items-center space-x-4">
          <div className="flex-shrink-0">
            <UserCircleIcon className="h-16 w-16 text-gray-400" />
          </div>
          <div>
            <button
              type="button"
              className="px-3 py-2 border border-gray-600 rounded-md text-sm font-medium text-gray-200 bg-[#232B3B] hover:bg-[#181F2A] transition-colors duration-200"
            >
              Change Photo
            </button>
            <p className="mt-1 text-sm text-gray-500">JPG, GIF or PNG. Max size of 2MB.</p>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300">First Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue="John"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300">Last Name</label>
            <input
              type="text"
              className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              defaultValue="Doe"
            />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Email</label>
          <input
            type="email"
            className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue="john.doe@example.com"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Phone Number</label>
          <input
            type="tel"
            className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-200 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
            defaultValue="+1 (555) 123-4567"
          />
        </div>
      </div>
    </div>
    <div>
      <h3 className="text-lg font-medium text-gray-200">Role Information</h3>
      <div className="mt-4 space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-300">Role</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-400 shadow-sm"
            defaultValue="Administrator"
            disabled
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-300">Department</label>
          <input
            type="text"
            className="mt-1 block w-full rounded-md bg-[#232B3B] border-gray-600 text-gray-400 shadow-sm"
            defaultValue="Management"
            disabled
          />
        </div>
      </div>
    </div>
  </div>
);

export default PersonalInfoSection; 