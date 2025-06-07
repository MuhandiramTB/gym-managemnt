import React, { useState } from 'react';
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

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  bill?: Bill;
}

const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, bill }) => {
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'cash'>('card');
  const [cardDetails, setCardDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    console.log('Payment submitted:', {
      bill,
      paymentMethod,
      cardDetails: paymentMethod === 'card' ? cardDetails : undefined,
    });
    onClose();
  };

  if (!bill) return null;

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-10 overflow-y-auto"
    >
      <div className="flex items-center justify-center min-h-screen">
        <div className="fixed inset-0 bg-black/40" />
        <Dialog.Panel className="relative bg-[#232B3B] text-gray-200 rounded-lg max-w-md w-full mx-4 p-6 border border-[#232B3B]">
          <div className="flex justify-between items-center mb-4">
            <Dialog.Title className="text-lg font-medium text-white">
              Payment
            </Dialog.Title>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-200"
            >
              <XMarkIcon className="h-6 w-6" />
            </button>
          </div>

          <div className="mb-6">
            <h3 className="text-sm font-medium text-white">Bill Details</h3>
            <div className="mt-2 space-y-2">
              <p className="text-sm text-white">
                <span className="font-medium">Member:</span> {bill.memberName}
              </p>
              <p className="text-sm text-white">
                <span className="font-medium">Amount:</span> ${bill.amount.toFixed(2)}
              </p>
              <p className="text-sm text-white">
                <span className="font-medium">Description:</span> {bill.description}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300">
                Payment Method
              </label>
              <div className="mt-2 space-x-4">
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="card"
                    checked={paymentMethod === 'card'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 bg-[#181F2A] border-[#232B3B]"
                  />
                  <span className="ml-2 text-sm text-gray-300">Credit Card</span>
                </label>
                <label className="inline-flex items-center">
                  <input
                    type="radio"
                    value="cash"
                    checked={paymentMethod === 'cash'}
                    onChange={(e) => setPaymentMethod(e.target.value as 'cash')}
                    className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 bg-[#181F2A] border-[#232B3B]"
                  />
                  <span className="ml-2 text-sm text-gray-300">Cash</span>
                </label>
              </div>
            </div>

            {paymentMethod === 'card' && (
              <>
                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Card Number
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cardNumber}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                    className="mt-1 block w-full rounded-md border-[#232B3B] bg-[#181F2A] text-gray-200 shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                    placeholder="1234 5678 9012 3456"
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      value={cardDetails.expiryDate}
                      onChange={(e) => setCardDetails({ ...cardDetails, expiryDate: e.target.value })}
                      className="mt-1 block w-full rounded-md border-[#232B3B] bg-[#181F2A] text-gray-200 shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                      placeholder="MM/YY"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300">
                      CVV
                    </label>
                    <input
                      type="text"
                      value={cardDetails.cvv}
                      onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                      className="mt-1 block w-full rounded-md border-[#232B3B] bg-[#181F2A] text-gray-200 shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                      placeholder="123"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300">
                    Cardholder Name
                  </label>
                  <input
                    type="text"
                    value={cardDetails.cardholderName}
                    onChange={(e) => setCardDetails({ ...cardDetails, cardholderName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-[#232B3B] bg-[#181F2A] text-gray-200 shadow-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 sm:text-sm"
                    required
                  />
                </div>
              </>
            )}

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-[#232B3B] rounded-md text-sm font-medium text-gray-200 bg-[#232B3B] hover:bg-[#181F2A]"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 border border-transparent rounded-md shadow-none text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700"
              >
                Process Payment
              </button>
            </div>
          </form>
        </Dialog.Panel>
      </div>
    </Dialog>
  );
};

export default PaymentModal; 