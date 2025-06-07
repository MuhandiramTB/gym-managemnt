import React from 'react';

const BillingSection: React.FC = () => (
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

export default BillingSection; 