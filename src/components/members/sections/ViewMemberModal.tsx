import { FC } from 'react';
import { Member } from '../types';
import MembershipCard from './MembershipCard';
import WorkoutPlanGenerator from './WorkoutPlanGenerator';
import MemberProgress from './MemberProgress';

interface ViewMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  member: Member | null;
}

const ViewMemberModal: FC<ViewMemberModalProps> = ({
  isOpen,
  onClose,
  member,
}) => {
  if (!isOpen || !member) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-800 text-green-200';
      case 'inactive':
        return 'bg-gray-800 text-gray-200';
      case 'suspended':
        return 'bg-red-800 text-red-200';
      default:
        return 'bg-gray-800 text-gray-200';
    }
  };

  const handleSaveWorkoutPlan = (plan: any) => {
    // TODO: Implement workout plan saving logic
    console.log('Saving workout plan:', plan);
  };

  const handleUpdateProgress = (goalId: string, newValue: number) => {
    // TODO: Implement progress update logic
    console.log('Updating progress:', goalId, newValue);
  };

  const handleAddGoal = (goal: any) => {
    // TODO: Implement goal adding logic
    console.log('Adding goal:', goal);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#232B3B] rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-white">Member Details</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-6">
              <MembershipCard member={member} />
              
              <div className="bg-[#232B3B] rounded-lg p-6">
                <h3 className="text-xl font-semibold text-white mb-4">Member Information</h3>
                <div className="space-y-4">
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Email</h4>
                    <p className="text-white">{member.email}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Phone</h4>
                    <p className="text-white">{member.phone}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Membership Type</h4>
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-800 text-indigo-200">
                      {member.membershipType}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Status</h4>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(member.status)}`}>
                      {member.status.charAt(0).toUpperCase() + member.status.slice(1)}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Join Date</h4>
                    <p className="text-white">{member.joinDate}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-medium text-gray-400 mb-1">Last Visit</h4>
                    <p className="text-white">{member.lastVisit}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <WorkoutPlanGenerator
                member={member}
                onSavePlan={handleSaveWorkoutPlan}
              />
              
              <MemberProgress
                memberId={member.id.toString()}
                goals={member.fitnessGoals || []}
                onUpdateProgress={handleUpdateProgress}
                onAddGoal={handleAddGoal}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMemberModal; 