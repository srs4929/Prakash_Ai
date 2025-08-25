import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Container,
  Breadcrumbs,
  Link,
} from '@mui/material';
import { ArrowBack as ArrowBackIcon } from '@mui/icons-material';

// ✅ Use public/assets folder
const fakeNewsImg = import.meta.env.BASE_URL + 'assets/fake-news-headline.jpg';
const digitalLiteracyImg = import.meta.env.BASE_URL + 'assets/Digital-Literacy-Landscape.png';

const mockContentDetails = [
  {
    id: 1,
    title: "How to Spot Fake News",
    description: "Learn the essential skills to identify misinformation online.",
    image: fakeNewsImg,
    category: "Educational",
    author: "Dr. Sarah Johnson",
    publishedDate: "2025-08-01",
    content: `
In today's digital age, the spread of misinformation has become a critical challenge. This guide will help you develop the skills needed to identify and verify information online.

Key Points to Remember:
1. Check the Source
2. Analyze the Content
3. Cross-Reference
4. Be Critical of Images
    `,
    tags: ["Fact Checking", "Digital Literacy", "Media Analysis"],
    readingTime: "10 mins",
    difficulty: "Beginner"
  },
  {
    id: 2,
    title: "Understanding Digital Literacy",
    description: "A comprehensive guide to navigating the digital information landscape.",
    image: digitalLiteracyImg,
    category: "Guide",
    author: "Prof. Michael Chen",
    publishedDate: "2025-07-28",
    content: `
Digital literacy is essential in our interconnected world. This comprehensive guide will help you navigate the complex digital information landscape.

Topics Covered:
1. Information Evaluation
2. Online Research Methods
3. Digital Tools and Resources
4. Critical Thinking in the Digital Age
    `,
    tags: ["Digital Skills", "Information Literacy", "Online Research"],
    readingTime: "15 mins",
    difficulty: "Intermediate"
  }
];

const ContentDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const content = mockContentDetails.find(item => item.id === Number(id));

  if (!content) {
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h4">Content not found</Typography>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/content-library')}
          sx={{ mt: 2 }}
        >
          Back to Library
        </Button>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Breadcrumbs */}
      <Breadcrumbs sx={{ mb: 2 }}>
        <Link
          component="button"
          variant="body2"
          onClick={() => navigate('/content-library')}
          sx={{ cursor: 'pointer' }}
        >
          Content Library
        </Link>
        <Typography color="text.primary">{content.title}</Typography>
      </Breadcrumbs>

      {/* Main Content */}
      <Paper elevation={0} sx={{ p: 4 }}>
        {/* Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" gutterBottom>
            {content.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 2, mb: 2, flexWrap: 'wrap' }}>
            <Chip label={content.category} color="primary" />
            <Chip label={`${content.readingTime} read`} variant="outlined" />
          </Box>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            By {content.author} • Published {new Date(content.publishedDate).toLocaleDateString()}
          </Typography>
        </Box>

        {/* Featured Image */}
        <Box
          component="img"
          src={content.image}
          alt={content.title}
          sx={{
            width: '100%',
            maxHeight: 400,
            objectFit: 'contain',
            borderRadius: 2,
            mb: 4
          }}
        />

        {/* Content */}
        <Typography variant="body1" sx={{ mb: 4, whiteSpace: 'pre-wrap' }}>
          {content.content}
        </Typography>

        {/* Tags */}
        <Box sx={{ mt: 4 }}>
          <Typography variant="h6" gutterBottom>
            Topics
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
            {content.tags?.map((tag, index) => (
              <Chip key={index} label={tag} variant="outlined" />
            ))}
          </Box>
        </Box>
      </Paper>

      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate('/content-library')}
        sx={{ mt: 4 }}
      >
        Back to Library
      </Button>
    </Container>
  );
};

export default ContentDetail;
