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
    <div className="p-6 max-w-4xl mx-auto bg-[#181F2A] min-h-screen">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-4">Gym Attendance</h1>
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Search members..."
            className="px-4 py-2 border border-[#232B3B] bg-[#181F2A] text-gray-200 rounded-lg flex-grow focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <button
            className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg border-0 shadow-none w-full sm:w-auto"
            onClick={() => setIsModalOpen(true)}
          >
            Check In Member
          </button>
        </div>
      </div>

      <div className="bg-[#232B3B] text-gray-200 rounded-lg shadow-none border-0">
        <div className="p-4 border-b border-[#232B3B]">
          <h2 className="text-lg font-semibold text-white">Currently Present Members</h2>
        </div>
        <div className="divide-y divide-[#181F2A]">
          {filteredMembers.length === 0 ? (
            <div className="p-4 text-gray-400 text-center">No members currently present</div>
          ) : (
            filteredMembers.map((member) => (
              <div key={member.id} className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                <div>
                  <h3 className="font-medium text-white">{member.name}</h3>
                  <p className="text-sm text-gray-400">
                    Checked in at {format(member.checkInTime, 'h:mm a')}
                  </p>
                </div>
                <button
                  onClick={() => handleCheckOut(member.id)}
                  className="text-red-400 hover:text-red-200 px-4 py-2 rounded-lg border-0 shadow-none bg-[#181F2A]"
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