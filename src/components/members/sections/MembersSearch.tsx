import { FC } from 'react';
import { Card, TextInput } from '@tremor/react';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

interface MembersSearchProps {
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const MembersSearch: FC<MembersSearchProps> = ({ searchQuery, onSearchChange }) => {
  return (
    <Card className="mb-6 bg-[#232B3B] text-gray-200 shadow-none border-0">
      <div className="relative">
        <TextInput
          icon={MagnifyingGlassIcon}
          placeholder="Search members by name or email..."
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#232B3B] bg-white text-gray-900 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
        />
      </div>
    </Card>
  );
};

export default MembersSearch; 