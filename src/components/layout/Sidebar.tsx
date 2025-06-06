import React, { useState } from 'react';
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
  CalendarIcon,
  Bars3Icon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const navigation = [
  { name: 'Dashboard', href: '/', icon: HomeIcon },
  { name: 'Packages', href: '/packages', icon: CubeIcon },
  { name: 'Members', href: '/members', icon: UserGroupIcon },
  { name: 'Attendance', href: '/attendance', icon: ClockIcon },
  { name: 'Billing', href: '/billing', icon: CreditCardIcon },
  { name: 'Subscriptions', href: '/subscriptions', icon: CalendarIcon },
  { name: 'Logs', href: '/logs', icon: DocumentTextIcon },
  { name: 'Branches', href: '/branches', icon: BuildingOfficeIcon },
  { name: 'Settings', href: '/settings', icon: Cog6ToothIcon },
];

const Sidebar: React.FC = () => {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      {/* Mobile menu button */}
      <button
        onClick={toggleMobileMenu}
        className="fixed top-4 left-4 z-50 rounded-lg bg-gray-900 p-2 text-gray-400 hover:bg-gray-800 hover:text-white lg:hidden"
      >
        {isMobileMenuOpen ? (
          <XMarkIcon className="h-6 w-6" />
        ) : (
          <Bars3Icon className="h-6 w-6" />
        )}
      </button>

      {/* Backdrop overlay */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          onClick={closeMobileMenu}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-50 w-64 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
      >
        <div className="flex h-full flex-col overflow-y-auto bg-gradient-to-b from-gray-900 to-gray-800 px-4 shadow-xl">
          {/* Logo Section */}
          <div className="flex h-20 items-center justify-center border-b border-gray-700/50">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-600">
                <span className="text-xl font-bold text-white">G</span>
              </div>
              <h1 className="text-2xl font-bold text-white tracking-tight">GYM MGMT</h1>
            </div>
          </div>

          {/* Navigation */}
          <nav className="mt-8 flex-1 space-y-1 px-2">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  onClick={closeMobileMenu}
                  className={`
                    group flex items-center gap-x-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200
                    ${
                      isActive
                        ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/20'
                        : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                    }
                  `}
                >
                  <item.icon 
                    className={`h-5 w-5 shrink-0 transition-colors duration-200 ${
                      isActive ? 'text-white' : 'text-gray-400 group-hover:text-white'
                    }`} 
                    aria-hidden="true" 
                  />
                  <span className="truncate">{item.name}</span>
                  {isActive && (
                    <div className="absolute right-2 h-2 w-2 rounded-full bg-white" />
                  )}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="mt-auto border-t border-gray-700/50 p-4">
            <div className="flex items-center justify-center space-x-2 text-sm text-gray-400">
              <span>© 2024 GYM MGMT</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar; 