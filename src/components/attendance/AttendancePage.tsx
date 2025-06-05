import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import CheckInModal from './CheckInModal';

interface Member {
  id: string;
  name: string;
  checkInTime: Date;
}

const AttendancePage: React.FC = () => {
  const [currentMembers, setCurrentMembers] = useState<Member[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCheckIn = (memberId: string, memberName: string) => {
    const newMember: Member = {
      id: memberId,
      name: memberName,
      checkInTime: new Date(),
    };
    setCurrentMembers([...currentMembers, newMember]);
  };

  const handleCheckOut = (memberId: string) => {
    setCurrentMembers(currentMembers.filter(member => member.id !== memberId));
  };

  const filteredMembers = currentMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-4">Gym Attendance</h1>
        <div className="flex gap-4 mb-6">
          <input
            type="text"
            placeholder="Search members..."
            className="px-4 py-2 border rounded-lg flex-grow"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            onClick={() => setIsModalOpen(true)}
          >
            Check In Member
          </button>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Currently Present Members</h2>
        </div>
        <div className="divide-y">
          {filteredMembers.length === 0 ? (
            <div className="p-4 text-gray-500 text-center">No members currently present</div>
          ) : (
            filteredMembers.map((member) => (
              <div key={member.id} className="p-4 flex items-center justify-between">
                <div>
                  <h3 className="font-medium">{member.name}</h3>
                  <p className="text-sm text-gray-500">
                    Checked in at {format(member.checkInTime, 'h:mm a')}
                  </p>
                </div>
                <button
                  onClick={() => handleCheckOut(member.id)}
                  className="text-red-500 hover:text-red-600"
                >
                  Check Out
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      <CheckInModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCheckIn={handleCheckIn}
      />
    </div>
  );
};

export default AttendancePage; 