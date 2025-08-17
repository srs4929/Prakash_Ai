import { Box, Typography, Paper, TextField, Button, useTheme } from '@mui/material';
import { useState } from 'react';

import React from 'react';

const Chatbot: React.FC = () => {
  const [messages, setMessages] = useState<Array<{text: string, sender: 'user' | 'bot'}>>([
    { text: "Hello! How can I help you verify information today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const theme = useTheme();

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    setMessages(prev => [...prev, { text: input, sender: 'user' }]);
    
    // Mock bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I'm analyzing your query. This is a placeholder response - in the real app, this would use AI to help verify information.",
        sender: 'bot'
      }]);
    }, 1000);
    
    setInput('');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        AI Assistant
      </Typography>
      
      <Paper sx={{ height: '60vh', p: 2, mb: 2, overflow: 'auto' }}>
        {messages.map((message, index) => (
          <Box
            key={index}
            sx={{
              display: 'flex',
              justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
              mb: 2
            }}
          >
            <Paper
              sx={{
                p: 2,
                maxWidth: '70%',
                backgroundColor:
                  message.sender === 'user'
                    ? theme.palette.primary.main
                    : theme.palette.mode === 'dark'
                      ? theme.palette.grey[800] // dark bot bubble
                      : theme.palette.grey[200], // light bot bubble
                color: message.sender === 'user' ? 'white' : theme.palette.text.primary
              }}
            >
              <Typography>{message.text}</Typography>
            </Paper>
          </Box>
        ))}
      </Paper>
      
      <Box sx={{ display: 'flex', gap: 1 }}>
        <TextField
          fullWidth
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <Button variant="contained" onClick={handleSend}>
          Send
        </Button>
      </Box>
    </Box>
  );
};

export default Chatbot;
