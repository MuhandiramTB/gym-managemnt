import React, { useRef, useState } from 'react';
import { Member, FitnessGoal, WorkoutPlan } from '../types';
import MembershipCard from '../sections/MembershipCard';
import MemberProgress from '../sections/MemberProgress';
import WorkoutPlanGenerator from '../sections/WorkoutPlanGenerator';
import ProgressPhotos from '../../progress/ProgressPhotos';
import PersonalInfo from '../sections/PersonalInfo';
import MembershipDetails from '../sections/MembershipDetails';
import MemberActions from '../sections/MemberActions';

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
  const [showDetails, setShowDetails] = useState(false);
  const [showProgress, setShowProgress] = useState(false);
  const [showPhotos, setShowPhotos] = useState(false);
  const [showWorkoutPlan, setShowWorkoutPlan] = useState(false);
  const [showMembershipDetails, setShowMembershipDetails] = useState(false);
  const workoutPlanRef = useRef<HTMLDivElement>(null);

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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleEditClick = () => {
    onClose();
    setTimeout(() => onEdit(member), 0);
  };

  const handleGenerateWorkoutPlan = () => {
    setShowWorkoutPlan(true);
    setTimeout(() => {
      workoutPlanRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 100);
  };

  const handleViewDetails = () => {
    const newShowDetails = !showDetails;
    setShowDetails(newShowDetails);
    if (newShowDetails) {
      setShowProgress(true);
      setShowPhotos(true);
      setShowWorkoutPlan(true);
      setShowMembershipDetails(true);
    } else {
      setShowProgress(false);
      setShowPhotos(false);
      setShowWorkoutPlan(false);
      setShowMembershipDetails(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm mt-40"
      onClick={handleOverlayClick}
    >
      <div className="bg-[#232B3B] rounded-2xl shadow-2xl p-6 w-full max-w-2xl sm:max-w-4xl mx-2 mt-40 transition-all max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        {/* Primary View - QR and Basic Info */}
        <div className="mb-6 mt-10">
          <MembershipCard member={member} />
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <button
              onClick={handleViewDetails}
              className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
            >
              {showDetails ? 'Hide Details' : 'View All Details'}
            </button>
            <button
              onClick={() => setShowMembershipDetails(!showMembershipDetails)}
              className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
            >
              {showMembershipDetails ? 'Hide Membership' : 'Show Membership'}
            </button>
            <button
              onClick={() => setShowProgress(!showProgress)}
              className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
            >
              {showProgress ? 'Hide Progress' : 'Show Progress'}
            </button>
            <button
              onClick={() => setShowPhotos(!showPhotos)}
              className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
            >
              {showPhotos ? 'Hide Photos' : 'Show Photos'}
            </button>
            <button
              onClick={() => setShowWorkoutPlan(!showWorkoutPlan)}
              className="px-6 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow"
            >
              {showWorkoutPlan ? 'Hide Workout Plan' : 'Show Workout Plan'}
            </button>
          </div>
        </div>

        {/* Secondary Views - Feature Sections */}
        <div className="space-y-6 mt-6">
          {/* Membership Details Section */}
          {showMembershipDetails && (
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-bold text-white mb-4">Membership Details</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <PersonalInfo member={member} />
                <MembershipDetails member={member} />
              </div>
            </div>
          )}

          {/* Progress Tracking Section */}
          {showProgress && (
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-bold text-white mb-4">Progress Tracking</h3>
              <MemberProgress
                memberId={member.id}
                goals={member.fitnessGoals}
                onUpdateProgress={handleUpdateGoal}
                onAddGoal={handleAddGoal}
              />
            </div>
          )}

          {/* Progress Photos Section */}
          {showPhotos && (
            <div className="border-t border-gray-700 pt-6">
              <h3 className="text-xl font-bold text-white mb-4">Progress Photos</h3>
              <ProgressPhotos
                photos={member.progressPhotos || []}
                onAddPhoto={(photo) => onAddPhoto(member.id, photo)}
                onDeletePhoto={(photoId) => onDeletePhoto(member.id, photoId)}
              />
            </div>
          )}

          {/* Workout Plan Section */}
          {showWorkoutPlan && (
            <div className="border-t border-gray-700 pt-6" ref={workoutPlanRef}>
              <h3 className="text-xl font-bold text-white mb-4">Workout Plan</h3>
              <WorkoutPlanGenerator
                member={member}
                onSavePlan={(plan) => onUpdateWorkoutPlan(member.id, plan)}
              />
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <MemberActions
          onEdit={handleEditClick}
          onDelete={() => onDelete(member.id)}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default MemberViewModal;