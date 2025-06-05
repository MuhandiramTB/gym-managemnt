import React, { useState } from 'react';

interface CheckInModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckIn: (memberId: string, memberName: string) => void;
}

const CheckInModal: React.FC<CheckInModalProps> = ({ isOpen, onClose, onCheckIn }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMember, setSelectedMember] = useState<{ id: string; name: string } | null>(null);

  // TODO: Replace with actual member data from your backend
  const mockMembers = [
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' },
  ];

  const filteredMembers = mockMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Check In Member</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search members..."
            className="w-full px-4 py-2 border rounded-lg"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="max-h-60 overflow-y-auto mb-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`p-3 cursor-pointer hover:bg-gray-100 rounded-lg ${
                selectedMember?.id === member.id ? 'bg-blue-50' : ''
              }`}
              onClick={() => setSelectedMember(member)}
            >
              {member.name}
            </div>
          ))}
        </div>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              if (selectedMember) {
                onCheckIn(selectedMember.id, selectedMember.name);
                onClose();
              }
            }}
            disabled={!selectedMember}
            className={`px-4 py-2 rounded-lg ${
              selectedMember
                ? 'bg-blue-500 text-white hover:bg-blue-600'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
          >
            Check In
          </button>
        </div>
      </div>
    </div>
  );
};

export default CheckInModal; 