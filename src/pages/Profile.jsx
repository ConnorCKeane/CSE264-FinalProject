import React, { useContext, useEffect, useState } from 'react';
import { UserContext } from '../UserContext';
import {
  Container,
  Box,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Dialog,
  DialogContent,
  DialogTitle,
  DialogActions,
  Button,
} from '@mui/material';
import supabase from '../supabaseClient';

// Define admin emails
const adminEmails = [
  'cck226@lehigh.edu',
  'cck123@example.com',
  'cck456@example.com',
];

const Profile = () => {
  const { user } = useContext(UserContext);
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check if the current user is an admin
  useEffect(() => {
    if (user && user.email) {
      setIsAdmin(adminEmails.includes(user.email));
    } else {
      setIsAdmin(false);
    }
  }, [user]);

  // Fetch posts based on user role
  const fetchPosts = async () => {
    if (!user || !user.email) return;

    try {
      let query = supabase.from('posts').select('*');

      if (!isAdmin) {
        // Regular user: fetch only their own posts
        query = query.eq('user_email', user.email);
      } else {
        // Admin: fetch all posts
        // Optionally, you can add ordering or pagination here
        query = query.order('created_at', { ascending: false });
      }

      const { data, error } = await query;

      if (error) {
        throw error;
      }

      setPosts(data || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
      alert('Failed to fetch posts. Please try again later.');
    }
  };

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isAdmin]);

  // Handle clicking on a post card
  const handleCardClick = (post) => {
    setSelectedPost(post);
  };

  // Close the post details dialog
  const handleCloseDialog = () => {
    setSelectedPost(null);
  };

  // Handle deleting a post
  const handleDeletePost = async (postId) => {
    try {
      const { error } = await supabase.from('posts').delete().eq('id', postId);

      if (error) {
        throw error;
      }

      // Remove the deleted post from the local state
      setPosts(posts.filter((post) => post.id !== postId));
      setSelectedPost(null);
      alert('Post deleted successfully!');
    } catch (error) {
      console.error('Error deleting post:', error);
      alert('Failed to delete the post. Please try again.');
    }
  };

  // Render posts as cards
  const renderCards = (items) =>
    items.map((item) => (
      <Grid item xs={12} sm={4} key={item.id}>
        <Card
          sx={{
            backgroundColor: '#181818',
            cursor: 'pointer',
            '&:hover': { transform: 'scale(1.05)', transition: 'transform 0.3s' },
          }}
          onClick={() => handleCardClick(item)}
        >
          <CardMedia
            component="img"
            image={
              item.data.images?.[0]?.url ||
              item.data.album?.images?.[0]?.url ||
              '/placeholder-image.png'
            }
            alt={item.data.name || 'Post Image'}
            sx={{ height: 200 }}
          />
          <CardContent>
            <Typography
              variant="h6"
              align="center"
              style={{ color: '#B3B3B3', fontSize: '1rem', fontWeight: 'bold' }}
            >
              {item.data.name || 'Untitled'}
            </Typography>
            <Typography
              variant="body2"
              align="center"
              style={{ color: '#B3B3B3', fontSize: '0.75rem', marginTop: '10px' }}
            >
              {item.user_email.split('@')[0]} - Rating: {item.rating} / 5
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));

  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh', padding: '20px 0' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            backgroundColor: '#181818',
            padding: 4,
            borderRadius: 2,
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
          }}
        >
          <Typography variant="h4" align="center" gutterBottom style={{ color: '#FFFFFF' }}>
            Profile {isAdmin && '(Admin)'}
          </Typography>
          <Typography variant="body1" align="center" gutterBottom style={{ color: '#B3B3B3' }}>
            Email: {user?.email || 'Loading...'}
          </Typography>

          <Typography
            variant="h5"
            align="center" // Added align center
            gutterBottom
            style={{ color: '#FFFFFF', marginTop: '30px' }}
          >
            {isAdmin ? 'All Posts' : 'Your Posts'}
          </Typography>
          {posts.length === 0 ? (
            <Typography variant="body1" style={{ color: '#B3B3B3' }}>
              {isAdmin
                ? 'No posts available.'
                : 'You have not created any posts yet.'}
            </Typography>
          ) : (
            <Grid container spacing={4} justifyContent="center">
              {renderCards(posts)}
            </Grid>
          )}
        </Box>
      </Container>

      {/* Dialog for Post Details */}
      {selectedPost && (
        <Dialog
          open={Boolean(selectedPost)}
          onClose={handleCloseDialog}
          maxWidth="sm"
          fullWidth
          PaperProps={{
            style: { backgroundColor: '#181818', color: '#FFFFFF' },
          }}
        >
          <DialogTitle>{selectedPost.data.name || 'Untitled Post'}</DialogTitle>
          <DialogContent>
            <img
              src={
                selectedPost.data.images?.[0]?.url ||
                selectedPost.data.album?.images?.[0]?.url ||
                '/placeholder-image.png'
              }
              alt={selectedPost.data.name || 'Post Image'}
              style={{ width: '100%', borderRadius: '8px', marginBottom: '20px' }}
            />
            <Typography variant="subtitle1">
              <strong>Author:</strong> {selectedPost.user_email}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Rating (1-5):</strong> {selectedPost.rating}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Caption:</strong> {selectedPost.caption || 'No caption provided.'}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Created At:</strong> {new Date(selectedPost.created_at).toLocaleString()}
            </Typography>
          </DialogContent>
          <DialogActions>
            {/* Show Delete button if user is admin or the author of the post */}
            {(isAdmin || selectedPost.user_email === user.email) && (
              <Button
                onClick={() => {
                  if (
                    window.confirm(
                      'Are you sure you want to delete this post? This action cannot be undone.'
                    )
                  ) {
                    handleDeletePost(selectedPost.id);
                  }
                }}
                color="secondary"
                variant="contained"
              >
                Delete Post
              </Button>
            )}
            <Button onClick={handleCloseDialog} color="primary" variant="outlined">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default Profile;