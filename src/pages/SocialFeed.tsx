
import React, { useState } from 'react';
import {
  Box,
  Typography,
  Card,
  CardContent,
  Avatar,
  Stack,
  IconButton,
  Divider,
  TextField,
  Button,
  Paper,
  useTheme,
} from '@mui/material';
import { alpha } from '@mui/system'; // Import alpha function
import {
  ThumbUp as ThumbUpIcon,
  ThumbUpOutlined as ThumbUpOutlinedIcon,
  ThumbDown as ThumbDownIcon,
  ThumbDownOutlined as ThumbDownOutlinedIcon,
} from '@mui/icons-material';

interface Comment {
  user: string;
  content: string;
  timestamp: string;
}

interface Post {
  id: number;
  user: string;
  content: string;
  media?: { type: 'image' | 'video'; url: string }[];
  timestamp: string;
  likes: number;
  dislikes: number;
  comments?: Comment[];
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
    comments: [
      { user: "Alice", content: "Great job!", timestamp: "1 hour ago" },
      { user: "Bob", content: "Thanks for sharing!", timestamp: "30 mins ago" },
    ],
  },
  {
    id: 2,
    user: "TruthSeeker",
    content: "Here's a great resource for fact-checking political statements.",
    timestamp: "5 hours ago",
    likes: 32,
    dislikes: 3,
    comments: [],
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
  const [newComment, setNewComment] = useState<{ [key: number]: string }>({});
  const theme = useTheme();

  const isGuest = !!localStorage.getItem('guestMode');
  const isLoggedIn = !!localStorage.getItem('token') || isGuest;

  // Handle new post creation
  const handleCreatePost = () => {
    if (!isLoggedIn) {
      alert("You must be logged in to post!");
      return;
    }
    if (!newPost.trim() && mediaFiles.length === 0) return;

    const media = mediaFiles.map(file => ({
      type: file.type.startsWith("video") ? "video" : "image" as 'image' | 'video',
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
      comments: [],
      userInteraction: { liked: false, disliked: false },
    };

    setPosts([newPostObj, ...posts]);
    setNewPost("");
    setMediaFiles([]);
  };

  // Handle like/dislike
  const handleLike = (postId: number) => {
    if (!isLoggedIn) return;
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
    if (!isLoggedIn) return;
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

  // Add comment
  const handleAddComment = (postId: number) => {
    const commentText = newComment[postId]?.trim();
    if (!commentText) return;

    setPosts(prev =>
      prev.map(post => {
        if (post.id === postId) {
          const updatedComments = [
            ...(post.comments || []),
            { user: isGuest ? "Guest" : "CurrentUser", content: commentText, timestamp: "Just now" },
          ];
          return { ...post, comments: updatedComments };
        }
        return post;
      })
    );

    setNewComment(prev => ({ ...prev, [postId]: "" }));
  };

  return (
    <Box sx={{ p: 3, maxWidth: 700, mx: 'auto', backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 700, color: theme.palette.text.primary }}>
        Social Feed
      </Typography>

      {/* New Post */}
      {isLoggedIn ? (
        <Card sx={{ p: 2, mb: 4, borderRadius: 4, boxShadow: 3, backgroundColor: theme.palette.background.paper }}>
          <TextField
            multiline
            minRows={3}
            placeholder="What's on your mind?"
            fullWidth
            value={newPost}
            onChange={(e) => setNewPost(e.target.value)}
            sx={{ mb: 2, backgroundColor: alpha(theme.palette.background.paper, 0.8), borderRadius: 1 }}
          />
          {/* Media preview */}
          {mediaFiles.map((file, idx) => (
            <Box key={idx} sx={{ mb: 1 }}>
              {file.type.startsWith("image") ? (
                <img src={URL.createObjectURL(file)} alt="preview" style={{ width: '100%', borderRadius: 8 }} />
              ) : (
                <video src={URL.createObjectURL(file)} controls style={{ width: '100%', borderRadius: 8 }} />
              )}
            </Box>
          ))}
          <input
            type="file"
            accept="image/*,video/*"
            multiple
            onChange={(e) => e.target.files && setMediaFiles(Array.from(e.target.files))}
            style={{ marginBottom: '12px' }}
          />
          <Button variant="contained" fullWidth onClick={handleCreatePost} sx={{ backgroundColor: theme.palette.primary.main, '&:hover': { backgroundColor: theme.palette.primary.dark } }}>
            Post
          </Button>
        </Card>
      ) : (
        <Paper sx={{ p: 2, mb: 4, borderRadius: 3, textAlign: 'center', backgroundColor: theme.palette.background.paper, color: theme.palette.text.secondary }}>
          <Typography color="inherit">
            You must be logged in to create a post.
          </Typography>
        </Paper>
      )}

      {/* Posts */}
      <Stack spacing={3}>
        {posts.map(post => (
          <Card key={post.id} sx={{
            borderRadius: 4,
            boxShadow: 3,
            transition: '0.3s',
            '&:hover': { boxShadow: 6, transform: 'translateY(-2px)' },
            backgroundColor: theme.palette.background.paper,
            color: theme.palette.text.primary,
          }}>
            <CardContent>
              {/* User info */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar sx={{ mr: 2, bgcolor: theme.palette.primary.main, width: 48, height: 48, fontWeight: 700, fontSize: 18 }}>
                  {post.user[0]}
                </Avatar>
                <Box>
                  <Typography variant="subtitle1" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{post.user}</Typography>
                  <Typography variant="caption" color="text.secondary">{post.timestamp}</Typography>
                </Box>
              </Box>

              {/* Content */}
              <Typography variant="body1" sx={{ mb: 2, lineHeight: 1.6, color: theme.palette.text.primary }}>{post.content}</Typography>

              {/* Media */}
              {post.media?.map((item, idx) => (
                <Box key={idx} sx={{ mb: 2 }}>
                  {item.type === 'image' ? (
                    <img src={item.url} alt="media" style={{ width: '100%', borderRadius: 8 }} />
                  ) : (
                    <video src={item.url} controls style={{ width: '100%', borderRadius: 8 }} />
                  )}
                </Box>
              ))}

              <Divider sx={{ my: 1, borderColor: theme.palette.divider }} />

              {/* Like / Dislike */}
              <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleLike(post.id)} color={post.userInteraction?.liked ? 'primary' : 'default'}>
                    {post.userInteraction?.liked ? <ThumbUpIcon /> : <ThumbUpOutlinedIcon />}
                  </IconButton>
                  <Typography variant="body2" color={theme.palette.text.secondary}>{post.likes}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <IconButton onClick={() => handleDislike(post.id)} color={post.userInteraction?.disliked ? 'error' : 'default'}>
                    {post.userInteraction?.disliked ? <ThumbDownIcon /> : <ThumbDownOutlinedIcon />}
                  </IconButton>
                  <Typography variant="body2" color={theme.palette.text.secondary}>{post.dislikes}</Typography>
                </Box>
              </Box>

              {/* Comments */}
              <Box sx={{ mt: 2 }}>
                {post.comments?.map((comment, cIdx) => (
                  <Box key={cIdx} sx={{ p: 2, mb: 1, borderRadius: 2, bgcolor: alpha(theme.palette.background.paper, 0.3), border: `1px solid ${theme.palette.divider}` }}>
                    <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                      <Avatar sx={{ width: 32, height: 32, mr: 1, bgcolor: theme.palette.primary.main }}>
                        {comment.user[0]}
                      </Avatar>
                      <Typography variant="subtitle2" sx={{ fontWeight: 600, color: theme.palette.text.primary }}>{comment.user}</Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>{comment.timestamp}</Typography>
                    </Box>
                    <Typography variant="body2" color={theme.palette.text.primary}>{comment.content}</Typography>
                  </Box>
                ))}

                {/* Add comment input */}
                <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                  <TextField
                    placeholder="Write a comment..."
                    size="small"
                    fullWidth
                    value={newComment[post.id] || ""}
                    onChange={(e) => setNewComment(prev => ({ ...prev, [post.id]: e.target.value }))}
                    sx={{ bgcolor: alpha(theme.palette.background.paper, 0.6), borderRadius: 2, "& .MuiOutlinedInput-notchedOutline": { border: "none" } }}
                  />
                  <Button sx={{ ml: 1 }} variant="contained" size="small" onClick={() => handleAddComment(post.id)} color="primary">
                    Comment
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default SocialFeed;
