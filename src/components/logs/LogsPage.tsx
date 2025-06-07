import React, { useState } from 'react';
import { format } from 'date-fns';
import {
  MagnifyingGlassIcon,
  FunnelIcon,
  UserIcon,
  CurrencyDollarIcon,
  CheckCircleIcon,
  WrenchScrewdriverIcon,
  Cog6ToothIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import LogDetailsModal from './LogDetailsModal';

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

  const logTypeIcon = (type: LogType) => {
    switch (type) {
      case 'member':
        return <UserIcon className="h-5 w-5 text-blue-400" />;
      case 'payment':
        return <CurrencyDollarIcon className="h-5 w-5 text-green-400" />;
      case 'attendance':
        return <CheckCircleIcon className="h-5 w-5 text-purple-400" />;
      case 'service':
        return <WrenchScrewdriverIcon className="h-5 w-5 text-yellow-400" />;
      case 'system':
        return <Cog6ToothIcon className="h-5 w-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const [detailsModal, setDetailsModal] = useState<{ open: boolean; log: Log | null }>({ open: false, log: null });

  return (
    <div className="p-4 md:p-8 bg-[#181F2A] min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-white mb-4 flex items-center gap-2">
          <Cog6ToothIcon className="h-7 w-7 text-indigo-500" /> System Logs
        </h1>
        
        {/* Search and Filters */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#232B3B] bg-[#232B3B] text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <MagnifyingGlassIcon className="h-5 w-5 text-gray-400 absolute left-3 top-2.5" />
            </div>
          </div>
          
          <div className="flex gap-2">
            <button
              className="px-4 py-2 rounded-lg flex items-center gap-2 bg-[#232B3B] text-gray-200 border border-[#232B3B] hover:bg-[#181F2A]"
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
              className={`px-3 py-1 rounded-full text-sm font-medium capitalize flex items-center gap-1 transition-all duration-150 ${
                selectedTypes.includes(type)
                  ? 'bg-indigo-600 text-white shadow'
                  : 'bg-[#232B3B] text-gray-400 hover:bg-[#181F2A]'
              }`}
            >
              {logTypeIcon(type)}
              {type}
            </button>
          ))}
        </div>
      </div>

      {/* Logs Table */}
      <div className="bg-[#232B3B] rounded-xl shadow-lg overflow-hidden border border-[#232B3B]">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-[#232B3B]">
            <thead className="bg-[#181F2A]">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Time
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Action
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Description
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  User
                </th>
                <th className="px-6 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  Details
                </th>
              </tr>
            </thead>
            <tbody className="bg-[#232B3B] divide-y divide-[#181F2A]">
              {filteredLogs.map((log) => (
                <tr key={log.id} className="hover:bg-[#181F2A] transition-colors">
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {format(log.timestamp, 'MMM d, yyyy h:mm a')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex items-center gap-2">
                    {logTypeIcon(log.type)}
                    <span className="capitalize text-gray-200">{log.type}</span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-200">
                    {log.action}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-400">
                    {log.description}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-400">
                    {log.user}
                  </td>
                  <td className="px-6 py-4 text-sm text-indigo-400">
                    {log.details && (
                      <button
                        onClick={() => setDetailsModal({ open: true, log })}
                        className="flex items-center gap-1 hover:text-indigo-300 transition-colors"
                      >
                        <EyeIcon className="h-5 w-5" />
                        View
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <LogDetailsModal
        isOpen={detailsModal.open}
        onClose={() => setDetailsModal({ open: false, log: null })}
        log={detailsModal.log}
      />
    </div>
  );
};

export default LogsPage; 