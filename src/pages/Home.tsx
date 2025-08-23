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
} from "@mui/material";
import Typewriter from "typewriter-effect";
import {
  Security,
  School,
  Psychology,
  GroupWork,
  Close as CloseIcon,
  Chat as ChatIcon,
} from "@mui/icons-material";
import { Link as RouterLink } from "react-router-dom";

interface Feature {
  icon: React.ReactNode;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: <Security sx={{ fontSize: 40 }} />,
    title: "Smart Detection",
    description:
      "Advanced AI-powered tools to identify misinformation patterns",
  },
  {
    icon: <School sx={{ fontSize: 40 }} />,
    title: "Learn & Earn",
    description: "Earn points and badges while learning to detect fake news",
  },
  {
    icon: <Psychology sx={{ fontSize: 40 }} />,
    title: "Expert Guidance",
    description: "Get insights from fact-checking experts and AI assistance",
  },
  {
    icon: <GroupWork sx={{ fontSize: 40 }} />,
    title: "Community Power",
    description: "Join a community of truth-seekers and share knowledge",
  },
];

const Home = () => {
  const [showChatbot, setShowChatbot] = useState(false);
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          background: "linear-gradient(135deg, #0A0E1F 0%, #6B46C1 100%)",
          color: "white",
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
              {/* PRAKAASH Text with Typewriter */}
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
                        .typeString(
                          "<span style='color:#00D4FF'>PRAKAASH</span>"
                        )
                        .pauseFor(800)
                        .deleteAll()
                        .typeString(
                          "<span style='color:#FF00FF'>PRAKAASH</span>"
                        )
                        .pauseFor(800)
                        .deleteAll()
                        .typeString(
                          "<span style='color:#00FFFF'>PRAKAASH</span>"
                        )
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
                Your gamified platform for detecting and combating fake news
                through interactive learning
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
                    color: "black",
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
                src="src/assets/ai_image.png"
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

        <Box
          sx={{
            display: "grid",
            gap: 4,
            gridTemplateColumns: {
              xs: "1fr",
              sm: "repeat(2, 1fr)",
              md: "repeat(4, 1fr)",
            },
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
                background:
                  "white",
                backdropFilter: "blur(10px)",
                "&:hover": {
                  transform: "translateY(-10px)",
                  boxShadow: "0px 15px 30px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Box sx={{ mb: 3, color: "#00D4FF" }}>{feature.icon}</Box>
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
          bgcolor: "primary.main",
          color: "white",
          width: 56,
          height: 56,
          boxShadow: 4,
          "&:hover": { bgcolor: "primary.dark" },
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
          }}
        >
          <Box
            sx={{
              p: 2,
              bgcolor: "primary.main",
              color: "white",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="h6">AI Assistant</Typography>
            <IconButton
              size="small"
              onClick={() => setShowChatbot(false)}
              sx={{ color: "white" }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <Box sx={{ p: 2, flexGrow: 1, bgcolor: "background.default" }}>
            <Typography>How can I help you today?</Typography>
          </Box>
        </Paper>
      )}
    </Box>
  );
};

export default Home;
