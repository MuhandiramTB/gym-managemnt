import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Grid,
} from '@mui/material';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: number;
  restTime: number;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
}

interface WorkoutPlanProps {
  memberId: string;
  fitnessLevel: 'beginner' | 'intermediate' | 'advanced';
  goals: string[];
  onGeneratePlan: (exercises: Exercise[]) => void;
}

const WorkoutPlan: React.FC<WorkoutPlanProps> = ({
  memberId,
  fitnessLevel,
  goals,
  onGeneratePlan,
}) => {
  const [selectedGoal, setSelectedGoal] = useState('');
  const [workoutDays, setWorkoutDays] = useState(3);
  const [exercisesPerDay, setExercisesPerDay] = useState(4);

  const generatePlan = () => {
    // This would typically call an API or use a more sophisticated algorithm
    const sampleExercises: Exercise[] = [
      {
        id: '1',
        name: 'Push-ups',
        sets: 3,
        reps: 12,
        restTime: 60,
        difficulty: fitnessLevel,
      },
      {
        id: '2',
        name: 'Squats',
        sets: 4,
        reps: 15,
        restTime: 90,
        difficulty: fitnessLevel,
      },
      // Add more exercises based on the selected goal and fitness level
    ];

    onGeneratePlan(sampleExercises);
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Custom Workout Plan Generator
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Fitness Goal</InputLabel>
              <Select
                value={selectedGoal}
                label="Fitness Goal"
                onChange={(e) => setSelectedGoal(e.target.value)}
              >
                {goals.map((goal) => (
                  <MenuItem key={goal} value={goal}>
                    {goal}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type="number"
              label="Workout Days per Week"
              value={workoutDays}
              onChange={(e) => setWorkoutDays(Number(e.target.value))}
              inputProps={{ min: 1, max: 7 }}
            />
          </Grid>

          <Grid item xs={12} sm={3}>
            <TextField
              fullWidth
              type="number"
              label="Exercises per Day"
              value={exercisesPerDay}
              onChange={(e) => setExercisesPerDay(Number(e.target.value))}
              inputProps={{ min: 1, max: 10 }}
            />
          </Grid>

          <Grid item xs={12}>
            <Button
              variant="contained"
              color="primary"
              onClick={generatePlan}
              fullWidth
            >
              Generate Workout Plan
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default WorkoutPlan; 