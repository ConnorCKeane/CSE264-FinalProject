import React, { useEffect, useState } from 'react';
import {
  Container,
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
import { createClient } from '@supabase/supabase-js'; 

const supabaseUrl = 'https://ohbyfafavfrtcphqwguz.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9oYnlmYWZhdmZydGNwaHF3Z3V6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzMyNTM4MDEsImV4cCI6MjA0ODgyOTgwMX0.0rkqAdRY-JlQK56KHUkIczTivXKcHx2WO3pk2Xc9qvU';
const supabase = createClient(supabaseUrl, supabaseKey);

const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [selectedPost, setSelectedPost] = useState(null);


  useEffect(() => {
    const loadPosts = async () => {
      try {
        const { data, error } = await supabase
          .from('posts')
          .select('*')
          .order('created_at', { ascending: false })
          .limit(10);

        if (error) {
          throw error;
        }

        setPosts(data);
      } catch (error) {
        console.error('Error loading posts:', error);
      }
    };

    loadPosts();
  }, []);

  const handleCardClick = (post) => {
    setSelectedPost(post);
  };

  const handleCloseDialog = () => {
    setSelectedPost(null);
  };

  const handleDeletePost = async (postId) => {
    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) {
        throw error;
      }

      setPosts(posts.filter(post => post.id !== postId));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  const renderCards = (items) =>
    items.map((item, index) => (
      <Grid item xs={12} sm={4} key={item.id || index}>
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
            image={item.data.images?.[0]?.url || item.data.album?.images?.[0]?.url}
            sx={{ height: 200 }}
          />
          <CardContent>
            <Typography variant="h6" align="center" style={{ color: '#B3B3B3', fontSize: '1rem', fontWeight: 'bold' }}>
              {item.data.name}
            </Typography>
            <Typography variant="body2" align="center" style={{ color: '#B3B3B3', fontSize: '0.75rem', marginTop: '10px' }}>
              {item.user_email.split('@')[0]} - Rating: {item.rating} / 5
            </Typography>
          </CardContent>
        </Card>
      </Grid>
    ));

  return (
    <div style={{ width: '100%', minHeight: '100vh', padding: '0', backgroundColor: '#121212' }}>
      <Container maxWidth="lg" style={{ paddingTop: '30px' }}>
        {/* Recent Posts */}
        <Typography variant="h4" align="center" gutterBottom style={{ color: '#FFFFFF' }}>
          Lehigh Muse
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {renderCards(posts)}
        </Grid>
      </Container>

      {/* Dialog for Details */}
      {selectedPost && (
        <Dialog open={Boolean(selectedPost)} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle style={{ color: '#FFFFFF', backgroundColor: '#181818' }}>{selectedPost.title}</DialogTitle>
          <DialogContent style={{ backgroundColor: '#181818' }}>
            <Typography variant="subtitle1" style={{ color: '#B3B3B3' }}>
              <strong>Author:</strong> {selectedPost.user_email}
            </Typography> 
            <Typography variant="subtitle1" style={{ color: '#B3B3B3' }}>
              <strong>Rating(1-5):</strong> {selectedPost.rating}
            </Typography>
            <Typography variant="subtitle1" style={{ color: '#B3B3B3' }}>
              <strong>Caption:</strong> {selectedPost.caption}
            </Typography>
            <Typography variant="subtitle1" style={{ color: '#B3B3B3' }}>
              <strong>Created At:</strong> {new Date(selectedPost.created_at).toLocaleString()}
            </Typography>
          </DialogContent>
          <DialogActions style={{ backgroundColor: '#181818' }}>
            <Button onClick={handleCloseDialog} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
      )}
    </div>
  );
};

export default HomePage;
