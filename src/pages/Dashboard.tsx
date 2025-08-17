import React from 'react';
import { Box, Typography, Paper, Stack, Avatar, Button, Divider } from '@mui/material';
import { EmojiEvents, Quiz, FactCheck, Star } from '@mui/icons-material';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const analyticsData = [
  { name: 'Correct', value: 70 },
  { name: 'Incorrect', value: 30 },
];

const recentActivity = [
  'Completed Advanced Quiz',
  'Verified 3 news articles',
  'Earned "Fact Checker" Badge',
  'Posted in Social Feed',
];

const badges = ['First Quiz', '50 Facts Checked', 'Daily Streak', 'Top Scorer'];

const Dashboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      {/* Welcome Banner */}
      <Paper
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
          background: 'linear-gradient(90deg, #4facfe 0%, #00f2fe 100%)',
          color: 'white',
        }}
      >
        <Stack direction="row" alignItems="center" spacing={2}>
          <Avatar sx={{ bgcolor: 'white', color: '#4facfe', width: 56, height: 56 }}>User</Avatar>
          <Box>
            <Typography variant="h5" fontWeight="bold">
              Welcome, User!
            </Typography>
            <Typography>Keep learning and fighting misinformation today!</Typography>
          </Box>
        </Stack>
      </Paper>

      {/* Quick Actions */}
      {/* <Paper sx={{ p: 3, mb: 4, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Quick Actions</Typography>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
          <Button variant="contained" color="primary">Start Quiz</Button>
          <Button variant="contained" color="success">Post Content</Button>
          <Button variant="contained" color="warning">Upload for AI Verification</Button>
          <Button variant="contained" color="secondary">View Guidelines</Button>
        </Stack>
      </Paper> */}

      {/* Top Stats / Progress Cards */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 3,
          mb: 4,
        }}
      >
        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <Quiz fontSize="large" color="primary" />
            <Typography variant="h6">Quiz Progress</Typography>
          </Stack>
          <Typography sx={{ mt: 2 }}>Score: 750</Typography>
          <Typography>Accuracy: 75%</Typography>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <FactCheck fontSize="large" color="success" />
            <Typography variant="h6">Facts Checked</Typography>
          </Stack>
          <Typography sx={{ mt: 2 }}>Total Verified: 25</Typography>
          <Typography>Pending Verification: 5</Typography>
        </Paper>

        <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
          <Stack direction="row" alignItems="center" spacing={2}>
            <EmojiEvents fontSize="large" color="warning" />
            <Typography variant="h6">Next Challenges</Typography>
          </Stack>
          <Typography sx={{ mt: 2 }}>Expert Quiz Available</Typography>
          <Typography>New Fact-Checking Mission</Typography>
        </Paper>
      </Box>

      {/* Recent Activity */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Recent Activity</Typography>
        {recentActivity.map((act, i) => (
          <Typography key={i} sx={{ mb: 1 }}>• {act}</Typography>
        ))}
      </Paper>

      {/* Analytics Chart */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3, mb: 4 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Quiz Analytics</Typography>
        <ResponsiveContainer width="100%" height={200}>
          <PieChart>
            <Pie data={analyticsData} dataKey="value" nameKey="name" innerRadius={50} outerRadius={80} label>
              {analyticsData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={index === 0 ? "#4caf50" : "#f44336"} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </Paper>

      {/* Badges / Achievements */}
      <Paper sx={{ p: 3, borderRadius: 3, boxShadow: 3 }}>
        <Typography variant="h6" sx={{ mb: 2 }}>Your Badges</Typography>
        <Stack direction="row" spacing={2}>
          {badges.map((badge, i) => (
            <Stack key={i} alignItems="center">
              <Star color="warning" />
              <Typography variant="caption">{badge}</Typography>
            </Stack>
          ))}
        </Stack>
      </Paper>
    </Box>
  );
};

export default Dashboard;
