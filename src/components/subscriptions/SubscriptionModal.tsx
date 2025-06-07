import React, { useState, useEffect } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface SubscriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (subscription: Omit<Subscription, 'id'>) => void;
  subscription?: Subscription;
}

interface Subscription {
  id: string;
  memberId: string;
  memberName: string;
  planId: string;
  planName: string;
  startDate: Date;
  endDate: Date;
  status: 'active' | 'expired' | 'cancelled';
  autoRenew: boolean;
  paymentStatus: 'paid' | 'pending' | 'overdue';
}

const SubscriptionModal: React.FC<SubscriptionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  subscription,
}) => {
  const [formData, setFormData] = useState<Omit<Subscription, 'id'>>({
    memberId: '',
    memberName: '',
    planId: '',
    planName: '',
    startDate: new Date(),
    endDate: new Date(),
    status: 'active',
    autoRenew: false,
    paymentStatus: 'pending',
  });

  useEffect(() => {
    if (subscription) {
      setFormData({
        memberId: subscription.memberId,
        memberName: subscription.memberName,
        planId: subscription.planId,
        planName: subscription.planName,
        startDate: subscription.startDate,
        endDate: subscription.endDate,
        status: subscription.status,
        autoRenew: subscription.autoRenew,
        paymentStatus: subscription.paymentStatus,
      });
    }
  }, [subscription]);

  // Helper to format Date to yyyy-mm-dd
  const formatDate = (date: Date) => {
    if (!date) return '';
    const d = new Date(date);
    return d.toISOString().split('T')[0];
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#232B3B] text-gray-200 rounded-xl p-6 w-full max-w-lg border border-[#232B3B] relative mt-40">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-200 text-2xl font-bold"
        >
          <XMarkIcon className="h-6 w-6" />
        </button>
        <h2 className="text-2xl font-bold text-white mb-6">{subscription ? 'Edit Subscription' : 'New Subscription'}</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Member Name</label>
            <input
              type="text"
              value={formData.memberName}
              onChange={e => setFormData({ ...formData, memberName: e.target.value })}
              className="w-full rounded-lg border border-[#232B3B] bg-[#181F2A] text-gray-200 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Plan Name</label>
            <input
              type="text"
              value={formData.planName}
              onChange={e => setFormData({ ...formData, planName: e.target.value })}
              className="w-full rounded-lg border border-[#232B3B] bg-[#181F2A] text-gray-200 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Start Date</label>
              <input
                type="date"
                value={formatDate(formData.startDate)}
                onChange={e => setFormData({ ...formData, startDate: new Date(e.target.value) })}
                className="w-full rounded-lg border border-[#232B3B] bg-[#181F2A] text-gray-200 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">End Date</label>
              <input
                type="date"
                value={formatDate(formData.endDate)}
                onChange={e => setFormData({ ...formData, endDate: new Date(e.target.value) })}
                className="w-full rounded-lg border border-[#232B3B] bg-[#181F2A] text-gray-200 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
              <select
                value={formData.status}
                onChange={e => setFormData({ ...formData, status: e.target.value as Subscription['status'] })}
                className="w-full rounded-lg border border-[#232B3B] bg-[#181F2A] text-gray-200 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              >
                <option value="active">Active</option>
                <option value="expired">Expired</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Payment Status</label>
              <select
                value={formData.paymentStatus}
                onChange={e => setFormData({ ...formData, paymentStatus: e.target.value as Subscription['paymentStatus'] })}
                className="w-full rounded-lg border border-[#232B3B] bg-[#181F2A] text-gray-200 px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
                required
              >
                <option value="paid">Paid</option>
                <option value="pending">Pending</option>
                <option value="overdue">Overdue</option>
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.autoRenew}
              onChange={e => setFormData({ ...formData, autoRenew: e.target.checked })}
              className="rounded border-[#232B3B] bg-[#181F2A] text-indigo-600 focus:ring-indigo-500"
            />
            <label className="text-sm text-gray-300">Auto Renew</label>
          </div>
          <div className="flex justify-end gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-[#232B3B] hover:bg-[#181F2A] text-gray-200 border-0 shadow-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white border-0 shadow-none"
            >
              {subscription ? 'Update' : 'Create'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubscriptionModal; 