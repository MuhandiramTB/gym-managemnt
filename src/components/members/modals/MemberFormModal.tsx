import React, { useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Member, MemberFormData } from '../types';

interface MemberFormModalProps {
  member?: Member;
  onClose: () => void;
  onSubmit: (formData: MemberFormData) => void;
}

const MemberFormModal: React.FC<MemberFormModalProps> = ({
  member,
  onClose,
  onSubmit,
}) => {
  const [formData, setFormData] = useState<MemberFormData>({
    name: member?.name || '',
    email: member?.email || '',
    phone: member?.phone || '',
    membershipType: member?.membershipType || 'basic',
    status: member?.status || 'active',
    joinDate: member?.joinDate || new Date().toISOString().split('T')[0],
    membershipExpiry: member?.membershipExpiry || new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-[#232B3B] rounded-2xl shadow-2xl p-6 w-full max-w-2xl sm:max-w-3xl mx-2 mt-36 transition-all">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-white">
            {member ? 'Edit Member' : 'Create Member'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <XMarkIcon className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, name: e.target.value }))
                }
                required
                className="w-full px-3 py-1.5 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, email: e.target.value }))
                }
                required
                className="w-full px-3 py-1.5 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Phone
              </label>
              <input
                type="tel"
                value={formData.phone}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, phone: e.target.value }))
                }
                required
                className="w-full px-3 py-1.5 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Membership Type
              </label>
              <select
                value={formData.membershipType}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    membershipType: e.target.value as Member['membershipType'],
                  }))
                }
                required
                className="w-full px-3 py-1.5 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="basic">Basic</option>
                <option value="premium">Premium</option>
                <option value="vip">VIP</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Status
              </label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    status: e.target.value as Member['status'],
                  }))
                }
                required
                className="w-full px-3 py-1.5 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="suspended">Suspended</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Join Date
              </label>
              <input
                type="date"
                value={formData.joinDate}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, joinDate: e.target.value }))
                }
                required
                className="w-full px-3 py-1.5 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Membership Expiry
              </label>
              <input
                type="date"
                value={formData.membershipExpiry}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    membershipExpiry: e.target.value,
                  }))
                }
                required
                className="w-full px-3 py-1.5 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-1.5 text-sm font-medium text-gray-300 hover:text-white"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-1.5 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              {member ? 'Save Changes' : 'Create Member'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MemberFormModal; 