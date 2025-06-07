import React, { useState } from 'react';
import {
  Card,
  CardContent,
  Typography,
  LinearProgress,
  Box,
  Button,
  TextField,
  Grid,
} from '@mui/material';

interface Goal {
  id: string;
  description: string;
  target: number;
  current: number;
  unit: string;
}

interface MemberProgressProps {
  memberId: string;
  goals: Goal[];
  onUpdateProgress: (goalId: string, newValue: number) => void;
  onAddGoal: (goal: Omit<Goal, 'id'>) => void;
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
  });

  const handleAddGoal = () => {
    onAddGoal(newGoal);
    setNewGoal({
      description: '',
      target: 0,
      current: 0,
      unit: '',
    });
  };

  return (
    <Card sx={{ m: 2 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          Progress Tracking
        </Typography>
        
        <Box sx={{ mb: 4 }}>
          <Typography variant="h6" gutterBottom>
            Add New Goal
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Goal Description"
                value={newGoal.description}
                onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                type="number"
                label="Target"
                value={newGoal.target}
                onChange={(e) => setNewGoal({ ...newGoal, target: Number(e.target.value) })}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <TextField
                fullWidth
                label="Unit"
                value={newGoal.unit}
                onChange={(e) => setNewGoal({ ...newGoal, unit: e.target.value })}
              />
            </Grid>
            <Grid item xs={12} sm={2}>
              <Button
                fullWidth
                variant="contained"
                onClick={handleAddGoal}
                sx={{ height: '100%' }}
              >
                Add Goal
              </Button>
            </Grid>
          </Grid>
        </Box>

        <Typography variant="h6" gutterBottom>
          Current Goals
        </Typography>
        {goals.map((goal) => (
          <Box key={goal.id} sx={{ mb: 2 }}>
            <Typography variant="body1" gutterBottom>
              {goal.description}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <Box sx={{ flexGrow: 1, mr: 2 }}>
                <LinearProgress
                  variant="determinate"
                  value={(goal.current / goal.target) * 100}
                />
              </Box>
              <Typography variant="body2">
                {goal.current} / {goal.target} {goal.unit}
              </Typography>
            </Box>
            <TextField
              size="small"
              type="number"
              label="Update Progress"
              value={goal.current}
              onChange={(e) => onUpdateProgress(goal.id, Number(e.target.value))}
              sx={{ width: '150px' }}
            />
          </Box>
        ))}
      </CardContent>
    </Card>
  );
};

export default MemberProgress; 