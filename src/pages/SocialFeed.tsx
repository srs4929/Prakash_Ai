import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  IconButton,
  Tooltip,
  Divider,
  TextField,
  Button,
  Paper,
} from '@mui/material';
import {
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  ThumbDown as ThumbDownIcon,
  ThumbDownOutlined as ThumbDownOutlinedIcon,
} from '@mui/icons-material';

interface Post {
  id: number;
  user: string;
  content: string;
  media?: { type: 'image' | 'video'; url: string }[];
  timestamp: string;
  likes: number;
  dislikes: number;
  userInteraction?: {
    liked: boolean;
    disliked: boolean;
  };
}

// Initial dummy posts
const initialMockPosts: Post[] = [
  {
    id: 1,
    user: "InfoVerifier",
    content: "Just debunked a viral claim about climate change. Check out the facts!",
    timestamp: "2 hours ago",
    likes: 45,
    dislikes: 5,
  },
  {
    id: 2,
    user: "TruthSeeker",
    content: "Here's a great resource for fact-checking political statements.",
    timestamp: "5 hours ago",
    likes: 32,
    dislikes: 3,
  },
  {
    id: 3,
    user: "FactHunter",
    content: "Always verify before sharing news online. #FactCheck",
    timestamp: "1 day ago",
    likes: 21,
    dislikes: 2,
  },
  {
    id: 4,
    user: "KnowledgeGuru",
    content: "Misinformation spreads faster than facts. Stay alert!",
    timestamp: "2 days ago",
    likes: 18,
    dislikes: 1,
  },
];

const SocialFeed: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>(
    initialMockPosts.map(post => ({
      ...post,
      userInteraction: { liked: false, disliked: false },
    }))
  );
  const [newPost, setNewPost] = useState("");
  const [mediaFiles, setMediaFiles] = useState<File[]>([]);

  // Login state from localStorage
  const isGuest = !!localStorage.getItem('guestMode');
  const isLoggedIn = !!localStorage.getItem('token') || isGuest;

  // Handle post creation
  const handleCreatePost = () => {
    if (!isLoggedIn) {
      alert("You must be logged in to post!");
      return;
    }
    if (!newPost.trim() && mediaFiles.length === 0) return;

    const media = mediaFiles.map(file => ({
      type: (file.type.startsWith("video") ? "video" : "image") as "video" | "image",
      url: URL.createObjectURL(file),
    }));

    const newPostObj: Post = {
      id: posts.length + 1,
      user: isGuest ? "Guest" : JSON.parse(localStorage.getItem('user') || '{}').email || "CurrentUser",
      content: newPost,
      media,
      timestamp: "Just now",
      likes: 0,
      dislikes: 0,
      userInteraction: { liked: false, disliked: false },
    };

    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setMediaFiles([]);
  };

  // Like/Dislike handlers
  const handleLike = (postId: number) => {
    if (!isLoggedIn) return; // only logged-in users can like
    setPosts(currentPosts =>
      currentPosts.map(post => {
        if (post.id === postId) {
          const wasLiked = post.userInteraction?.liked;
          const wasDisliked = post.userInteraction?.disliked;
          return {
            ...post,
            likes: wasLiked ? post.likes - 1 : post.likes + 1,
            dislikes: wasDisliked ? post.dislikes - 1 : post.dislikes,
            userInteraction: { liked: !wasLiked, disliked: false },
          };
        }
        return post;
      })
    );
  };

  const handleDislike = (postId: number) => {
    if (!isLoggedIn) return; // only logged-in users can dislike
    setPosts(currentPosts =>
      currentPosts.map(post => {
        if (post.id === postId) {
          const wasLiked = post.userInteraction?.liked;
          const wasDisliked = post.userInteraction?.disliked;
          return {
            ...post,
            likes: wasLiked ? post.likes - 1 : post.likes,
            dislikes: wasDisliked ? post.dislikes - 1 : post.dislikes + 1,
            userInteraction: { liked: false, disliked: !wasDisliked },
          };
        }
        return post;
      })
    );
  };

  return (
    <Box sx={{ p: 3, maxWidth: 800, mx: 'auto' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700 }}>
        Social Feed
      </Typography>

      {/* Conditional Post Form */}
      {isLoggedIn ? (
        <Card sx={{ p: 2, mb: 4, borderRadius: 3, boxShadow: 2 }}>
          <TextField
            multiline
            minRows={3}
            placeholder="What's on your mind?"
            fullWidth
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
          />
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => e.target.files && setMediaFiles(Array.from(e.target.files))}
            style={{ marginTop: "16px" }}
          />
          <Button variant="contained" sx={{ mt: 2 }} onClick={handleCreatePost}>
            Post
          </Button>
        </Card>
      ) : (
        <Paper sx={{ p: 2, mb: 4, borderRadius: 3, textAlign: 'center' }}>
          <Typography color="text.secondary">
            You must be logged in to create a post.
          </Typography>
        </Paper>
      )}

      {/* Display Posts */}
      <Stack spacing={3}>
        {posts.map((post) => (
          <Card
            key={post.id}
            sx={{
              borderRadius: 3,
              boxShadow: 2,
              transition: '0.3s',
              '&:hover': { boxShadow: 6, transform: 'translateY(-3px)' },
            }}
          >
            <CardContent>
              {/* User Info */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    mr: 2,
                    bgcolor: 'primary.main',
                    width: 48,
                    height: 48,
                    fontWeight: 700,
                    fontSize: 18,
                    borderRadius: 2,
                  }}
                >
                  {post.user[0]}
                </Avatar>
                <Box>
                  <Typography variant="h6">{post.user}</Typography>
                  <Typography variant="caption" color="text.secondary">{post.timestamp}</Typography>
                </Box>
              </Box>

              {/* Content */}
              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6 }}>
                {post.content}
              </Typography>

              {/* Media */}
              {post.media?.map((item, index) => (
                <Box key={index} sx={{ mb: 2 }}>
                  {item.type === "image" ? (
                    <img src={item.url} alt="post media" style={{ maxWidth: "100%", borderRadius: 8 }} />
                  ) : (
                    <video src={item.url} controls style={{ maxWidth: "100%", borderRadius: 8 }} />
                  )}
                </Box>
              ))}

              <Divider sx={{ mb: 1 }} />

              {/* Like / Dislike */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Tooltip title="Like">
                  <IconButton
                    onClick={() => handleLike(post.id)}
                    color={post.userInteraction?.liked ? 'primary' : 'default'}
                    size="medium"
                    disabled={!isLoggedIn}
                  >
                    {post.userInteraction?.liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                  </IconButton>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">{post.likes}</Typography>

                <Tooltip title="Dislike">
                  <IconButton
                    onClick={() => handleDislike(post.id)}
                    color={post.userInteraction?.disliked ? 'error' : 'default'}
                    size="medium"
                    disabled={!isLoggedIn}
                  >
                    {post.userInteraction?.disliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                  </IconButton>
                </Tooltip>
                <Typography variant="body2" color="text.secondary">{post.dislikes}</Typography>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default SocialFeed;
