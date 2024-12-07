import React, { useState } from 'react';
import {
  TextField,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Grid2 as Grid,
  Box,
  ToggleButton,
  ToggleButtonGroup,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Rating,
} from '@mui/material';
import { searchAlbums, getAlbumDetails, searchTracks, getTrackDetails } from '../api/api';
import supabase from '../supabaseClient'; // Import Supabase client

const AlbumSearch = () => {
  const [searchType, setSearchType] = useState('album');
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [caption, setCaption] = useState('');

  const handleSearchTypeChange = (event, newSearchType) => {
    if (newSearchType) {
      setSearchType(newSearchType);
      setResults([]);
      setSelectedItem(null);
    }
  };

  const handleSearch = async () => {
    if (!searchQuery.trim()) return;

    try {
      if (searchType === 'album') {
        const albums = await searchAlbums(searchQuery);
        setResults(albums.map((album) => ({ id: album.id, type: 'album', data: album })));
      } else if (searchType === 'track') {
        const tracks = await searchTracks(searchQuery);
        setResults(tracks.map((track) => ({ id: track.id, type: 'track', data: track })));
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    }
  };

  const handleSaveToMuse = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession(); // Get logged-in user
      const user = session.user;
      const payload = {
        artist: selectedItem.artists,
        user_email: user.email,
        type: selectedItem.type,
        data: selectedItem.data,
        rating,
        caption,
        created_at: new Date().toISOString(),
      };

      const { data, error } = await supabase.from('posts').insert([payload]).select();
      if (error) throw error;

      alert('Saved to My Muse!');
      setOpenDialog(false);
      setRating(0);
      setCaption('');
    } catch (error) {
      console.error('Error saving to My Muse:', error);
      alert('Failed to save. Try again.');
    }
  };

  const handleOpenDialog = (item) => {
    setSelectedItem(item);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setRating(0);
    setCaption('');
  };

  return (
    <Box sx={{ backgroundColor: '#121212', minHeight: '100vh', paddingTop: '50px', color: '#FFFFFF', paddingX: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <ToggleButtonGroup
          value={searchType}
          exclusive
          onChange={handleSearchTypeChange}
          sx={{ backgroundColor: '#1DB954', borderRadius: '4px' }}
        >
          <ToggleButton value="album" sx={{ color: searchType === 'album' ? '#FFFFFF' : '#000000', backgroundColor: searchType === 'album' ? '#1DB954' : '#FFFFFF' }}>
            Album
          </ToggleButton>
          <ToggleButton value="track" sx={{ color: searchType === 'track' ? '#FFFFFF' : '#000000', backgroundColor: searchType === 'track' ? '#1DB954' : '#FFFFFF' }}>
            Song
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 2 }}>
        <TextField
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for an album or song"
          sx={{ backgroundColor: '#FFFFFF', borderRadius: '4px', width: '80%' }}
        />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', mb: 3 }}>
        <Button variant="contained" onClick={handleSearch} sx={{ backgroundColor: '#1DB954', color: '#FFFFFF' }}>
          Search
        </Button>
      </Box>
      {results.length > 0 && (
        <Grid container spacing={3} sx={{ mt: 3, paddingX: 2 }}>
          {results.map((item) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={item.id}>
              <Card sx={{ backgroundColor: '#181818', textAlign: 'center', padding: 2, height: '100%' }}>
                <CardMedia
                  component="img"
                  image={item.data.images?.[0]?.url || item.data.album?.images?.[0]?.url}
                  alt={item.data.name}
                  sx={{ height: 200, margin: '0 auto' }}
                />
                <CardContent>
                  <Typography variant="h6" sx={{ color: '#FFFFFF' }}>{item.data.name}</Typography>
                  <Typography variant="subtitle1" sx={{ color: '#FFFFFF' }}>
                    {item.type === 'album'
                      ? `Artist: ${item.data.artists.map((artist) => artist.name).join(', ')}`
                      : `Album: ${item.data.album.name}`}
                  </Typography>
                  <Button
                    variant="contained"
                    onClick={() => handleOpenDialog(item)}
                    sx={{ backgroundColor: '#1DB954', mt: 1 }}
                  >
                    My Muse
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
      <Dialog open={openDialog} onClose={handleCloseDialog} PaperProps={{ sx: { backgroundColor: '#121212', color: '#FFFFFF' } }}>
        <DialogTitle>Save to My Muse</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#FFFFFF' }}>
            Please provide a rating and an optional caption for this {selectedItem?.type}.
          </DialogContentText>
          <Rating
            value={rating}
            onChange={(_, newValue) => setRating(newValue)}
            max={5}
            sx={{ mt: 2, color: '#1DB954', '& .MuiRating-iconEmpty': { color: '#FFFFFF' } }}
          />
          <TextField
            autoFocus
            margin="dense"
            label="Caption"
            type="text"
            fullWidth
            variant="standard"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            sx={{ mt: 2, backgroundColor: '#FFFFFF', borderRadius: '4px' }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} sx={{ color: '#1DB954' }}>Cancel</Button>
          <Button onClick={handleSaveToMuse} sx={{ color: '#1DB954' }}>Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AlbumSearch;