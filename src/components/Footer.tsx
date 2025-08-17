import React from 'react';
import {
  Box,
  Container,
  Typography,
  Link,
  IconButton,
  Divider,
} from '@mui/material';
import {
  Facebook,
  Twitter,
  LinkedIn,
  Instagram,
  GitHub,
} from '@mui/icons-material';
import { Link as RouterLink } from 'react-router-dom';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'About',
      links: [
        { name: 'Our Mission', path: '/about' },
        { name: 'Team', path: '/team' },
        { name: 'Contact Us', path: '/contact' },
      ],
    },
    {
      title: 'Resources',
      links: [
        { name: 'Content Library', path: '/content-library' },
        { name: 'Social Feed', path: '/social-feed' },
        { name: 'Fact Checker', path: '/fact-checker' },
      ],
    },
    {
      title: 'Community',
      links: [
        { name: 'Leaderboard', path: '/leaderboard' },
        { name: 'Quiz Game', path: '/quiz-game' },
        { name: 'AI Assistant', path: '/chatbot' },
      ],
    },
  ];

  const socialLinks = [
    { icon: <Facebook />, name: 'Facebook', url: 'https://facebook.com' },
    { icon: <Twitter />, name: 'Twitter', url: 'https://twitter.com' },
    { icon: <LinkedIn />, name: 'LinkedIn', url: 'https://linkedin.com' },
    { icon: <Instagram />, name: 'Instagram', url: 'https://instagram.com' },
    { icon: <GitHub />, name: 'GitHub', url: 'https://github.com' },
  ];

  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: 'background.paper',
        borderTop: 1,
        borderColor: 'divider',
        py: 6,
        mt: 'auto', // This pushes the footer to the bottom
      }}
    >
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: {
              xs: '1fr',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(3, 1fr)'
            },
            gap: 4
          }}
        >
          {footerSections.map((section) => (
            <Box key={section.title}>
              <Typography variant="h6" gutterBottom>
                {section.title}
              </Typography>
              <Box>
                {section.links.map((link) => (
                  <Box key={link.name} sx={{ mb: 1 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      color="text.secondary"
                      sx={{
                        textDecoration: 'none',
                        '&:hover': { color: 'primary.main' },
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Box>
          ))}
        </Box>

        <Divider sx={{ my: 4 }} />

        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 2,
          }}
        >
          <Typography variant="body2" color="text.secondary">
            © {currentYear} PRAKAASH. All rights reserved.
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            {socialLinks.map((social) => (
              <IconButton
                key={social.name}
                component="a"
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                size="small"
                sx={{
                  color: 'text.secondary',
                  '&:hover': { color: 'primary.main' },
                }}
              >
                {social.icon}
              </IconButton>
            ))}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
