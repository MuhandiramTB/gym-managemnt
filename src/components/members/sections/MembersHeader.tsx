import React from 'react';

interface MembersHeaderProps {
  onAddMember: () => void;
}

const MembersHeader: React.FC<MembersHeaderProps> = ({ onAddMember }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Members</h1>
        <p className="text-gray-400">Manage your gym members and their details</p>
      </div>
      <button
        onClick={onAddMember}
        className="bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
      >
        Add New Member
      </button>
    </div>
  );
};

export default MembersHeader; 