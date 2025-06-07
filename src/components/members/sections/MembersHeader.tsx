import { FC } from 'react';
import { Title, Text, Button } from '@tremor/react';
import { PlusIcon } from '@heroicons/react/24/outline';

interface MembersHeaderProps {
  onAddMember: () => void;
}

const MembersHeader: FC<MembersHeaderProps> = ({ onAddMember }) => {
  return (
    <div className="flex justify-between items-center mb-8">
      <div>
        <Title className="text-3xl font-bold text-white">Members</Title>
        <Text className="text-gray-400 mt-1">Manage your gym members and their memberships</Text>
      </div>
      <Button
        icon={PlusIcon}
        onClick={onAddMember}
        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-none border-0"
      >
        Add Member
      </Button>
    </div>
  );
};

export default MembersHeader; 