import { FC } from 'react';
import { Card } from '@tremor/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface MembersSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const MembersSearch: FC<MembersSearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <Card className="mb-6 bg-[#232B3B] text-gray-200 shadow-none border-0">
      <div className="relative">
        <span className="absolute inset-y-0 left-0 flex items-center pl-4">
          <MagnifyingGlassIcon className="h-5 w-5 text-indigo-400" />
        </span>
        <input
          type="text"
          placeholder="Search members by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-12 pr-4 py-2 rounded-lg border border-[#232B3B] bg-[#181F2A] text-gray-100 placeholder-gray-400 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
        />
      </div>
    </Card>
  );
};

export default MembersSearch; 