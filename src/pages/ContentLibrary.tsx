import { Box, Typography, Card, CardContent, CardMedia, Chip, CardActionArea } from '@mui/material';
import { useNavigate } from 'react-router-dom';

import digitalLiteracy from '../assets/Digital-Literacy-Landscape.png';
import fakeNewsHeadline from '../assets/fake-news-headline.jpg';

const mockContent = [
  {
    id: 1,
    title: "How to Spot Fake News",
    description: "Learn the essential skills to identify misinformation online.",
    image: fakeNewsHeadline,
    category: "Educational",
    readingTime: "10 mins",
  },
  {
    id: 2,
    title: "Understanding Digital Literacy",
    description: "A comprehensive guide to navigating the digital information landscape.",
    image: digitalLiteracy,
    category: "Guide",
    readingTime: "15 mins",
  },
  
];

import React from 'react';

const ContentLibrary: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Content Library
      </Typography>
      
      <Box sx={{ 
        display: 'grid',
        gridTemplateColumns: {
          xs: '1fr',
          sm: 'repeat(2, 1fr)',
          md: 'repeat(3, 1fr)'
        },
        gap: 3
      }}>
        {mockContent.map((content) => (
          <Card 
            key={content.id}
            sx={{ 
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: (theme) => theme.shadows[4],
              }
            }}
          >
            <CardActionArea 
              onClick={() => navigate(`/content-library/${content.id}`)}
              sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'stretch' }}
            >
              <CardMedia
                component="img"
                height="140"
                image={content.image}
                alt={content.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography variant="h6" gutterBottom>
                  {content.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {content.description}
                </Typography>
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Chip size="small" label={content.category} color="primary" />
                  <Chip size="small" label={content.readingTime} variant="outlined" />
                </Box>
              </CardContent>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default ContentLibrary;
