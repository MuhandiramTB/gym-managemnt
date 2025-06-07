import React, { useState, useEffect } from 'react';
import { Member, MemberFormData } from './types';
import { ProgressPhoto } from '../progress/ProgressPhotos';
import MembersHeader from './sections/MembersHeader';
import MembersSearch from './sections/MembersSearch';
import MembersTable from './sections/MembersTable';
import MemberFormModal from './modals/MemberFormModal';
import MemberViewModal from './modals/MemberViewModal';
import { v4 as uuidv4 } from 'uuid';

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<Member | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Check for membership renewals daily
  useEffect(() => {
    const checkRenewals = () => {
      const today = new Date();
      const thirtyDaysFromNow = new Date(today);
      thirtyDaysFromNow.setDate(today.getDate() + 30);

      members.forEach((member) => {
        const expiryDate = new Date(member.membershipExpiry);
        if (expiryDate <= thirtyDaysFromNow && expiryDate > today) {
          console.log(
            `Notification: ${member.name}'s membership expires on ${expiryDate.toLocaleDateString()}`
          );
        }
      });
    };

    // Check immediately and then every 24 hours
    checkRenewals();
    const interval = setInterval(checkRenewals, 24 * 60 * 60 * 1000);

    return () => clearInterval(interval);
  }, [members]);

  const handleCreateMember = (formData: MemberFormData) => {
    const newMember: Member = {
      id: uuidv4(),
      ...formData,
      lastVisit: undefined,
      fitnessGoals: [],
      workoutPlans: [],
      progressPhotos: [],
    };
    setMembers([...members, newMember]);
    setIsCreateModalOpen(false);
  };

  const handleEditMember = (member: Member) => {
    setMembers(
      members.map((m) => (m.id === member.id ? { ...m, ...member } : m))
    );
    setIsViewModalOpen(false);
  };

  const handleDeleteMember = (id: string) => {
    setMembers(members.filter((m) => m.id !== id));
    setIsViewModalOpen(false);
  };

  const handleViewMember = (member: Member) => {
    setSelectedMember(member);
    setIsViewModalOpen(true);
  };

  const handleUpdateProgress = (memberId: string, progress: Member['fitnessGoals']) => {
    setMembers(
      members.map((m) =>
        m.id === memberId ? { ...m, fitnessGoals: progress } : m
      )
    );
  };

  const handleUpdateWorkoutPlan = (memberId: string, workoutPlan: Member['workoutPlans'][0]) => {
    setMembers(
      members.map((m) =>
        m.id === memberId
          ? {
              ...m,
              workoutPlans: m.workoutPlans.map((wp) =>
                wp.id === workoutPlan.id ? workoutPlan : wp
              ),
            }
          : m
      )
    );
  };

  const handleAddPhoto = (memberId: string, photo: Omit<ProgressPhoto, 'id'>) => {
    const newPhoto: ProgressPhoto = {
      id: uuidv4(),
      ...photo,
    };
    setMembers(
      members.map((m) =>
        m.id === memberId
          ? {
              ...m,
              progressPhotos: [...(m.progressPhotos || []), newPhoto],
            }
          : m
      )
    );
  };

  const handleDeletePhoto = (memberId: string, photoId: string) => {
    setMembers(
      members.map((m) =>
        m.id === memberId
          ? {
              ...m,
              progressPhotos: (m.progressPhotos || []).filter(
                (p) => p.id !== photoId
              ),
            }
          : m
      )
    );
  };

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.phone.includes(searchQuery)
  );

  return (
    <div className="p-6">
      <MembersHeader onCreateClick={() => setIsCreateModalOpen(true)} />
      <MembersSearch
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <MembersTable
        members={filteredMembers}
        onView={handleViewMember}
        onEdit={handleEditMember}
        onDelete={handleDeleteMember}
      />

      {isCreateModalOpen && (
        <MemberFormModal
          onClose={() => setIsCreateModalOpen(false)}
          onSubmit={handleCreateMember}
        />
      )}

      {isViewModalOpen && selectedMember && (
        <MemberViewModal
          member={selectedMember}
          onClose={() => setIsViewModalOpen(false)}
          onEdit={handleEditMember}
          onDelete={handleDeleteMember}
          onUpdateProgress={handleUpdateProgress}
          onUpdateWorkoutPlan={handleUpdateWorkoutPlan}
          onAddPhoto={handleAddPhoto}
          onDeletePhoto={handleDeletePhoto}
        />
      )}
    </div>
  );
};

export default MembersPage; 