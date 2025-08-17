import React, { lazy, Suspense, useMemo, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Box, CircularProgress, ThemeProvider, CssBaseline, createTheme } from '@mui/material';
import { ColorModeContext } from './context/ColorModeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Eagerly loaded components
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';

// Lazy loaded components
const Dashboard = lazy(() => import('./pages/Dashboard'));
const QuizGame = lazy(() => import('./pages/QuizGame'));
const Leaderboard = lazy(() => import('./pages/Leaderboard'));
const SocialFeed = lazy(() => import('./pages/SocialFeed'));
const ContentLibrary = lazy(() => import('./pages/ContentLibrary'));
const ContentDetail = lazy(() => import('./pages/ContentDetail'));
const Chatbot = lazy(() => import('./pages/Chatbot'));
const FactChecker = lazy(() => import('./pages/FactChecker'));

// Loading component
const LoadingScreen = () => (
  <Box 
    display="flex" 
    justifyContent="center" 
    alignItems="center" 
    minHeight="50vh"
  >
    <CircularProgress />
  </Box>
);

interface ProtectedRouteProps {
  children: React.ReactNode;
}

// Protected Route component with proper typing
const PrivateRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const isAuthenticated = !!localStorage.getItem('token');
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <Box p={3} textAlign="center">
          <h2>Something went wrong.</h2>
          <button onClick={() => window.location.reload()}>
            Refresh Page
          </button>
        </Box>
      );
    }

    return this.props.children;
  }
}

const App: React.FC = () => {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  
  // Toggle theme function
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );
  
  // Create theme based on mode
  const theme = useMemo(
    () => createTheme({
      palette: {
        mode,
        ...(mode === 'light'
          ? {
              primary: {
                main: '#6366F1',
                light: '#818CF8',
                dark: '#4F46E5',
              },
              secondary: {
                main: '#10B981',
                light: '#34D399',
                dark: '#059669',
              },
              tertiary: {
                main: '#F43F5E',
                light: '#FB7185',
                dark: '#E11D48',
              },
              accent: {
                main: '#8B5CF6',
                light: '#A78BFA',
                dark: '#7C3AED',
              },
              background: {
                default: '#F8FAFC',
                paper: '#FFFFFF',
              },
              text: {
                primary: '#1A1C23',
                secondary: '#4B5563',
              }
            }
          : {
              primary: {
                main: '#818CF8',
                light: '#6366F1',
                dark: '#4F46E5',
              },
              secondary: {
                main: '#34D399',
                light: '#10B981',
                dark: '#059669',
              },
              tertiary: {
                main: '#FB7185',
                light: '#F43F5E',
                dark: '#E11D48',
              },
              accent: {
                main: '#A78BFA',
                light: '#8B5CF6',
                dark: '#7C3AED',
              },
              background: {
                default: '#1A1C23',
                paper: '#2D3748',
              },
              text: {
                primary: '#F8FAFC',
                secondary: '#CBD5E1',
              }
            }),
      },
      typography: {
        fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      },
      components: {
        MuiCssBaseline: {
          styleOverrides: {
            body: {
              transition: 'background-color 0.2s ease, color 0.2s ease',
            },
          },
        },
      },
    }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <ErrorBoundary>
            <Box 
              sx={{ 
                minHeight: '100vh',
                display: 'flex',
                flexDirection: 'column'
              }}
            >
              <Navbar />
              <Box component="main" sx={{ flex: 1 }}>
                <Suspense fallback={<LoadingScreen />}>
                  <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/content-library/:id" element={<ContentDetail />} />
                    
                    {/* Protected Routes */}
                    <Route 
                      path="/dashboard" 
                      element={
                        <PrivateRoute>
                          <Dashboard />
                        </PrivateRoute>
                      } 
                    />
                    <Route 
                      path="/quiz-game" 
                      element={
                        <PrivateRoute>
                          <QuizGame />
                        </PrivateRoute>
                      } 
                    />
                    <Route 
                      path="/leaderboard" 
                      element={
                        <PrivateRoute>
                          <Leaderboard />
                        </PrivateRoute>
                      } 
                    />
                    
                    {/* Public Routes */}
                    <Route 
                      path="/social-feed" 
                      element={<SocialFeed />}
                    />
                    <Route 
                      path="/content-library" 
                      element={<ContentLibrary />}
                    />
                    
                    {/* Protected Routes */}
                    <Route 
                      path="/chatbot" 
                      element={
                        <PrivateRoute>
                          <Chatbot />
                        </PrivateRoute>
                      } 
                    />
                    <Route 
                      path="/fact-checker" 
                      element={
                        <PrivateRoute>
                          <FactChecker />
                        </PrivateRoute>
                      } 
                    />

                    {/* Catch all route */}
                    <Route 
                      path="*" 
                      element={
                        <Navigate to="/" replace />
                      } 
                    />
                  </Routes>
                </Suspense>
              </Box>
              <Footer />
            </Box>
          </ErrorBoundary>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
};

export default App;
