import { FC } from 'react';
import { Card, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button } from '@tremor/react';
import { UserCircleIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import { Member } from '../types';

interface MembersTableProps {
  members: Member[];
  onViewMember: (member: Member) => void;
  onEditMember: (member: Member) => void;
  onDeleteMember: (id: number) => void;
}

const MembersTable: FC<MembersTableProps> = ({
  members,
  onViewMember,
  onEditMember,
  onDeleteMember,
}) => {
  const getStatusColor = (status: Member['status']) => {
    switch (status) {
      case 'active':
        return 'emerald';
      case 'inactive':
        return 'gray';
      case 'suspended':
        return 'red';
      default:
        return 'gray';
    }
  };

  return (
    <Card className="bg-[#232B3B] text-gray-200 shadow-none border-0">
      <Table>
        <TableHead>
          <TableRow className="border-b border-[#232B3B] bg-[#232B3B]">
            <TableHeaderCell className="text-gray-400 font-semibold">Member</TableHeaderCell>
            <TableHeaderCell className="text-gray-400 font-semibold">Contact</TableHeaderCell>
            <TableHeaderCell className="text-gray-400 font-semibold">Membership</TableHeaderCell>
            <TableHeaderCell className="text-gray-400 font-semibold">Join Date</TableHeaderCell>
            <TableHeaderCell className="text-gray-400 font-semibold">Last Visit</TableHeaderCell>
            <TableHeaderCell className="text-gray-400 font-semibold">Status</TableHeaderCell>
            <TableHeaderCell className="text-gray-400 font-semibold">Actions</TableHeaderCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {members.map((member) => (
            <TableRow key={member.id} className="hover:bg-[#181F2A] transition-colors duration-200">
              <TableCell>
                <div className="flex items-center space-x-3">
                  <div className="flex-shrink-0">
                    <div className="h-10 w-10 rounded-full bg-indigo-900 flex items-center justify-center">
                      <UserCircleIcon className="h-8 w-8 text-indigo-400" />
                    </div>
                  </div>
                  <div>
                    <div className="font-medium text-white">{member.firstName} {member.lastName}</div>
                    <div className="text-sm text-gray-400">ID: {member.id}</div>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="text-sm text-white">{member.email}</div>
                <div className="text-sm text-gray-400">{member.phone}</div>
              </TableCell>
              <TableCell>
                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-800 text-indigo-200">
                  {member.membershipType}
                </span>
              </TableCell>
              <TableCell className="text-sm text-gray-300">{member.joinDate}</TableCell>
              <TableCell className="text-sm text-gray-300">{member.lastVisit}</TableCell>
              <TableCell>
                <Badge color={getStatusColor(member.status)} className="px-2.5 py-0.5 rounded-full text-xs font-medium" style={{backgroundColor: member.status === 'active' ? '#059669' : member.status === 'inactive' ? '#6B7280' : '#DC2626', color: '#fff'}}>
                  {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                </Badge>
              </TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="xs"
                    variant="secondary"
                    onClick={() => onViewMember(member)}
                    className="bg-[#232B3B] hover:bg-[#181F2A] text-gray-200 border-0 shadow-none"
                  >
                    <EyeIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="xs"
                    variant="secondary"
                    onClick={() => onEditMember(member)}
                    className="bg-indigo-900 hover:bg-indigo-800 text-indigo-200 border-0 shadow-none"
                  >
                    <PencilIcon className="h-4 w-4" />
                  </Button>
                  <Button
                    size="xs"
                    variant="secondary"
                    color="red"
                    onClick={() => onDeleteMember(member.id)}
                    className="bg-red-900 hover:bg-red-800 text-red-200 border-0 shadow-none"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  );
};

export default MembersTable; 