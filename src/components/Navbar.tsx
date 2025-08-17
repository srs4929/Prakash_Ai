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
  ListItemIcon,
  Avatar,
  Menu,
  MenuItem,
  useTheme,
  useMediaQuery,
  Container,
  alpha,
  Tooltip,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Dashboard as DashboardIcon,
  EmojiEvents as LeaderboardIcon,
  QuestionAnswer as QuizIcon,
  Article as ContentIcon,
  Group as SocialIcon,
  Verified as FactCheckerIcon,
  Chat as ChatbotIcon,
  Login as LoginIcon,
  PersonAdd as SignupIcon,
  ExitToApp as LogoutIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';

interface NavLink {
  name: string;
  path: string;
  icon: React.ReactNode;
  requiresAuth: boolean;
  public?: boolean;
}

const Navbar: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const { toggleColorMode } = useContext(ColorModeContext);
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();

  const isAuthenticated = !!localStorage.getItem('token');

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);
  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget);
  const handleProfileMenuClose = () => setAnchorEl(null);
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const links: NavLink[] = [
    { name: 'Home', path: '/', icon: <HomeIcon />, requiresAuth: false, public: true },
    { name: 'Content Library', path: '/content-library', icon: <ContentIcon />, requiresAuth: false, public: true },
    { name: 'Social Feed', path: '/social-feed', icon: <SocialIcon />, requiresAuth: false, public: true },
    { name: 'Dashboard', path: '/dashboard', icon: <DashboardIcon />, requiresAuth: true },
    { name: 'Quiz Game', path: '/quiz-game', icon: <QuizIcon />, requiresAuth: true },
    { name: 'Leaderboard', path: '/leaderboard', icon: <LeaderboardIcon />, requiresAuth: true },
    { name: 'Fact Checker', path: '/fact-checker', icon: <FactCheckerIcon />, requiresAuth: true },
    { name: 'AI Assistant', path: '/chatbot', icon: <ChatbotIcon />, requiresAuth: true },
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
              '&:hover': {
                bgcolor: 'primary.light',
                '& .MuiListItemIcon-root, & .MuiListItemText-primary': { color: 'white' },
              },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>{link.icon}</ListItemIcon>
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
              '&:hover': { bgcolor: alpha(theme.palette.error.main, 0.1) },
            }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              <LogoutIcon />
            </ListItemIcon>
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
          bgcolor: 'background.default',
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar>
            {isMobile && (
              <IconButton color="inherit" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, color: 'text.primary' }}>
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
                color: 'primary.main',
                textDecoration: 'none',
                fontWeight: 800,
                letterSpacing: '0.1em',
                fontFamily: '"Inter", sans-serif',
                fontSize: '1.25rem',
                textTransform: 'uppercase'
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
                    startIcon={link.icon}
                    sx={{
                      color: 'text.primary',
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      letterSpacing: '0.02em',
                      textTransform: 'none',
                      '&:hover': { 
                        bgcolor: 'primary.light', 
                        color: 'white',
                        transform: 'translateY(-1px)',
                      },
                      transition: 'transform 0.2s ease-in-out',
                    }}
                  >
                    {link.name}
                  </Button>
                ))}
              </Box>
            )}

            {/* Theme Toggle */}
            <Tooltip title={theme.palette.mode === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}>
              <IconButton
                onClick={toggleColorMode}
                color="inherit"
                sx={{ mr: 2, color: 'text.primary' }}
              >
                {theme.palette.mode === 'dark' ? <LightModeIcon /> : <DarkModeIcon />}
              </IconButton>
            </Tooltip>

            {!isAuthenticated ? (
              <Box sx={{ display: 'flex', gap: 3 }}>
                <Button 
                  color="primary" 
                  component={RouterLink} 
                  to="/login" 
                  startIcon={<LoginIcon />}
                  sx={{
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    textTransform: 'none',
                    fontSize: '0.95rem'
                  }}
                >
                  Login
                </Button>
                <Button 
                  variant="contained" 
                  component={RouterLink} 
                  to="/signup" 
                  startIcon={<SignupIcon />}
                  sx={{
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    boxShadow: 2,
                    '&:hover': {
                      boxShadow: 4,
                      transform: 'translateY(-1px)',
                    },
                    transition: 'transform 0.2s ease-in-out',
                  }}
                >
                  Sign Up
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <IconButton onClick={handleProfileMenuOpen} size="large" sx={{ p: 0 }}>
         <Avatar
  sx={{
    bgcolor: 'primary.main',
    width: 60,       // wider than height
    height: 36,      // normal height
    borderRadius: 2, // rounded corners
    fontSize: 14,
    fontWeight: 700,
  }}
>
  User
</Avatar>

                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleProfileMenuClose}
                  transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                  anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  PaperProps={{ sx: { mt: 1, minWidth: 160, borderRadius: 2, boxShadow: 3 } }}
                >
                  {/* <MenuItem
                    onClick={() => {
                      handleProfileMenuClose();
                      navigate('/profile');
                    }}
                  >
                    <ListItemText primary="Profile" />
                  </MenuItem> */}
                  
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon sx={{ minWidth: 32 }}>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </Box>
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
