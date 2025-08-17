import { Box, Typography, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const mockLeaderboardData = [
  { rank: 1, name: "Alex Johnson", score: 2500, badges: 15 },
  { rank: 2, name: "Maria Garcia", score: 2350, badges: 12 },
  { rank: 3, name: "John Smith", score: 2200, badges: 11 },
  { rank: 4, name: "Sarah Wilson", score: 2100, badges: 10 },
  { rank: 5, name: "David Lee", score: 2000, badges: 9 },
];

import React from 'react';

const Leaderboard: React.FC = () => {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Leaderboard
      </Typography>
      
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Name</TableCell>
              <TableCell align="right">Score</TableCell>
              <TableCell align="right">Badges</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {mockLeaderboardData.map((row) => (
              <TableRow
                key={row.rank}
                sx={{ '&:nth-of-type(odd)': { backgroundColor: 'rgba(0, 0, 0, 0.04)' } }}
              >
                <TableCell component="th" scope="row">
                  {row.rank}
                </TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell align="right">{row.score}</TableCell>
                <TableCell align="right">{row.badges}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;
