export type MemberStatus = 'active' | 'inactive' | 'suspended';

export interface Member {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipType: string;
  status: MemberStatus;
  joinDate: string;
  lastVisit: string;
  membershipExpiry: string;
  workoutPlans: WorkoutPlan[];
  fitnessGoals: FitnessGoal[];
}

export interface WorkoutPlan {
  id: string;
  name: string;
  exercises: Exercise[];
  duration: number;
  targetMuscleGroups: string[];
  createdAt: string;
  lastCompleted?: string;
}

export interface Exercise {
  name: string;
  sets: number;
  reps: number;
  restTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

export interface FitnessGoal {
  id: string;
  description: string;
  target: number;
  current: number;
  unit: string;
  deadline?: string;
  status: 'in-progress' | 'completed' | 'not-started';
}

export interface MemberFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  membershipType: string;
  status: MemberStatus;
  joinDate: string;
}

export interface CreateMemberModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (memberData: MemberFormData) => void;
  initialData?: Member | null;
} 