import { FC, useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { TextInput, Select, SelectItem, Button } from '@tremor/react';
import { CreateMemberModalProps, MemberFormData, Member } from './types';

const CreateMemberModal: FC<CreateMemberModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<MemberFormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    membershipType: 'Basic Membership',
    status: 'active',
    joinDate: new Date().toISOString().split('T')[0],
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        firstName: initialData.firstName,
        lastName: initialData.lastName,
        email: initialData.email,
        phone: initialData.phone,
        membershipType: initialData.membershipType,
        status: initialData.status,
        joinDate: initialData.joinDate,
      });
    } else {
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        membershipType: 'Basic Membership',
        status: 'active',
        joinDate: new Date().toISOString().split('T')[0],
      });
    }
  }, [initialData]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  const isEditMode = !!initialData;

  return (
    <Dialog open={isOpen} onClose={onClose} className="relative z-50">
      <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
      
      <div className="fixed inset-0 flex items-center justify-center p-4">
        <Dialog.Panel className="mx-auto max-w-2xl w-full rounded-xl bg-[#232B3B] text-gray-200 p-8 shadow-2xl border border-[#232B3B]">
          <div className="flex justify-between items-center mb-6">
            <Dialog.Title className="text-2xl font-bold text-white">
              {isEditMode ? 'Edit Member' : 'Add New Member'}
            </Dialog.Title>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-200 transition-colors duration-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-[#181F2A]">
                <label className="block text-sm font-medium text-gray-300 mb-2">First Name</label>
                <TextInput
                  placeholder="Enter first name"
                  value={formData.firstName}
                  onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
                  required
                  className="w-full rounded-lg border-[#232B3B] bg-[#181F2A] text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>

              <div className="p-4 rounded-lg bg-[#181F2A]">
                <label className="block text-sm font-medium text-gray-300 mb-2">Last Name</label>
                <TextInput
                  placeholder="Enter last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
                  required
                  className="w-full rounded-lg border-[#232B3B] bg-[#181F2A] text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-[#181F2A]">
                <label className="block text-sm font-medium text-gray-300 mb-2">Email</label>
                <TextInput
                  type="email"
                  placeholder="Enter email"
                  value={formData.email}
                  onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                  required
                  className="w-full rounded-lg border-[#232B3B] bg-[#181F2A] text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>

              <div className="p-4 rounded-lg bg-[#181F2A]">
                <label className="block text-sm font-medium text-gray-300 mb-2">Phone</label>
                <TextInput
                  type="tel"
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
                  required
                  className="w-full rounded-lg border-[#232B3B] bg-[#181F2A] text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-6">
              <div className="p-4 rounded-lg bg-[#181F2A]">
                <label className="block text-sm font-medium text-gray-300 mb-2">Membership Type</label>
                <Select
                  value={formData.membershipType}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, membershipType: value }))}
                  className="w-full rounded-lg border-[#232B3B] bg-[#181F2A] text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                >
                  <SelectItem value="Basic Membership">Basic Membership</SelectItem>
                  <SelectItem value="Premium Package">Premium Package</SelectItem>
                  <SelectItem value="Student Membership">Student Membership</SelectItem>
                  <SelectItem value="Senior Membership">Senior Membership</SelectItem>
                </Select>
              </div>

              <div className="p-4 rounded-lg bg-[#181F2A]">
                <label className="block text-sm font-medium text-gray-300 mb-2">Status</label>
                <Select
                  value={formData.status}
                  onValueChange={(value) => setFormData(prev => ({ ...prev, status: value as MemberFormData['status'] }))}
                  className="w-full rounded-lg border-[#232B3B] bg-[#181F2A] text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                >
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </Select>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-[#181F2A]">
              <label className="block text-sm font-medium text-gray-300 mb-2">Join Date</label>
              <input
                type="date"
                className="w-full rounded-lg border border-[#232B3B] bg-[#181F2A] text-gray-200 px-3 py-2 text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
                value={formData.joinDate}
                onChange={(e) => setFormData(prev => ({ ...prev, joinDate: e.target.value }))}
                required
              />
            </div>

            <div className="flex justify-end gap-3 mt-8">
              <Button 
                variant="secondary" 
                onClick={onClose}
                className="px-4 py-2 rounded-lg bg-[#232B3B] hover:bg-[#181F2A] text-gray-200 border-0 shadow-none"
              >
                Cancel
              </Button>
              <Button 
                type="submit"
                className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-none"
              >
                {isEditMode ? 'Save Changes' : 'Add Member'}
              </Button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default CreateMemberModal; 