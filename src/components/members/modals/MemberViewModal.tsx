import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { Member, FitnessGoal, WorkoutPlan } from '../types';
import MembershipCard from '../sections/MembershipCard';
import MemberProgress from '../sections/MemberProgress';
import WorkoutPlanGenerator from '../sections/WorkoutPlanGenerator';
import ProgressPhotos from '../../progress/ProgressPhotos';

interface MemberViewModalProps {
  member: Member;
  onClose: () => void;
  onEdit: (member: Member) => void;
  onDelete: (id: string) => void;
  onUpdateProgress: (memberId: string, progress: FitnessGoal[]) => void;
  onUpdateWorkoutPlan: (memberId: string, workoutPlan: WorkoutPlan) => void;
  onAddPhoto: (memberId: string, photo: Omit<Member['progressPhotos'][0], 'id'>) => void;
  onDeletePhoto: (memberId: string, photoId: string) => void;
}

const MemberViewModal: React.FC<MemberViewModalProps> = ({
  member,
  onClose,
  onEdit,
  onDelete,
  onUpdateProgress,
  onUpdateWorkoutPlan,
  onAddPhoto,
  onDeletePhoto,
}) => {
  const handleAddGoal = (goal: Omit<FitnessGoal, 'id'>) => {
    const newGoal: FitnessGoal = {
      id: crypto.randomUUID(),
      ...goal,
    };
    onUpdateProgress(member.id, [...member.fitnessGoals, newGoal]);
  };

  const handleUpdateGoal = (goalId: string, newValue: number) => {
    const updatedGoals = member.fitnessGoals.map(goal =>
      goal.id === goalId ? { ...goal, current: newValue } : goal
    );
    onUpdateProgress(member.id, updatedGoals);
  };

  // Helper to handle overlay click
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Helper for edit button
  const handleEditClick = () => {
    onClose();
    setTimeout(() => onEdit(member), 0);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#232B3B] rounded-2xl shadow-2xl p-6 w-full max-w-2xl sm:max-w-4xl mx-2 mt-40 transition-all max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Member Details</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white"
            aria-label="Close"
          >
            <XMarkIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="space-y-6">
            <div className="bg-[#181F2A] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Personal Information</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="text-gray-400">Name:</span> {member.name}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Email:</span> {member.email}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Phone:</span> {member.phone}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Join Date:</span>{' '}
                  {new Date(member.joinDate).toLocaleDateString()}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Last Visit:</span>{' '}
                  {member.lastVisit
                    ? new Date(member.lastVisit).toLocaleDateString()
                    : 'Never'}
                </p>
              </div>
            </div>

            <div className="bg-[#181F2A] rounded-lg p-4">
              <h3 className="text-lg font-semibold text-white mb-4">Membership Details</h3>
              <div className="space-y-2">
                <p className="text-gray-300">
                  <span className="text-gray-400">Type:</span> {member.membershipType}
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Status:</span>{' '}
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      member.status === 'active'
                        ? 'bg-green-500 text-white'
                        : member.status === 'suspended'
                        ? 'bg-red-500 text-white'
                        : 'bg-gray-500 text-white'
                    }`}
                  >
                    {member.status}
                  </span>
                </p>
                <p className="text-gray-300">
                  <span className="text-gray-400">Expiry:</span>{' '}
                  {new Date(member.membershipExpiry).toLocaleDateString()}
                </p>
              </div>
            </div>

            <MembershipCard member={member} />
          </div>

          <div className="space-y-6">
            <MemberProgress
              memberId={member.id}
              goals={member.fitnessGoals}
              onUpdateProgress={handleUpdateGoal}
              onAddGoal={handleAddGoal}
            />

            <WorkoutPlanGenerator
              member={member}
              onSavePlan={(plan) => onUpdateWorkoutPlan(member.id, plan)}
            />

            <ProgressPhotos
              photos={member.progressPhotos || []}
              onAddPhoto={(photo) => onAddPhoto(member.id, photo)}
              onDeletePhoto={(photoId) => onDeletePhoto(member.id, photoId)}
            />
          </div>
        </div>

        <div className="flex flex-wrap justify-end gap-3 mt-6">
          <button
            onClick={handleEditClick}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Edit Member
          </button>
          <button
            onClick={() => onDelete(member.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500"
          >
            Delete Member
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-300 bg-gray-700 rounded-md hover:text-white hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MemberViewModal; 