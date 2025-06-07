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
      <div key={key} className="py-2 border-b border-[#232B3B] last:border-b-0">
        <dt className="text-sm font-medium text-gray-400 capitalize">
          {key.replace(/([A-Z])/g, ' $1').trim()}
        </dt>
        <dd className="mt-1 text-sm text-gray-200">
          {typeof value === 'object' ? JSON.stringify(value) : value.toString()}
        </dd>
      </div>
    ));
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#232B3B] text-gray-200 rounded-xl p-6 w-full max-w-2xl border border-[#232B3B] relative mt-20 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-white">Log Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h3 className="text-sm font-medium text-gray-400">Action</h3>
              <p className="mt-1 text-sm text-gray-200">{log.action}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Type</h3>
              <p className="mt-1 text-sm text-gray-200 capitalize">{log.type}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">User</h3>
              <p className="mt-1 text-sm text-gray-200">{log.user}</p>
            </div>
            <div>
              <h3 className="text-sm font-medium text-gray-400">Timestamp</h3>
              <p className="mt-1 text-sm text-gray-200">
                {new Date(log.timestamp).toLocaleString()}
              </p>
            </div>
          </div>

          <div>
            <h3 className="text-sm font-medium text-gray-400">Description</h3>
            <p className="mt-1 text-sm text-gray-200">{log.description}</p>
          </div>

          {log.details && (
            <div>
              <h3 className="text-sm font-medium text-gray-400 mb-2">Additional Details</h3>
              <dl className="bg-[#181F2A] rounded-lg p-4">
                {renderDetails(log.details)}
              </dl>
            </div>
          )}
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-[#232B3B] hover:bg-[#181F2A] text-gray-200 border-0 shadow-none"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogDetailsModal; 