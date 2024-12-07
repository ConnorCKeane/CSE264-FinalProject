// src/api/api.js

import axios from 'axios';
import { Base64 } from 'js-base64'; // Remember to install this package: npm install js-base64

let accessToken = null;
let tokenExpiresAt = null;

// Function to get an access token using Client Credentials Flow
const getAccessToken = async () => {
  const currentTime = new Date().getTime();

  if (accessToken && tokenExpiresAt && currentTime < tokenExpiresAt) {
    return accessToken;
  }

  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  if (!clientId || !clientSecret) {
    console.error('Spotify client ID or client secret is missing.');
    throw new Error('Spotify client ID or client secret is missing.');
  }

  try {
    const authHeader = Base64.encode(`${clientId}:${clientSecret}`);
    const response = await axios.post(
      tokenUrl,
      'grant_type=client_credentials',
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization: `Basic ${authHeader}`,
        },
      }
    );

    accessToken = response.data.access_token;
    const expiresIn = response.data.expires_in * 1000; // Convert to milliseconds
    tokenExpiresAt = currentTime + expiresIn;

    return accessToken;
  } catch (error) {
    console.error('Error fetching Spotify access token:', error.response?.data || error.message);
    throw error;
  }
};

// Function to search for albums
export const searchAlbums = async (query) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type: 'album',
        limit: 5,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.albums.items;
  } catch (error) {
    console.error('Error searching albums:', error.response?.data || error.message);
    return [];
  }
};

// Function to search for tracks
export const searchTracks = async (query) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/search', {
      params: {
        q: query,
        type: 'track',
        limit: 5,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.tracks.items;
  } catch (error) {
    console.error('Error searching tracks:', error.response?.data || error.message);
    return [];
  }
};

// Function to get album details
export const getAlbumDetails = async (albumId) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/albums/${albumId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching album details:', error.response?.data || error.message);
    throw error;
  }
};

// Function to get track details
export const getTrackDetails = async (trackId) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(
      `https://api.spotify.com/v1/tracks/${trackId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return response.data;
  } catch (error) {
    console.error('Error fetching track details:', error.response?.data || error.message);
    throw error;
  }
};

// Function to get new releases
export const getNewReleases = async (limit = 3) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get('https://api.spotify.com/v1/browse/new-releases', {
      params: {
        limit,
      },
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data.albums.items;
  } catch (error) {
    console.error('Error fetching new releases:', error.response?.data || error.message);
    return [];
  }
};

// Function to get tracks from a public playlist
export const getPlaylistTracks = async (playlistId, limit = 3) => {
  try {
    const token = await getAccessToken();
    const response = await axios.get(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      params: {
        limit,
      },
    });

    const tracks = response.data.items.map((item) => item.track);

    // Filter out any null or undefined tracks
    return tracks.filter((track) => track !== null && track !== undefined);
  } catch (error) {
    console.error('Error fetching playlist tracks:', error.response?.data || error.message);
    return [];
  }
};