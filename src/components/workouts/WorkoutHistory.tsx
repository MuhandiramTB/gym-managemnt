import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

export interface WorkoutSession {
  id: string;
  date: Date;
  workoutPlanId: string;
  workoutPlanName: string;
  duration: number;
  exercises: {
    name: string;
    sets: number;
    reps: number;
    weight?: number;
    completed: boolean;
  }[];
  notes?: string;
  rating?: number;
}

interface WorkoutHistoryProps {
  sessions: WorkoutSession[];
  onViewSession: (session: WorkoutSession) => void;
}

const WorkoutHistory: React.FC<WorkoutHistoryProps> = ({
  sessions,
  onViewSession,
}) => {
  const sortedSessions = [...sessions].sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );

  const chartData = {
    labels: sortedSessions.slice(0, 7).map(session =>
      new Date(session.date).toLocaleDateString()
    ).reverse(),
    datasets: [
      {
        label: 'Workout Duration (minutes)',
        data: sortedSessions.slice(0, 7).map(session => session.duration).reverse(),
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        tension: 0.4,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          color: 'rgb(156, 163, 175)',
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
      },
      x: {
        ticks: {
          color: 'rgb(156, 163, 175)',
        },
        grid: {
          color: 'rgba(75, 85, 99, 0.2)',
        },
      },
    },
  };

  const getCompletionRate = (session: WorkoutSession) => {
    const completed = session.exercises.filter(ex => ex.completed).length;
    return Math.round((completed / session.exercises.length) * 100);
  };

  return (
    <div className="bg-[#232B3B] rounded-lg p-6">
      <h2 className="text-2xl font-bold text-white mb-6">Workout History</h2>

      <div className="mb-8">
        <h3 className="text-lg font-semibold text-white mb-4">Last 7 Workouts</h3>
        <div className="bg-[#181F2A] p-4 rounded-lg">
          <Line data={chartData} options={chartOptions} />
        </div>
      </div>

      <div className="space-y-4">
        {sortedSessions.map((session) => (
          <div
            key={session.id}
            className="bg-[#181F2A] rounded-lg p-4 hover:bg-[#1E2536] transition-colors duration-200 cursor-pointer"
            onClick={() => onViewSession(session)}
          >
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="text-lg font-medium text-white">
                  {session.workoutPlanName}
                </h3>
                <p className="text-sm text-gray-400">
                  {new Date(session.date).toLocaleDateString()}
                </p>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <p className="text-sm text-gray-400">Duration</p>
                  <p className="text-white font-medium">{session.duration} min</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400">Completion</p>
                  <p className="text-white font-medium">
                    {getCompletionRate(session)}%
                  </p>
                </div>
                {session.rating && (
                  <div className="text-right">
                    <p className="text-sm text-gray-400">Rating</p>
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <span
                          key={i}
                          className={`text-lg ${
                            i < (session.rating ?? 0)
                              ? 'text-yellow-400'
                              : 'text-gray-600'
                          }`}
                        >
                          ★
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              {session.exercises.map((exercise, index) => (
                <span
                  key={index}
                  className={`px-2 py-1 rounded-full text-xs ${
                    exercise.completed
                      ? 'bg-green-800 text-green-200'
                      : 'bg-gray-700 text-gray-400'
                  }`}
                >
                  {exercise.name}
                </span>
              ))}
            </div>

            {session.notes && (
              <p className="mt-3 text-sm text-gray-400">{session.notes}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default WorkoutHistory; 