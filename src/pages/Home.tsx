
import { useState } from "react";
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
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Typewriter from "typewriter-effect";
import {
  Security,
  School,
  Psychology,
  GroupWork,
  Close as CloseIcon,
  Chat as ChatIcon,
  Send as SendIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const [message, setMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([
    { text: "Hello! How can I assist you today?", sender: "AI" },
  ]);
  const theme = useTheme();

  const features = [
    {
      icon: <Security sx={{ fontSize: 45 }} />,
      title: "Reliability",
      description: "Count on Prakash for consistent, dependable support in every challenge.",
    },
    {
      icon: <School sx={{ fontSize: 45 }} />,
      title: "Growth",
      description: "Unlock your potential with Prakash’s structured learning and development path.",
    },
    {
      icon: <Psychology sx={{ fontSize: 45 }} />,
      title: "Insight",
      description: "Gain deep understanding and expert guidance with Prakash’s innovative approach.",
    },
    {
      icon: <GroupWork sx={{ fontSize: 45 }} />,
      title: "Community",
      description: "Join a supportive network that thrives with Prakash’s collaborative spirit.",
    },
  ];

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatHistory((prev) => [...prev, { text: message, sender: "User" }]);
      setMessage("");
      // Simulate AI response (placeholder)
      setTimeout(() => {
        setChatHistory((prev) => [
          ...prev,
          { text: "Thanks for your message! I'm processing your request.", sender: "AI" },
        ]);
      }, 1000);
    }
  };

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0A0E1F 0%, #6B46C1 100%)",
          color: theme.palette.getContrastText("#0A0E1F"),
          py: { xs: 2, md: 4 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: "grid",
              gap: 4,
              gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" },
              alignItems: "center",
            }}
          >
            <Box>
              <Box sx={{ mb: 3, "& .Typewriter": { display: "inline-block" } }}>
                <Typography
                  variant="h1"
                  component="div"
                  sx={{
                    fontFamily: "'Orbitron', monospace",
                    fontWeight: 700,
                    fontSize: { xs: "3rem", md: "5rem" },
                    letterSpacing: "0.2em",
                    whiteSpace: "nowrap",
                    textAlign: "left",
                    transform: "skewX(-5deg)",
                    background: "linear-gradient(90deg, #00D4FF, #FF00FF)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                  }}
                >
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter
                        .typeString("<span style='color:#00D4FF'>PRAKAASH</span>")
                        .pauseFor(800)
                        .deleteAll()
                        .typeString("<span style='color:#FF00FF'>PRAKAASH</span>")
                        .pauseFor(800)
                        .deleteAll()
                        .typeString("<span style='color:#00FFFF'>PRAKAASH</span>")
                        .pauseFor(800)
                        .start();
                    }}
                    options={{
                      autoStart: true,
                      loop: true,
                      cursor: "|",
                      delay: 80,
                      deleteSpeed: 40,
                    }}
                  />
                </Typography>
              </Box>

              <Typography
                variant="h5"
                sx={{
                  mb: 4,
                  opacity: 0.9,
                  textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                Your gamified platform for detecting and combating fake news through interactive learning
              </Typography>

              <Box sx={{ display: "flex", gap: 2 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    px: 4,
                    py: 1.5,
                    bgcolor: "#00D4FF",
                    color: theme.palette.getContrastText("#00D4FF"),
                    "&:hover": { bgcolor: alpha("#00D4FF", 0.9) },
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
                    color: "#FF00FF",
                    borderColor: "#FF00FF",
                    "&:hover": {
                      borderColor: "#FF00FF",
                      bgcolor: alpha("#FF00FF", 0.1),
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>

            <Box>
              <Box
                component="img"
                src="/assets/ai_image.png"
                alt="AI Illustration"
                sx={{
                  width: { xs: "150px", md: "350px" },
                  maxWidth: 400,
                  height: "auto",
                  margin: "0 auto",
                  display: "block",
                  animation: "float 4s ease-in-out infinite",
                }}
              />
              <style>
                {`
                  @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-15px); }
                    100% { transform: translateY(0px); }
                  }
                `}
              </style>
            </Box>
          </Box>
        </Container>
      </Box>

      {/* Why Choose Prakash Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          align="center"
          gutterBottom
          sx={{ mb: 6, fontWeight: 600, color: theme.palette.text.primary }}
        >
          Why Choose Prakash
        </Typography>

        <Box
          sx={{
            // Removed the vertical line by deleting "&::after"
            display: "grid",
            gap: 4,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
            position: "relative",
          }}
        >
          {features.map((feature, index) => (
            <Card
              key={index}
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                textAlign: "center",
                p: 4,
                borderRadius: 3,
                boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                transition: "all 0.3s ease",
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
                },
                position: "relative",
                "&::before": {
                  content: '""',
                  position: "absolute",
                  width: "12px",
                  height: "12px",
                  background: theme.palette.primary.main,
                  border: `3px solid ${theme.palette.background.paper}`,
                  borderRadius: "50%",
                  top: "20px",
                  left: "50%",
                  transform: "translateX(-50%)",
                  zIndex: 1,
                },
              }}
            >
              <Box sx={{ mb: 3, color: theme.palette.primary.main }}>
                {feature.icon}
              </Box>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600 }}>
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

      {/* Floating AI Assistant */}
      <IconButton
        onClick={() => setShowChatbot(!showChatbot)}
        sx={{
          position: "fixed",
          bottom: 20,
          right: 20,
          bgcolor: theme.palette.primary.main,
          color: theme.palette.getContrastText(theme.palette.primary.main),
          width: 56,
          height: 56,
          boxShadow: 4,
          "&:hover": { bgcolor: theme.palette.primary.dark },
        }}
      >
        <ChatIcon />
      </IconButton>

      {showChatbot && (
        <Paper
          elevation={4}
          sx={{
            position: "fixed",
            bottom: 90,
            right: 20,
            width: 320,
            height: 480,
            borderRadius: 2,
            overflow: "hidden",
            display: "flex",
            flexDirection: "column",
            background: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: theme.palette.primary.main,
              color: theme.palette.getContrastText(theme.palette.primary.main),
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">AI Assistant</Typography>
            <IconButton
              size="small"
              onClick={() => setShowChatbot(false)}
              sx={{ color: theme.palette.getContrastText(theme.palette.primary.main) }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 2, flexGrow: 1, bgcolor: theme.palette.background.default, overflowY: "auto" }}>
            <List>
              {chatHistory.map((msg, index) => (
                <ListItem
                  key={index}
                  sx={{
                    justifyContent: msg.sender === "User" ? "flex-end" : "flex-start",
                    mb: 1,
                  }}
                >
                  <Paper
                    sx={{
                      p: 1.5,
                      background: msg.sender === "User" ? alpha(theme.palette.primary.main, 0.2) : theme.palette.background.paper,
                      borderRadius: 2,
                    }}
                  >
                    <ListItemText
                      primary={msg.text}
                      primaryTypographyProps={{ color: theme.palette.text.primary }}
                    />
                  </Paper>
                </ListItem>
              ))}
            </List>
          </Box>

          <Box sx={{ p: 2, display: "flex", gap: 1 }}>
            <TextField
              fullWidth
              variant="outlined"
              placeholder="Type your message..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              sx={{ background: theme.palette.background.paper, borderRadius: 1 }}
            />
            <IconButton
              color="primary"
              onClick={handleSendMessage}
              sx={{ p: 1 }}
            >
              <SendIcon />
            </IconButton>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Home;
