import React, { useState, useEffect } from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import MemberCard from './MemberCard';
import MemberProgress from './MemberProgress';
import WorkoutPlan from './WorkoutPlan';
import { notificationService } from '../../services/notificationService';

interface Member {
  id: string;
  name: string;
  membershipType: string;
  membershipExpiry: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
}

const MemberManagement: React.FC = () => {
  const [member, setMember] = useState<Member>({
    id: '1',
    name: 'John Doe',
    membershipType: 'Premium',
    membershipExpiry: '2024-12-31',
    fitnessLevel: 'intermediate',
    goals: ['Weight Loss', 'Muscle Gain', 'Endurance'],
  });

  const [goals, setGoals] = useState([
    { id: '1', description: 'Lose 10kg', target: 10, current: 3, unit: 'kg' },
    { id: '2', description: 'Run 5km', target: 5, current: 2, unit: 'km' },
  ]);

  useEffect(() => {
    // Check for membership renewal notifications
    notificationService.checkRenewals([member]);
  }, [member]);

  const handleUpdateProgress = (goalId: string, newValue: number) => {
    setGoals(goals.map(goal => 
      goal.id === goalId ? { ...goal, current: newValue } : goal
    ));
  };

  const handleAddGoal = (newGoal: Omit<typeof goals[0], 'id'>) => {
    setGoals([...goals, { ...newGoal, id: Math.random().toString(36).substr(2, 9) }]);
  };

  const handleGeneratePlan = (exercises: any[]) => {
    // Handle the generated workout plan
    console.log('Generated workout plan:', exercises);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Member Management
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <MemberCard
              memberId={member.id}
              name={member.name}
              membershipType={member.membershipType}
              expiryDate={member.membershipExpiry}
            />
          </Grid>

          <Grid item xs={12} md={8}>
            <MemberProgress
              memberId={member.id}
              goals={goals}
              onUpdateProgress={handleUpdateProgress}
              onAddGoal={handleAddGoal}
            />
          </Grid>

          <Grid item xs={12}>
            <WorkoutPlan
              memberId={member.id}
              fitnessLevel={member.fitnessLevel}
              goals={member.goals}
              onGeneratePlan={handleGeneratePlan}
            />
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
};

export default MemberManagement; 