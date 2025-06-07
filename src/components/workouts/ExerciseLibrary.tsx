import React, { useState } from 'react';

export interface Exercise {
  id: string;
  name: string;
  description: string;
  muscleGroups: string[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  equipment: string[];
  instructions: string[];
  imageUrl: string;
  videoUrl?: string;
}

interface ExerciseLibraryProps {
  exercises: Exercise[];
  onSelectExercise: (exercise: Exercise) => void;
}

const ExerciseLibrary: React.FC<ExerciseLibraryProps> = ({
  exercises,
  onSelectExercise,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('all');
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>('all');

  const muscleGroups = Array.from(
    new Set(exercises.flatMap(ex => ex.muscleGroups))
  );

  const filteredExercises = exercises.filter(exercise => {
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      exercise.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesMuscleGroup = selectedMuscleGroup === 'all' ||
      exercise.muscleGroups.includes(selectedMuscleGroup);
    const matchesDifficulty = selectedDifficulty === 'all' ||
      exercise.difficulty === selectedDifficulty;
    return matchesSearch && matchesMuscleGroup && matchesDifficulty;
  });

  const getDifficultyColor = (difficulty: Exercise['difficulty']) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-800 text-green-200';
      case 'intermediate':
        return 'bg-yellow-800 text-yellow-200';
      case 'advanced':
        return 'bg-red-800 text-red-200';
      default:
        return 'bg-gray-800 text-gray-200';
    }
  };

  return (
    <div className="bg-[#232B3B] rounded-lg p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-4">Exercise Library</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <input
              type="text"
              placeholder="Search exercises..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          
          <div>
            <select
              value={selectedMuscleGroup}
              onChange={(e) => setSelectedMuscleGroup(e.target.value)}
              className="w-full px-4 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Muscle Groups</option>
              {muscleGroups.map(group => (
                <option key={group} value={group}>
                  {group.charAt(0).toUpperCase() + group.slice(1)}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="w-full px-4 py-2 bg-[#181F2A] border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <option value="all">All Difficulties</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredExercises.map((exercise) => (
          <div
            key={exercise.id}
            className="bg-[#181F2A] rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
          >
            <div className="relative h-48">
              <img
                src={exercise.imageUrl}
                alt={exercise.name}
                className="w-full h-full object-cover"
              />
              <span className={`absolute top-2 right-2 px-2 py-1 rounded-full text-xs font-medium ${getDifficultyColor(exercise.difficulty)}`}>
                {exercise.difficulty.charAt(0).toUpperCase() + exercise.difficulty.slice(1)}
              </span>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-semibold text-white mb-2">
                {exercise.name}
              </h3>
              
              <p className="text-sm text-gray-400 mb-3">
                {exercise.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-3">
                {exercise.muscleGroups.map(group => (
                  <span
                    key={group}
                    className="px-2 py-1 bg-indigo-800 text-indigo-200 rounded-full text-xs"
                  >
                    {group}
                  </span>
                ))}
              </div>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {exercise.equipment.map(item => (
                  <span
                    key={item}
                    className="px-2 py-1 bg-gray-700 text-gray-300 rounded-full text-xs"
                  >
                    {item}
                  </span>
                ))}
              </div>
              
              <button
                onClick={() => onSelectExercise(exercise)}
                className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Add to Workout
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExerciseLibrary; 