import React, { useState } from 'react';
import { FitnessGoal } from '../types';

interface MemberProgressProps {
  memberId: string;
  goals: FitnessGoal[];
  onUpdateProgress: (goalId: string, newValue: number) => void;
  onAddGoal: (goal: Omit<FitnessGoal, 'id'>) => void;
}

const MemberProgress: React.FC<MemberProgressProps> = ({
  memberId,
  goals,
  onUpdateProgress,
  onAddGoal,
}) => {
  const [newGoal, setNewGoal] = useState({
    description: '',
    target: 0,
    current: 0,
    unit: '',
    deadline: '',
    status: 'not-started' as const
  });

  const handleAddGoal = () => {
    onAddGoal(newGoal);
    setNewGoal({
      description: '',
      target: 0,
      current: 0,
      unit: '',
      deadline: '',
      status: 'not-started'
    });
  };

  const getStatusColor = (status: FitnessGoal['status']) => {
    switch (status) {
      case 'completed':
        return 'bg-green-800 text-green-200';
      case 'in-progress':
        return 'bg-blue-800 text-blue-200';
      case 'not-started':
        return 'bg-gray-800 text-gray-200';
      default:
        return 'bg-gray-800 text-gray-200';
    }
  };

  return (
    <div className="bg-[#232B3B] rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Progress Tracking</h3>
      
      <div className="space-y-6">
        <div>
          <h4 className="text-lg font-medium text-white mb-4">Add New Goal</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Goal Description
              </label>
              <input
                type="text"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
                className="w-full px-3 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., Run 5km"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Unit
              </label>
              <input
                type="text"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
                className="w-full px-3 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                placeholder="e.g., km, kg, reps"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Target
              </label>
              <input
                type="number"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
                className="w-full px-3 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                min="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">
                Deadline
              </label>
              <input
                type="date"
                value={newGoal.deadline}
                onChange={(e) => setNewGoal({ ...newGoal, deadline: e.target.value })}
                className="w-full px-3 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>
          </div>
          <button
            onClick={handleAddGoal}
            disabled={!newGoal.description || !newGoal.unit || newGoal.target <= 0}
            className="mt-4 w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Add Goal
          </button>
        </div>

        <div>
          <h4 className="text-lg font-medium text-white mb-4">Current Goals</h4>
          <div className="space-y-4">
            {goals.map((goal) => (
              <div key={goal.id} className="bg-[#181F2A] rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h5 className="text-white font-medium">{goal.description}</h5>
                    <p className="text-sm text-gray-400">
                      Target: {goal.target} {goal.unit}
                    </p>
                  </div>
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(goal.status)}`}>
                    {goal.status.charAt(0).toUpperCase() + goal.status.slice(1)}
                  </span>
                </div>
                <div className="mt-2">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-300">Progress</span>
                    <span className="text-sm text-gray-300">
                      {goal.current} / {goal.target} {goal.unit}
                    </span>
                  </div>
                  <div className="w-full bg-gray-700 rounded-full h-2">
                    <div
                      className="bg-indigo-600 h-2 rounded-full"
                      style={{ width: `${(goal.current / goal.target) * 100}%` }}
                    />
                  </div>
                </div>
                <div className="mt-4">
                  <label className="block text-sm font-medium text-gray-300 mb-1">
                    Update Progress
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="number"
                      value={goal.current}
                      onChange={(e) => onUpdateProgress(goal.id, Number(e.target.value))}
                      className="flex-1 px-3 py-2 bg-[#232B3B] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      min="0"
                      max={goal.target}
                    />
                    <span className="text-gray-300 self-center">{goal.unit}</span>
                  </div>
                </div>
                {goal.deadline && (
                  <p className="mt-2 text-sm text-gray-400">
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MemberProgress; 