import { FC } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon, EnvelopeIcon, PhoneIcon, CalendarIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { Badge } from '@tremor/react';
import { Member } from './types';

interface ViewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

const ViewMemberModal: FC<ViewMemberModalProps> = ({ isOpen, onClose, member }) => {
  if (!member) return null;

  const getStatusColor = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return 'emerald';
      case 'inactive':
        return 'gray';
      case 'suspended':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/40 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-xl bg-[#232B3B] text-gray-200 p-8 shadow-2xl border border-[#232B3B]">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold text-white">
              Member Details
            </Dialog.Title>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-[#181F2A]">
              <div className="h-16 w-16 rounded-full bg-indigo-900 flex items-center justify-center">
                <UserCircleIcon className="h-12 w-12 text-indigo-400" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">{member.firstName} {member.lastName}</h3>
                <p className="text-sm text-gray-400">Member ID: {member.id}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="space-y-3 p-4 rounded-lg bg-[#181F2A]">
                <div className="flex items-center space-x-2 text-gray-400">
                  <EnvelopeIcon className="h-5 w-5 text-indigo-400" />
                  <span>{member.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <PhoneIcon className="h-5 w-5 text-indigo-400" />
                  <span>{member.phone}</span>
                </div>
              </div>

              <div className="space-y-3 p-4 rounded-lg bg-[#181F2A]">
                <div className="flex items-center space-x-2 text-gray-400">
                  <CalendarIcon className="h-5 w-5 text-indigo-400" />
                  <span>Joined: {member.joinDate}</span>
                </div>
                <div className="flex items-center space-x-2 text-gray-400">
                  <CalendarIcon className="h-5 w-5 text-indigo-400" />
                  <span>Last Visit: {member.lastVisit}</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-[#181F2A]">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Membership Type</h4>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-800 text-indigo-200">
                  {member.membershipType}
                </span>
              </div>

              <div className="p-4 rounded-lg bg-[#181F2A]">
                <h4 className="text-sm font-medium text-gray-300 mb-2">Status</h4>
                <Badge color={getStatusColor(member.status)} className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{backgroundColor: member.status === 'active' ? '#059669' : member.status === 'inactive' ? '#6B7280' : '#DC2626', color: '#fff'}}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </Badge>
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default ViewMemberModal; 