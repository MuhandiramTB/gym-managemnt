import React from 'react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface MembersSearchProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const MembersSearch: React.FC<MembersSearchProps> = ({
  searchQuery,
  onSearchChange,
}) => {
  return (
    <div className="mb-6">
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search members by name, email, or phone..."
          className="w-full pl-10 pr-4 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default MembersSearch; 