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
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-[#232B3B] text-gray-200 rounded-xl p-6 w-full max-w-md border border-[#232B3B]">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-white">Check In Member</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-200 text-2xl font-bold"
          >
            ✕
          </button>
        </div>

        <div className="mb-4">
          <input
            type="text"
            placeholder="Search members..."
            className="w-full px-4 py-2 border border-[#232B3B] bg-[#181F2A] text-gray-200 rounded-lg focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="max-h-60 overflow-y-auto mb-4">
          {filteredMembers.map((member) => (
            <div
              key={member.id}
              className={`p-3 cursor-pointer rounded-lg transition-colors duration-150 ${
                selectedMember?.id === member.id ? 'bg-indigo-900 text-indigo-200' : 'hover:bg-[#181F2A]'
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
            className="px-4 py-2 rounded-lg bg-[#232B3B] hover:bg-[#181F2A] text-gray-200 border-0 shadow-none"
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
            className={`px-4 py-2 rounded-lg border-0 shadow-none transition-colors duration-150 ${
              selectedMember
                ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                : 'bg-[#181F2A] text-gray-500 cursor-not-allowed'
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