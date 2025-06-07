import { FC, useState, useEffect } from 'react';
import { Member, MemberFormData, WorkoutPlan, FitnessGoal } from './types';
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
      membershipExpiry: '2025-01-15',
      workoutPlans: [],
      fitnessGoals: []
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
      membershipExpiry: '2025-02-01',
      workoutPlans: [],
      fitnessGoals: []
    },
  ]);

  // Check for membership renewals
  useEffect(() => {
    const checkRenewals = () => {
      const thirtyDaysFromNow = new Date();
      thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);

      members.forEach(member => {
        const expiryDate = new Date(member.membershipExpiry);
        if (expiryDate <= thirtyDaysFromNow) {
          // TODO: Implement notification system
          console.log(`Membership renewal needed for ${member.firstName} ${member.lastName}`);
        }
      });
    };

    checkRenewals();
    const interval = setInterval(checkRenewals, 24 * 60 * 60 * 1000); // Check daily
    return () => clearInterval(interval);
  }, [members]);

  const handleCreateMember = (memberData: MemberFormData) => {
    const newMember: Member = {
      ...memberData,
      id: members.length + 1,
      joinDate: new Date().toISOString().split('T')[0],
      lastVisit: new Date().toISOString().split('T')[0],
      membershipExpiry: new Date(new Date().setFullYear(new Date().getFullYear() + 1)).toISOString().split('T')[0],
      workoutPlans: [],
      fitnessGoals: [],
      status: 'active'
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

  const handleSaveWorkoutPlan = (memberId: number, plan: WorkoutPlan) => {
    const updatedMembers = members.map(member =>
      member.id === memberId
        ? {
            ...member,
            workoutPlans: [...member.workoutPlans, { ...plan, createdAt: new Date().toISOString() }]
          }
        : member
    );
    setMembers(updatedMembers);
  };

  const handleUpdateProgress = (memberId: number, goalId: string, newValue: number) => {
    const updatedMembers = members.map(member =>
      member.id === memberId
        ? {
            ...member,
            fitnessGoals: member.fitnessGoals.map(goal =>
              goal.id === goalId
                ? {
                    ...goal,
                    current: newValue,
                    status: newValue >= goal.target ? 'completed' as const : 'in-progress' as const
                  }
                : goal
            )
          }
        : member
    );
    setMembers(updatedMembers);
  };

  const handleAddGoal = (memberId: number, goal: Omit<FitnessGoal, 'id'>) => {
    const newGoal: FitnessGoal = {
      ...goal,
      id: Math.random().toString(36).substr(2, 9),
      status: 'not-started'
    };

    const updatedMembers = members.map(member =>
      member.id === memberId
        ? {
            ...member,
            fitnessGoals: [...member.fitnessGoals, newGoal]
          }
        : member
    );
    setMembers(updatedMembers);
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