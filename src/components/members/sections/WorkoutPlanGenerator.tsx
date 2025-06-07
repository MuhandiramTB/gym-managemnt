import React, { useState } from 'react';
import { Member, WorkoutPlan } from '../types';

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  restTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface WorkoutPlanGeneratorProps {
  member: Member;
  onSavePlan: (plan: WorkoutPlan) => void;
}

const WorkoutPlanGenerator: React.FC<WorkoutPlanGeneratorProps> = ({ member, onSavePlan }) => {
  const [selectedGoals, setSelectedGoals] = useState<string[]>([]);
  const [selectedMuscleGroups, setSelectedMuscleGroups] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [duration, setDuration] = useState(45);

  const goals = [
    'Weight Loss',
    'Muscle Gain',
    'Endurance',
    'Strength',
    'Flexibility',
    'General Fitness'
  ];

  const muscleGroups = [
    'Chest',
    'Back',
    'Legs',
    'Shoulders',
    'Arms',
    'Core',
    'Full Body'
  ];

  const generateWorkoutPlan = () => {
    const exercises: Exercise[] = [];
    const planName = `${selectedGoals.join(', ')} - ${selectedMuscleGroups.join(', ')} Workout`;

    // Generate exercises based on selected muscle groups and difficulty
    selectedMuscleGroups.forEach(muscleGroup => {
      const exerciseCount = difficulty === 'beginner' ? 2 : difficulty === 'intermediate' ? 3 : 4;
      
      for (let i = 0; i < exerciseCount; i++) {
        exercises.push({
          name: `${muscleGroup} Exercise ${i + 1}`,
          sets: difficulty === 'beginner' ? 3 : difficulty === 'intermediate' ? 4 : 5,
          reps: difficulty === 'beginner' ? 12 : difficulty === 'intermediate' ? 10 : 8,
          restTime: difficulty === 'beginner' ? 90 : difficulty === 'intermediate' ? 60 : 45,
          difficulty
        });
      }
    });

    const plan: WorkoutPlan = {
      id: Math.random().toString(36).substr(2, 9),
      name: planName,
      exercises,
      duration,
      targetMuscleGroups: selectedMuscleGroups,
      createdAt: new Date().toISOString()
    };

    onSavePlan(plan);
  };

  return (
    <div className="bg-[#232B3B] rounded-lg p-6">
      <h3 className="text-xl font-semibold text-white mb-6">Generate Workout Plan</h3>
      
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Fitness Goals</label>
          <div className="grid grid-cols-2 gap-2">
            {goals.map(goal => (
              <label key={goal} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedGoals.includes(goal)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedGoals([...selectedGoals, goal]);
                    } else {
                      setSelectedGoals(selectedGoals.filter(g => g !== goal));
                    }
                  }}
                  className="rounded border-gray-600 bg-[#181F2A] text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-300">{goal}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Target Muscle Groups</label>
          <div className="grid grid-cols-2 gap-2">
            {muscleGroups.map(group => (
              <label key={group} className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={selectedMuscleGroups.includes(group)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedMuscleGroups([...selectedMuscleGroups, group]);
                    } else {
                      setSelectedMuscleGroups(selectedMuscleGroups.filter(g => g !== group));
                    }
                  }}
                  className="rounded border-gray-600 bg-[#181F2A] text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-gray-300">{group}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level</label>
          <select
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
            className="w-full px-3 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-300 mb-2">Workout Duration (minutes)</label>
          <input
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            min="15"
            max="120"
            step="15"
            className="w-full px-3 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <button
          onClick={generateWorkoutPlan}
          disabled={selectedGoals.length === 0 || selectedMuscleGroups.length === 0}
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Generate Workout Plan
        </button>
      </div>
    </div>
  );
};

export default WorkoutPlanGenerator; 