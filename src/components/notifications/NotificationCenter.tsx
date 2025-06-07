import React, { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';

export type NotificationType = 'membership' | 'achievement' | 'workout' | 'system';

export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onMarkAsRead: (id: string) => void;
  onClearAll: () => void;
}

const NotificationCenter: React.FC<NotificationCenterProps> = ({
  notifications,
  onMarkAsRead,
  onClearAll,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationIcon = (type: NotificationType) => {
    switch (type) {
      case 'membership':
        return '🏋️‍♂️';
      case 'achievement':
        return '🏆';
      case 'workout':
        return '💪';
      case 'system':
        return '⚙️';
      default:
        return '📢';
    }
  };

  const getNotificationColor = (type: NotificationType) => {
    switch (type) {
      case 'membership':
        return 'bg-blue-800 text-blue-200';
      case 'achievement':
        return 'bg-yellow-800 text-yellow-200';
      case 'workout':
        return 'bg-green-800 text-green-200';
      case 'system':
        return 'bg-gray-800 text-gray-200';
      default:
        return 'bg-gray-800 text-gray-200';
    }
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="relative p-2 text-gray-400 hover:text-white focus:outline-none"
      >
        <BellIcon className="h-6 w-6" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-red-600 rounded-full">
            {unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-80 bg-[#232B3B] rounded-lg shadow-lg overflow-hidden z-50">
          <div className="p-4 border-b border-gray-700">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-white">Notifications</h3>
              {notifications.length > 0 && (
                <button
                  onClick={onClearAll}
                  className="text-sm text-gray-400 hover:text-white"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>

          <div className="max-h-96 overflow-y-auto">
            {notifications.length === 0 ? (
              <div className="p-4 text-center text-gray-400">
                No notifications
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-4 border-b border-gray-700 hover:bg-[#1E2536] cursor-pointer ${
                    !notification.read ? 'bg-[#1E2536]' : ''
                  }`}
                  onClick={() => onMarkAsRead(notification.id)}
                >
                  <div className="flex items-start">
                    <span className="text-xl mr-3">
                      {getNotificationIcon(notification.type)}
                    </span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-white">
                          {notification.title}
                        </h4>
                        <span className={`text-xs px-2 py-1 rounded-full ${getNotificationColor(notification.type)}`}>
                          {notification.type}
                        </span>
                      </div>
                      <p className="mt-1 text-sm text-gray-400">
                        {notification.message}
                      </p>
                      <p className="mt-1 text-xs text-gray-500">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default NotificationCenter; 