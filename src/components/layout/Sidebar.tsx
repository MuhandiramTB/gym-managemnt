import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  HomeIcon,
  UserGroupIcon,
  CreditCardIcon,
  ClockIcon,
  DocumentTextIcon,
  BuildingOfficeIcon,
  Cog6ToothIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Packages', href: '/packages', icon: CubeIcon },
  { name: 'Members', href: '/members', icon: UserGroupIcon },
  { name: 'Attendance', href: '/attendance', icon: ClockIcon },
  { name: 'Billing', href: '/billing', icon: CreditCardIcon },
  { name: 'Logs', href: '/logs', icon: DocumentTextIcon },
  { name: 'Branches', href: '/branches', icon: BuildingOfficeIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
      <div className="flex flex-grow flex-col overflow-y-auto bg-gray-900 px-6">
        <div className="flex h-16 flex-shrink-0 items-center">
          <h1 className="text-2xl font-bold text-white">GYM MGMT</h1>
        </div>
        <nav className="mt-8 flex flex-1 flex-col">
          <div className="flex flex-1 flex-col gap-y-7">
            <div>
              <div className="-mx-2 space-y-1">
                {navigation.map((item) => {
                  const isActive = location.pathname === item.href;
                  return (
                    <div key={item.name}>
                      <Link
                        to={item.href}
                        className={`
                          group flex gap-x-3 rounded-md p-2 text-sm font-semibold leading-6
                          ${
                            isActive
                              ? 'bg-gray-800 text-white'
                              : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                          }
                        `}
                      >
                        <item.icon className="h-6 w-6 shrink-0" aria-hidden="true" />
                        {item.name}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar; 