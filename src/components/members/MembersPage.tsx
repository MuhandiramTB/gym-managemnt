import { FC, useState } from 'react';
import { Card, Title, Text, Table, TableHead, TableRow, TableHeaderCell, TableBody, TableCell, Badge, Button, TextInput } from '@tremor/react';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import CreateMemberModal from './CreateMemberModal';
import { Member, MemberFormData } from './types';

const MembersPage: FC = () => {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
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

  const handleDeleteMember = (id: number) => {
    setMembers(members.filter(member => member.id !== id));
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <Title>Members</Title>
          <Text>Manage your gym members and their memberships</Text>
        </div>
        <Button
          icon={PlusIcon}
          onClick={() => setIsCreateModalOpen(true)}
        >
          Add Member
        </Button>
      </div>

      <Card className="mb-6">
        <TextInput
          icon={MagnifyingGlassIcon}
          placeholder="Search members..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </Card>

      <Card>
        <Table>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Name</TableHeaderCell>
              <TableHeaderCell>Contact</TableHeaderCell>
              <TableHeaderCell>Membership</TableHeaderCell>
              <TableHeaderCell>Join Date</TableHeaderCell>
              <TableHeaderCell>Last Visit</TableHeaderCell>
              <TableHeaderCell>Status</TableHeaderCell>
              <TableHeaderCell>Actions</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredMembers.map((member) => (
              <TableRow key={member.id}>
                <TableCell>
                  {member.firstName} {member.lastName}
                </TableCell>
                <TableCell>
                  <div>{member.email}</div>
                  <div className="text-gray-500">{member.phone}</div>
                </TableCell>
                <TableCell>{member.membershipType}</TableCell>
                <TableCell>{member.joinDate}</TableCell>
                <TableCell>{member.lastVisit}</TableCell>
                <TableCell>
                  <Badge color={getStatusColor(member.status)}>
                    {member.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex gap-2">
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => {/* TODO: Implement view details */}}
                    >
                      View
                    </Button>
                    <Button
                      size="xs"
                      variant="secondary"
                      onClick={() => {/* TODO: Implement edit */}}
                    >
                      Edit
                    </Button>
                    <Button
                      size="xs"
                      variant="secondary"
                      color="red"
                      onClick={() => handleDeleteMember(member.id)}
                    >
                      Delete
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
    </div>
  );
};

export default MembersPage; 