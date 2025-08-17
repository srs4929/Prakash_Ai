import { Box, Typography, Paper, TextField, Button, CircularProgress } from '@mui/material';
import { useState } from 'react';
import React from 'react';

const FactChecker: React.FC = () => {
  const [url, setUrl] = useState('');
  const [claim, setClaim] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [result, setResult] = useState<null | {
    verdict: string;
    confidence: number;
    explanation: string;
  }>(null);

  const handleCheck = () => {
    setIsChecking(true);
    
    // Mock API call
    setTimeout(() => {
      setResult({
        verdict: "Potentially Misleading",
        confidence: 75,
        explanation: "This is a placeholder response. In the real application, this would use AI and fact-checking databases to verify the information."
      });
      setIsChecking(false);
    }, 2000);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Fact Checker
      </Typography>
      
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Submit Content for Verification
        </Typography>
        
        <TextField
          fullWidth
          label="URL to Check"
          variant="outlined"
          margin="normal"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        
        <TextField
          fullWidth
          label="Claim to Verify"
          variant="outlined"
          margin="normal"
          multiline
          rows={4}
          value={claim}
          onChange={(e) => setClaim(e.target.value)}
        />
        
        <Button
          variant="contained"
          onClick={handleCheck}
          disabled={isChecking || (!url && !claim)}
          sx={{ mt: 2 }}
        >
          {isChecking ? <CircularProgress size={24} /> : 'Check Facts'}
        </Button>
      </Paper>
      
      {result && (
        <Paper sx={{ p: 3 }}>
          <Typography variant="h6" gutterBottom>
            Verification Result
          </Typography>
          
          <Box sx={{ mb: 2 }}>
            <Typography variant="subtitle1" color="primary">
              Verdict: {result.verdict}
            </Typography>
            <Typography variant="body2">
              Confidence: {result.confidence}%
            </Typography>
          </Box>
          
          <Typography variant="body1">
            {result.explanation}
          </Typography>
        </Paper>
      )}
    </Box>
  );
};

export default FactChecker;
