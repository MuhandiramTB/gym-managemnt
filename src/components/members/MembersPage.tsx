import { FC, useState } from 'react';
import { Card, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, TextInput } from '@tremor/react';
import { PlusIcon, MagnifyingGlassIcon, UserCircleIcon, PencilIcon, TrashIcon, EyeIcon } from '@heroicons/react/24/outline';
import CreateMemberModal from './CreateMemberModal';
import ViewMemberModal from './ViewMemberModal';
import { Member, MemberFormData } from './types';

const MembersPage: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [members, setMembers] = useState<Member[]>([
    {
      id: 1,
      firstName: 'John',
      lastName: 'Doe',
      email: 'john.doe@example.com',
      phone: '+1 234 567 890',
      membershipType: 'Premium Package',
      status: 'active',
      joinDate: '2024-01-15',
      lastVisit: '2024-03-10',
    },
    {
      id: 2,
      firstName: 'Jane',
      lastName: 'Smith',
      email: 'jane.smith@example.com',
      phone: '+1 234 567 891',
      membershipType: 'Basic Membership',
      status: 'inactive',
      joinDate: '2024-02-01',
      lastVisit: '2024-03-05',
    },
  ]);

  const handleCreateMember = (memberData: MemberFormData) => {
    const newMember: Member = {
      ...memberData,
      id: members.length + 1,
      lastVisit: new Date().toISOString().split('T')[0],
    };
    setMembers([...members, newMember]);
  };

  const handleEditMember = (memberData: MemberFormData) => {
    if (selectedMember) {
      const updatedMembers = members.map(member =>
        member.id === selectedMember.id
          ? { ...member, ...memberData }
          : member
      );
      setMembers(updatedMembers);
    }
  };

  const handleDeleteMember = (id: number) => {
    if (window.confirm('Are you sure you want to delete this member?')) {
      setMembers(members.filter(member => member.id !== id));
    }
  };

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const handleEditClick = (member: Member) => {
    setSelectedMember(member);
    setIsEditModalOpen(true);
  };

  const filteredMembers = members.filter(member => 
    member.firstName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
    <div className="p-6 max-w-7xl mx-auto bg-[#181F2A] min-h-screen">
      <div className="flex justify-between items-center mb-8">
        <div>
          <Title className="text-3xl font-bold text-white">Members</Title>
          <Text className="text-gray-400 mt-1">Manage your gym members and their memberships</Text>
        </div>
        <Button
          icon={PlusIcon}
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow-none border-0"
        >
          Add Member
        </Button>
      </div>

      <Card className="mb-6 bg-[#232B3B] text-gray-200 shadow-none border-0">
        <div className="relative">
          <TextInput
            icon={MagnifyingGlassIcon}
            placeholder="Search members by name or email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-[#232B3B] bg-[#181F2A] text-gray-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 transition-all duration-200"
          />
        </div>
      </Card>

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
            {filteredMembers.map((member) => (
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
                      onClick={() => handleViewMember(member)}
                      className="bg-[#232B3B] hover:bg-[#181F2A] text-gray-200 border-0 shadow-none"
                    >
                      <EyeIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => handleEditClick(member)}
                      className="bg-indigo-900 hover:bg-indigo-800 text-indigo-200 border-0 shadow-none"
                    >
                      <PencilIcon className="h-4 w-4" />
                    </Button>
                    <Button
                      size="xs"
                      variant="secondary"
                      color="red"
                      onClick={() => handleDeleteMember(member.id)}
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

      <CreateMemberModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSubmit={handleCreateMember}
      />

      <ViewMemberModal
        isOpen={isViewModalOpen}
        onClose={() => setIsViewModalOpen(false)}
        member={selectedMember}
      />

      <CreateMemberModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSubmit={handleEditMember}
        initialData={selectedMember}
      />
    </div>
  );
};

export default MembersPage; 