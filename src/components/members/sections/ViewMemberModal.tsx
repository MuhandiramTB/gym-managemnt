import React, { FC } from 'react';
import { Dialog, DialogPanel, DialogTitle } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Member } from '../types';

interface ViewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

const ViewMemberModal: FC<ViewMemberModalProps> = ({
  isOpen,
  onClose,
  member
}) => {
  if (!member) return null;

  const getStatusColor = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return 'bg-emerald-900 text-emerald-200';
      case 'inactive':
        return 'bg-gray-900 text-gray-200';
      case 'suspended':
        return 'bg-red-900 text-red-200';
      default:
        return 'bg-gray-900 text-gray-200';
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <DialogPanel className="mx-auto max-w-lg rounded-lg bg-[#232B3B] p-6 text-white">
          <div className="flex items-center justify-between mb-6">
            <DialogTitle className="text-xl font-semibold">
              Member Details
            </DialogTitle>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-indigo-900 flex items-center justify-center">
                <span className="text-2xl text-indigo-400">
                  {member.firstName[0]}{member.lastName[0]}
                </span>
              </div>
              <div>
                <h3 className="text-lg font-medium">
                  {member.firstName} {member.lastName}
                </h3>
                <p className="text-sm text-gray-400">ID: {member.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Email</h4>
                <p className="text-white">{member.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Phone</h4>
                <p className="text-white">{member.phone}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Membership Type</h4>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-800 text-indigo-200">
                  {member.membershipType}
                </span>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Status</h4>
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Join Date</h4>
                <p className="text-white">{member.joinDate}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium text-gray-400 mb-1">Last Visit</h4>
                <p className="text-white">{member.lastVisit}</p>
              </div>
            </div>

            <div className="flex justify-end mt-6">
              <button
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Close
              </button>
            </div>
          </div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default ViewMemberModal; 