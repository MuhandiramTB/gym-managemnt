import React from 'react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface MembersHeaderProps {
  onCreateClick: () => void;
}

const MembersHeader: React.FC<MembersHeaderProps> = ({ onCreateClick }) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-white">Members</h1>
      <button
        onClick={onCreateClick}
        className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
      >
        <PlusIcon className="h-5 w-5" />
        Add Member
      </button>
    </div>
  );
};

export default MembersHeader; 