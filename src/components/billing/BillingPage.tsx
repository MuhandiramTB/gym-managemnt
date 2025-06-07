import React, { useState } from 'react';
import {
  PlusIcon,
  MagnifyingGlassIcon,
  FunnelIcon,
} from '@heroicons/react/24/outline';
import BillModal from './BillModal';
import PaymentModal from './PaymentModal';
import BillingHistory from './BillingHistory';

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

const BillingPage: React.FC = () => {
  const [isBillModalOpen, setIsBillModalOpen] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedBill, setSelectedBill] = useState<Bill | undefined>(undefined);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  // Mock data - replace with actual data from your backend
  const bills: Bill[] = [
    {
      id: '1',
      memberId: 'M001',
      memberName: 'John Doe',
      amount: 99.99,
      dueDate: '2024-03-15',
      status: 'pending',
      type: 'subscription',
      description: 'Monthly membership fee',
    },
    // Add more mock bills as needed
  ];

  const handleCreateBill = () => {
    setSelectedBill(undefined);
    setIsBillModalOpen(true);
  };

  const handleEditBill = (bill: Bill) => {
    setSelectedBill(bill);
    setIsBillModalOpen(true);
  };

  const handleMakePayment = (bill: Bill) => {
    setSelectedBill(bill);
    setIsPaymentModalOpen(true);
  };

  const filteredBills = bills.filter((bill) => {
    const matchesSearch = bill.memberName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bill.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || bill.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#181F2A] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Billing</h1>
        {/* Add any header actions here */}
      </div>

      <div className="bg-[#232B3B] text-gray-200 rounded-lg shadow-none border-0 overflow-x-auto">
        <table className="min-w-full divide-y divide-[#181F2A]">
          <thead className="bg-[#232B3B]">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Bill ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Member</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Amount</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Due Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-[#232B3B] divide-y divide-[#181F2A]">
            {filteredBills.map((bill) => (
              <tr key={bill.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">{bill.id}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bill.memberName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">${bill.amount.toFixed(2)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bill.dueDate}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                    ${bill.status === 'paid' ? 'bg-emerald-800 text-emerald-200' : ''}
                    ${bill.status === 'overdue' ? 'bg-red-900 text-red-200' : ''}
                    ${bill.status === 'pending' ? 'bg-yellow-900 text-yellow-200' : ''}
                  `}>
                    {bill.status.charAt(0).toUpperCase() + bill.status.slice(1)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">{bill.type}</td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => handleEditBill(bill)}
                    className="text-indigo-400 hover:text-indigo-200 mr-4"
                  >
                    Edit
                  </button>
                  {bill.status !== 'paid' && (
                    <button
                      onClick={() => handleMakePayment(bill)}
                      className="text-emerald-400 hover:text-emerald-200"
                    >
                      Pay
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Billing History */}
      <div className="mt-8">
        <BillingHistory />
      </div>

      {/* Modals */}
      <BillModal
        isOpen={isBillModalOpen}
        onClose={() => setIsBillModalOpen(false)}
        bill={selectedBill}
      />

      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        bill={selectedBill}
      />
    </div>
  );
};

export default BillingPage; 