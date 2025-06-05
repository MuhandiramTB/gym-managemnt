import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Log } from './LogsPage';

interface LogDetailsModalProps {
  isOpen: boolean;
  onClose: () => void;
  log: Log | null;
}

const LogDetailsModal: React.FC<LogDetailsModalProps> = ({
  isOpen,
  onClose,
  log,
}) => {
  if (!isOpen || !log) return null;

  const renderDetails = (details: Record<string, any>) => {
    return Object.entries(details).map(([key, value]) => (
      <div key={key} className="py-2 border-b last:border-b-0">
        <dt className="text-sm font-medium text-gray-500 capitalize">
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </dt>
        <dd className="mt-1 text-sm text-gray-900">
          {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
        </dd>
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Log Details</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-500">Action</h3>
              <p className="mt-1 text-sm text-gray-900">{log.action}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Type</h3>
              <p className="mt-1 text-sm text-gray-900 capitalize">{log.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">User</h3>
              <p className="mt-1 text-sm text-gray-900">{log.user}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-500">Timestamp</h3>
              <p className="mt-1 text-sm text-gray-900">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-500">Description</h3>
            <p className="mt-1 text-sm text-gray-900">{log.description}</p>
          </div>

          {log.details && (
            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Additional Details</h3>
              <dl className="bg-gray-50 rounded-lg p-4">
                {renderDetails(log.details)}
              </dl>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogDetailsModal; 