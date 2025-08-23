import React, { useState, useContext } from 'react';
import { ColorModeContext } from '../context/ColorModeContext';
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
  Container,
  Tooltip,
  alpha,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon,
  ExitToApp as LogoutIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

interface NavLink {
  name: string;
  path: string;
  requiresAuth: boolean;
}

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const links: NavLink[] = [
    { name: 'Home', path: '/', requiresAuth: false },
    { name: 'Content Library', path: '/content-library', requiresAuth: false },
    { name: 'Social Feed', path: '/social-feed', requiresAuth: false },
    { name: 'Dashboard', path: '/dashboard', requiresAuth: true },
    { name: 'Quiz Game', path: '/quiz-game', requiresAuth: true },
    { name: 'Leaderboard', path: '/leaderboard', requiresAuth: true },
    { name: 'Fact Checker', path: '/fact-checker', requiresAuth: true },
    { name: 'AI Assistant', path: '/chatbot', requiresAuth: true },
  ];

  const filteredLinks = links.filter(link => isAuthenticated || !link.requiresAuth);

  const drawer = (
    <Box sx={{ width: 250, pt: 2 }}>
      <List>
        {filteredLinks.map(link => (
          <ListItem
            key={link.path}
            component={RouterLink}
            to={link.path}
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: '#FFA500', color: 'white' },
            }}
          >
            <ListItemText primary={link.name} />
          </ListItem>
        ))}
        {isAuthenticated && (
          <ListItem
            component="div"
            onClick={handleLogout}
            sx={{
              borderRadius: 2,
              mx: 1,
              mb: 1,
              cursor: 'pointer',
              '&:hover': { bgcolor: alpha('#FFA500', 0.8), color: 'white' },
            }}
          >
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: 'linear-gradient(135deg, #0A0E1F 0%, #6B46C1 100%)',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            {isMobile && (
              <IconButton
                color="inherit"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ mr: 2, color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
            )}

            <Typography
              variant="h6"
              component={RouterLink}
              to="/"
              sx={{
                flexGrow: { xs: 1, md: 0 },
                mr: { md: 4 },
                color: 'white',
                textDecoration: 'none',
                fontWeight: 800,
                letterSpacing: '0.1em',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.25rem',
                textTransform: 'uppercase',
              }}
            >
              PRAKAASH
            </Typography>

            {!isMobile && (
              <Box sx={{ flexGrow: 1, display: 'flex', gap: 2 }}>
                {filteredLinks.map(link => (
                  <Button
                    key={link.path}
                    component={RouterLink}
                    to={link.path}
                    sx={{
                      color: 'white',
                      fontWeight: 500,
                      textTransform: 'none',
                      '&:hover': { bgcolor: '#FFA500', color: 'white' },
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
              </Box>
            )}

            <Tooltip title={theme.palette.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton
                onClick={toggleColorMode}
                color="inherit"
                sx={{ color: 'white' }}
              >
                {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {!isAuthenticated ? (
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to="/login"
                  sx={{ color: 'white', textTransform: 'none' }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  component={RouterLink}
                  to="/signup"
                  sx={{
                    textTransform: 'none',
                    bgcolor: '#FFA500',
                    '&:hover': { bgcolor: '#FF8C00' },
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            ) : (
              <Button
                onClick={handleLogout}
                sx={{
                  textTransform: 'none',
                  color: 'white',
                  '&:hover': { bgcolor: '#FFA500' },
                }}
              >
                Logout
              </Button>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Navbar;
