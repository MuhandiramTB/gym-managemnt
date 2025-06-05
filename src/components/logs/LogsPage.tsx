import React, { useState } from 'react';
import { format } from 'date-fns';
import { MagnifyingGlassIcon, FunnelIcon } from '@heroicons/react/24/outline';

export type LogType = 'member' | 'payment' | 'attendance' | 'service' | 'system';

export interface Log {
  id: string;
  type: LogType;
  action: string;
  description: string;
  timestamp: Date;
  user: string;
  details?: Record<string, any>;
}

const LogsPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTypes, setSelectedTypes] = useState<LogType[]>([]);
  const [dateRange, setDateRange] = useState<{ start: Date | null; end: Date | null }>({
    start: null,
    end: null,
  });

  // Mock data - replace with actual data from your backend
  const [logs] = useState<Log[]>([
    {
      id: '1',
      type: 'member',
      action: 'Registration',
      description: 'New member registered',
      timestamp: new Date('2024-03-15T10:30:00'),
      user: 'John Smith',
      details: { memberId: 'M123', plan: 'Premium' },
    },
    {
      id: '2',
      type: 'payment',
      action: 'Payment Received',
      description: 'Monthly subscription payment',
      timestamp: new Date('2024-03-15T09:15:00'),
      user: 'Jane Doe',
      details: { amount: 89.99, method: 'Credit Card' },
    },
    {
      id: '3',
      type: 'attendance',
      action: 'Check In',
      description: 'Member checked in',
      timestamp: new Date('2024-03-15T08:45:00'),
      user: 'Mike Johnson',
      details: { checkInTime: '08:45 AM' },
    },
    {
      id: '4',
      type: 'service',
      action: 'Service Update',
      description: 'Updated service pricing',
      timestamp: new Date('2024-03-14T16:20:00'),
      user: 'Admin',
      details: { serviceId: 'S456', oldPrice: 79.99, newPrice: 89.99 },
    },
    {
      id: '5',
      type: 'system',
      action: 'System Update',
      description: 'System maintenance completed',
      timestamp: new Date('2024-03-14T15:00:00'),
      user: 'System',
      details: { version: '1.2.0' },
    },
  ]);

  const getLogTypeColor = (type: LogType) => {
    switch (type) {
      case 'member':
        return 'bg-blue-100 text-blue-800';
      case 'payment':
        return 'bg-green-100 text-green-800';
      case 'attendance':
        return 'bg-purple-100 text-purple-800';
      case 'service':
        return 'bg-yellow-100 text-yellow-800';
      case 'system':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredLogs = logs.filter((log) => {
    const matchesSearch = 
      log.action.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      log.user.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesType = selectedTypes.length === 0 || selectedTypes.includes(log.type);

    const matchesDate = (!dateRange.start || log.timestamp >= dateRange.start) &&
                       (!dateRange.end || log.timestamp <= dateRange.end);

    return matchesSearch && matchesType && matchesDate;
  });

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-4">System Logs</h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 border rounded-lg"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              className="px-4 py-2 border rounded-lg flex items-center gap-2"
              onClick={() => {/* TODO: Implement advanced filters */}}
            >
              <FunnelIcon className="h-5 w-5" />
              Filters
            </button>
          </div>
        </div>

        {/* Log Type Filters */}
        <div className="flex flex-wrap gap-2 mb-6">
          {(['member', 'payment', 'attendance', 'service', 'system'] as LogType[]).map((type) => (
            <button
              key={type}
              onClick={() => {
                setSelectedTypes(prev =>
                  prev.includes(type)
                    ? prev.filter(t => t !== type)
                    : [...prev, type]
                );
              }}
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize ${
                selectedTypes.includes(type)
                  ? getLogTypeColor(type)
                  : 'bg-gray-100 text-gray-600'
              }`}
            >
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(log.timestamp, 'MMM d, yyyy h:mm a')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getLogTypeColor(log.type)}`}>
                      {log.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-500">
                    {log.details && (
                      <button
                        onClick={() => {/* TODO: Implement details modal */}}
                        className="text-blue-600 hover:text-blue-800"
                      >
                        View Details
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default LogsPage; 