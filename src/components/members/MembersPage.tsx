import { FC, useState } from 'react';
import { Member, MemberFormData } from './types';
import CreateMemberModal from './sections/CreateMemberModal';
import ViewMemberModal from './sections/ViewMemberModal';
import MembersHeader from './sections/MembersHeader';
import MembersSearch from './sections/MembersSearch';
import MembersTable from './sections/MembersTable';

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

  return (
    <div className="p-6 max-w-7xl mx-auto bg-[#181F2A] min-h-screen">
      <MembersHeader onAddMember={() => setIsCreateModalOpen(true)} />
      
      <MembersSearch 
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <MembersTable
        members={filteredMembers}
        onViewMember={handleViewMember}
        onEditMember={handleEditClick}
        onDeleteMember={handleDeleteMember}
      />

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