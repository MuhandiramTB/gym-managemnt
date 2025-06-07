import React, { useState } from 'react';
import { PlusIcon, PencilIcon, TrashIcon, UserIcon, CalendarIcon, IdentificationIcon, CheckCircleIcon, CreditCardIcon } from '@heroicons/react/24/outline';
import SubscriptionModal from './SubscriptionModal';

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

const SubscriptionsPage: React.FC = () => {
  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    {
      id: '1',
      memberId: 'M001',
      memberName: 'John Doe',
      planId: 'P001',
      planName: 'Premium Membership',
      startDate: new Date('2024-01-01'),
      endDate: new Date('2024-12-31'),
      status: 'active',
      autoRenew: true,
      paymentStatus: 'paid',
    },
    {
      id: '2',
      memberId: 'M002',
      memberName: 'Jane Smith',
      planId: 'P002',
      planName: 'Basic Membership',
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-08-01'),
      status: 'active',
      autoRenew: false,
      paymentStatus: 'pending',
    },
  ]);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedSubscription, setSelectedSubscription] = useState<Subscription | undefined>(undefined);

  const [statusFilter, setStatusFilter] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState('');
  const [search, setSearch] = useState('');

  const filteredSubscriptions = subscriptions.filter(sub => {
    const matchesStatus = !statusFilter || sub.status === statusFilter;
    const matchesPayment = !paymentStatusFilter || sub.paymentStatus === paymentStatusFilter;
    const matchesSearch = !search || sub.memberName.toLowerCase().includes(search.toLowerCase());
    return matchesStatus && matchesPayment && matchesSearch;
  });

  const handleCreateSubscription = () => {
    setIsCreateModalOpen(true);
  };

  const handleEditSubscription = (subscription: Subscription) => {
    setSelectedSubscription(subscription);
    setIsEditModalOpen(true);
  };

  const handleDeleteSubscription = (id: string) => {
    setSubscriptions(prev => prev.filter(sub => sub.id !== id));
  };

  const handleSubmit = (subscriptionData: Omit<Subscription, 'id'>) => {
    if (selectedSubscription) {
      // Update existing subscription
      setSubscriptions(prev =>
        prev.map(sub =>
          sub.id === selectedSubscription.id
            ? { ...subscriptionData, id: sub.id }
            : sub
        )
      );
    } else {
      // Create new subscription
      const newSubscription: Subscription = {
        ...subscriptionData,
        id: Math.random().toString(36).substr(2, 9),
      };
      setSubscriptions(prev => [...prev, newSubscription]);
    }
  };

  const getStatusColor = (status: Subscription['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'expired':
        return 'bg-red-100 text-red-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: Subscription['paymentStatus']) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'overdue':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Subscription Management</h1>
        <button
          onClick={handleCreateSubscription}
          className="bg-blue-300 text-black px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <PlusIcon className="h-5 w-5" />
          New Subscription
        </button>
      </div>

      {/* Filters */}
      <div className="bg-[#232B3B] text-gray-200 rounded-lg shadow-none border-0 mb-6 p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Status</label>
            <select
              className="w-full border border-[#232B3B] bg-[#181F2A] text-gray-200 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={statusFilter}
              onChange={e => setStatusFilter(e.target.value)}
            >
              <option value="">All Status</option>
              <option value="active">Active</option>
              <option value="expired">Expired</option>
              <option value="cancelled">Cancelled</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Payment Status</label>
            <select
              className="w-full border border-[#232B3B] bg-[#181F2A] text-gray-200 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={paymentStatusFilter}
              onChange={e => setPaymentStatusFilter(e.target.value)}
            >
              <option value="">All Payment Status</option>
              <option value="paid">Paid</option>
              <option value="pending">Pending</option>
              <option value="overdue">Overdue</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">Search</label>
            <input
              type="text"
              placeholder="Search by member name..."
              className="w-full border border-[#232B3B] bg-[#181F2A] text-gray-200 rounded-lg px-3 py-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
              value={search}
              onChange={e => setSearch(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Subscriptions Table */}
      <div className="bg-[#232B3B] text-gray-200 rounded-lg shadow-none border-0 overflow-x-auto">
        <table className="min-w-full divide-y divide-[#181F2A]">
          <thead className="bg-[#232B3B]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"><span className="flex items-center gap-1"><IdentificationIcon className="h-4 w-4 text-indigo-400" /> ID</span></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"><span className="flex items-center gap-1"><UserIcon className="h-4 w-4 text-indigo-400" /> Member</span></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"><span className="flex items-center gap-1"><CreditCardIcon className="h-4 w-4 text-indigo-400" /> Plan</span></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"><span className="flex items-center gap-1"><CalendarIcon className="h-4 w-4 text-indigo-400" /> Dates</span></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"><span className="flex items-center gap-1"><CheckCircleIcon className="h-4 w-4 text-indigo-400" /> Status</span></th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider"><span className="flex items-center gap-1"><CreditCardIcon className="h-4 w-4 text-indigo-400" /> Payment</span></th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider"><span className="flex items-center gap-1 justify-end"><PencilIcon className="h-4 w-4 text-indigo-400" /> Actions</span></th>
            </tr>
          </thead>
          <tbody className="bg-[#232B3B] divide-y divide-[#181F2A]">
            {filteredSubscriptions.map((subscription) => (
              <tr key={subscription.id} className="hover:bg-[#181F2A] transition-colors duration-200">
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{subscription.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{subscription.memberName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{subscription.planName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{subscription.startDate.toLocaleDateString()} - {subscription.endDate.toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${subscription.status === 'active' ? 'bg-emerald-800 text-emerald-200' : ''}
                    ${subscription.status === 'expired' ? 'bg-red-900 text-red-200' : ''}
                    ${subscription.status === 'cancelled' ? 'bg-yellow-900 text-yellow-200' : ''}
                  `}>
                    {subscription.status.charAt(0).toUpperCase() + subscription.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{subscription.paymentStatus.charAt(0).toUpperCase() + subscription.paymentStatus.slice(1)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium flex gap-2 justify-end">
                  <button
                    onClick={() => handleEditSubscription(subscription)}
                    className="text-indigo-400 hover:text-indigo-200 flex items-center gap-1"
                  >
                    <PencilIcon className="h-4 w-4" /> Edit
                  </button>
                  <button
                    onClick={() => handleDeleteSubscription(subscription.id)}
                    className="text-rose-400 hover:text-rose-200 flex items-center gap-1"
                  >
                    <TrashIcon className="h-4 w-4" /> Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Create/Edit Subscription Modal */}
      <SubscriptionModal
        isOpen={isCreateModalOpen || isEditModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setIsEditModalOpen(false);
          setSelectedSubscription(undefined);
        }}
        onSubmit={handleSubmit}
        subscription={selectedSubscription}
      />
    </div>
  );
};

export default SubscriptionsPage; 