import React, { useState } from 'react';
import type { KeyboardEvent, ChangeEvent } from 'react';
import CountUp from 'react-countup';
import {
  Box,
  Typography,
  Paper,
  Container,
  Button,
  Card,
  CardContent,
  IconButton,
  useTheme,
  alpha,
  TextField,
} from '@mui/material';
import Typewriter from 'typewriter-effect';
import {
  Security,
  School,
  Psychology,
  GroupWork,
  Close as CloseIcon,
  Chat as ChatIcon,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

interface ChatMessage {
  text: string;
  sender: 'user' | 'bot';
}

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

interface StatItem {
  start: number;
  end: number;
  suffix: string;
  label: string;
  color: string;
}

const features: Feature[] = [
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: 'Smart Detection',
    description: 'Advanced AI-powered tools to identify misinformation patterns',
  },
  {
    icon: <School sx={{ fontSize: 40 }} />,
    title: 'Learn & Earn',
    description: 'Earn points and badges while learning to detect fake news',
  },
  {
    icon: <Psychology sx={{ fontSize: 40 }} />,
    title: 'Expert Guidance',
    description: 'Get insights from fact-checking experts and AI assistance',
  },
  {
    icon: <GroupWork sx={{ fontSize: 40 }} />,
    title: 'Community Power',
    description: 'Join a community of truth-seekers and share knowledge',
  },
];

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { text: "Hi! I'm your AI assistant. How can I help you today?", sender: 'bot' }
  ]);
  const [input, setInput] = useState('');
  const theme = useTheme();

  const handleSend = () => {
    if (!input.trim()) return;
    
    // Add user message
    const userMessage: ChatMessage = { text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    
    // Simulate bot response
    setTimeout(() => {
      const botResponse: ChatMessage = { 
        text: "I'm analyzing your query. This is a placeholder response - in the real app, this would provide intelligent responses to help verify information.",
        sender: 'bot'
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
          color: 'white',
          py: { xs: 8, md: 12 },
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, alignItems: 'center' }}>
            <Box>
              <Box 
                sx={{ 
                  mb: 4,
                  '& .Typewriter': { display: 'inline-block' },
                  '& .Typewriter__cursor': { color: 'white' },
                }}
              >
                <Typography 
                  variant="h1" 
                  component="div"
                  sx={{ 
                    fontWeight: 700,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
                    fontSize: { xs: '3rem', md: '5rem' },
                    letterSpacing: '0.1em',
                    whiteSpace: 'nowrap',
                  }}
                >
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
  .typeString('PRAKAASH')
  .pauseFor(2000)
  .deleteAll()
  .typeString('PRAKAASH')
  .pauseFor(1500)
  .deleteAll()
  .typeString('PRAKAASH')
  .pauseFor(1500)
  .deleteAll()
  .typeString('PRAKAASH')
  .pauseFor(2000)
  .start();

                    }}
                    options={{
                      autoStart: true,
                      loop: true,
                      cursor: '_',
                      wrapperClassName: 'Typewriter',
                      cursorClassName: 'Typewriter__cursor',
                      delay: 100,
                      deleteSpeed: 50
                    }}
                  />
                </Typography>
              </Box>
              <Typography 
                variant="h5" 
                sx={{ 
                  mb: 4,
                  opacity: 0.9,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                }}
              >
                Your gamified platform for detecting and combating fake news through interactive learning
              </Typography>
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: 'white',
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.common.white, 0.9),
                    },
                  }}
                >
                  Get Started
                </Button>
                <Button
                  variant="outlined"
                  size="large"
                  component={RouterLink}
                  to="/content-library"
                  sx={{
                    px: 4,
                    py: 1.5,
                    color: 'white',
                    borderColor: 'white',
                    '&:hover': {
                      borderColor: 'white',
                      bgcolor: alpha(theme.palette.common.white, 0.1),
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
            <Box>
              {/* Add hero image or illustration here */}
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600 }}
        >
          Why Choose PRAKAASH?
        </Typography>
        <Box sx={{ display: 'grid', gap: 4, gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' } }}>
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 3,
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-8px)',
                },
              }}
            >
              <Box
                sx={{
                  mb: 2,
                  color: 'primary.main',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {feature.icon}
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {feature.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {feature.description}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Container>

      {/* Stats/Impact Section */}
      <Box
        sx={{
          py: 10,
          px: 3,
          bgcolor: 'background.default',
          background: `linear-gradient(180deg, 
            ${alpha(theme.palette.primary.light, 0.05)} 0%, 
            ${alpha(theme.palette.primary.light, 0.1)} 100%
          )`,
          borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
          borderBottom: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h3"
            align="center"
            gutterBottom
            sx={{ 
              mb: 6,
              fontWeight: 600,
              background: `linear-gradient(45deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
              backgroundClip: 'text',
              textFillColor: 'transparent',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            Our Impact
          </Typography>
          
          <Box 
            sx={{ 
              display: 'grid',
              gap: { xs: 4, md: 8 },
              gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(4, 1fr)' },
              position: 'relative',
            }}
          >
            {([
              { 
                start: 0,
                end: 100,
                suffix: 'K+',
                label: 'Active Users',
                color: theme.palette.primary.main
              },
              { 
                start: 0,
                end: 500,
                suffix: 'K+',
                label: 'Facts Verified',
                color: theme.palette.secondary.main
              },
              { 
                start: 0,
                end: 95,
                suffix: '%',
                label: 'Accuracy Rate',
                color: theme.palette.tertiary.main
              },
              { 
                start: 0,
                end: 50,
                suffix: '+',
                label: 'Expert Partners',
                color: theme.palette.accent.main
              },
            ] as StatItem[]).map((stat, index) => (
              <Card
                key={index}
                sx={{
                  p: 4,
                  textAlign: 'center',
                  background: `linear-gradient(135deg, 
                    ${alpha(stat.color, 0.05)} 0%, 
                    ${alpha(stat.color, 0.15)} 100%
                  )`,
                  border: `1px solid ${alpha(stat.color, 0.1)}`,
                  transition: 'all 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: `0 12px 24px -8px ${alpha(stat.color, 0.2)}`,
                    border: `1px solid ${alpha(stat.color, 0.2)}`,
                  },
                }}
              >
                <Typography
                  variant="h4"
                  component="div"
                  sx={{
                    fontWeight: 700,
                    mb: 1,
                    color: stat.color,
                    textShadow: `0 2px 4px ${alpha(stat.color, 0.1)}`,
                  }}
                >
                  <CountUp
                    start={0}
                    end={stat.end}
                    duration={3}
                    delay={index * 0.4}
                    separator=","
                    suffix={stat.suffix}
                    enableScrollSpy
                    scrollSpyOnce
                    useEasing
                    decimals={stat.end % 1 !== 0 ? 1 : 0}
                  >
                    {({ countUpRef }) => (
                      <span ref={countUpRef}>
                        0{stat.suffix}
                      </span>
                    )}
                  </CountUp>
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 500,
                    color: 'text.secondary',
                  }}
                >
                  {stat.label}
                </Typography>
              </Card>
            ))}
          </Box>
        </Container>
      </Box>

      {/* Floating AI Assistant */}
      <IconButton
        onClick={() => setShowChatbot(!showChatbot)}
        sx={{
          position: 'fixed',
          bottom: 20,
          right: 20,
          bgcolor: 'primary.main',
          color: 'white',
          width: 56,
          height: 56,
          boxShadow: 4,
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        <ChatIcon />
      </IconButton>

      {showChatbot && (
        <Paper
          elevation={4}
          sx={{
            position: 'fixed',
            bottom: 90,
            right: 20,
            width: 320,
            height: 480,
            borderRadius: 2,
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: 'primary.main',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Typography variant="h6">AI Assistant</Typography>
            <IconButton
              size="small"
              onClick={() => setShowChatbot(false)}
              sx={{ color: 'white' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Box sx={{ p: 2, flexGrow: 1, bgcolor: 'background.default', display: 'flex', flexDirection: 'column' }}>
            <Box sx={{ flexGrow: 1, overflowY: 'auto', mb: 2 }}>
              {messages.map((message, index) => (
                <Box
                  key={index}
                  sx={{
                    display: 'flex',
                    justifyContent: message.sender === 'user' ? 'flex-end' : 'flex-start',
                    mb: 1
                  }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      maxWidth: '80%',
                      bgcolor: message.sender === 'user' ? 'primary.main' : 'grey.100',
                      color: message.sender === 'user' ? 'white' : 'text.primary'
                    }}
                  >
                    <Typography variant="body2">{message.text}</Typography>
                  </Paper>
                </Box>
              ))}
            </Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                placeholder="Type your message..."
                value={input}
                onChange={(e: ChangeEvent<HTMLInputElement>) => setInput(e.target.value)}
                onKeyPress={(e: KeyboardEvent<HTMLInputElement>) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSend();
                  }
                }}
              />
              <Button variant="contained" onClick={handleSend}>
                Send
              </Button>
            </Box>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Home;
