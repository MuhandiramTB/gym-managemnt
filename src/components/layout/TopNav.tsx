import React, { Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { Link } from 'react-router-dom';
import {
  BellIcon,
  BuildingOfficeIcon,
  ChevronDownIcon,
  UserCircleIcon,
} from '@heroicons/react/24/outline';

const userNavigation = [
  { name: 'Your Profile', href: '/profile' },
  { name: 'Sign out', href: '/logout' },
];

const branches = [
  { id: 1, name: 'Main Branch' },
  { id: 2, name: 'Downtown Location' },
  { id: 3, name: 'East Side Gym' },
];

const TopNav: React.FC = () => {
  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center border-b border-gray-200 bg-white px-4 shadow-sm">
      <div className="flex-1" /> {/* Spacer */}
      {/* Right side navigation */}
      <div className="flex items-center space-x-6">
        {/* Branch Selector */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900">
            <BuildingOfficeIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            <span>Main Branch</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
          
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-48 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              {branches.map((branch) => (
                <Menu.Item key={branch.id}>
                  {({ active }) => (
                    <button
                      className={`
                        block w-full text-left px-3 py-1 text-sm leading-6
                        ${active ? 'bg-gray-50' : ''}
                        ${branch.name === 'Main Branch' ? 'text-blue-600' : 'text-gray-900'}
                      `}
                    >
                      {branch.name}
                    </button>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>

        {/* Notifications */}
        <button
          type="button"
          className="relative rounded-full bg-white p-1.5 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-red-500 text-xs text-white">
            3
          </span>
          <BellIcon className="h-6 w-6" aria-hidden="true" />
        </button>

        {/* Profile dropdown */}
        <Menu as="div" className="relative">
          <Menu.Button className="flex items-center gap-x-1 text-sm font-medium leading-6 text-gray-900">
            <UserCircleIcon className="h-5 w-5 text-gray-500" aria-hidden="true" />
            <span>John Smith</span>
            <ChevronDownIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </Menu.Button>
          
          <Transition
            as={Fragment}
            enter="transition ease-out duration-100"
            enterFrom="transform opacity-0 scale-95"
            enterTo="transform opacity-100 scale-100"
            leave="transition ease-in duration-75"
            leaveFrom="transform opacity-100 scale-100"
            leaveTo="transform opacity-0 scale-95"
          >
            <Menu.Items className="absolute right-0 z-10 mt-2.5 w-32 origin-top-right rounded-md bg-white py-2 shadow-lg ring-1 ring-gray-900/5 focus:outline-none">
              {userNavigation.map((item) => (
                <Menu.Item key={item.name}>
                  {({ active }) => (
                    <Link
                      to={item.href}
                      className={`
                        block w-full text-left px-3 py-1 text-sm leading-6
                        ${active ? 'bg-gray-50' : ''}
                        ${item.name === 'Sign out' ? 'text-red-600' : 'text-gray-900'}
                      `}
                    >
                      {item.name}
                    </Link>
                  )}
                </Menu.Item>
              ))}
            </Menu.Items>
          </Transition>
        </Menu>
      </div>
    </div>
  );
};

export default TopNav; 