import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface Bill {
  id: string;
  memberId: string;
  memberName: string;
  amount: number;
  dueDate: string;
  status: 'pending' | 'paid' | 'overdue';
  type: 'subscription' | 'service' | 'other';
  description: string;
}

interface BillModalProps {
  isOpen: boolean;
  onClose: () => void;
  bill?: Bill;
}

const BillModal: React.FC<BillModalProps> = ({ isOpen, onClose, bill }) => {
  const [formData, setFormData] = useState<Partial<Bill>>({
    memberId: '',
    memberName: '',
    amount: 0,
    dueDate: '',
    status: 'pending',
    type: 'subscription',
    description: '',
  });

  useEffect(() => {
    if (bill) {
      setFormData(bill);
    } else {
      setFormData({
        memberId: '',
        memberName: '',
        amount: 0,
        dueDate: '',
        status: 'pending',
        type: 'subscription',
        description: '',
      });
    }
  }, [bill]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
    onClose();
  };

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black opacity-30" />

        <Dialog.Panel className="relative bg-[#232B3B] text-gray-200 rounded-lg max-w-md w-full mx-4 p-6 border border-[#232B3B]">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium text-white">
              {bill ? 'Edit Bill' : 'Create New Bill'}
            </Dialog.Title>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Member ID
              </label>
              <input
                type="text"
                value={formData.memberId}
                onChange={(e) => setFormData({ ...formData, memberId: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#232B3B] bg-[#181F2A] text-gray-200 shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Member Name
              </label>
              <input
                type="text"
                value={formData.memberName}
                onChange={(e) => setFormData({ ...formData, memberName: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#232B3B] bg-[#181F2A] text-gray-200 shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Amount
              </label>
              <input
                type="number"
                value={formData.amount}
                onChange={(e) => setFormData({ ...formData, amount: parseFloat(e.target.value) })}
                className="mt-1 block w-full rounded-md border-[#232B3B] bg-[#181F2A] text-gray-200 shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                required
                min="0"
                step="0.01"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#232B3B] bg-[#181F2A] text-gray-200 shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as Bill['type'] })}
                className="mt-1 block w-full rounded-md border-[#232B3B] bg-[#181F2A] text-gray-200 shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                required
              >
                <option value="subscription">Subscription</option>
                <option value="service">Service</option>
                <option value="other">Other</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                className="mt-1 block w-full rounded-md border-[#232B3B] bg-[#181F2A] text-gray-200 shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                rows={3}
                required
              />
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700"
              >
                {bill ? 'Update' : 'Create'}
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default BillModal; 