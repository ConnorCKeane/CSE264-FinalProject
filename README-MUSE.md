# LehighMuse

## Description
**LehighMuse** is a web application designed to enhance the campus experience at Lehigh University. It allows users to create, share, and discover posts related to campus events and music preferences. Utilizing React, Material-UI (MUI), and Supabase, LehighMuse offers an interactive and user-friendly interface with Spotify API integration for personalized music recommendations.

## Team Members
- **Amanda Mertz** - Frontend Developer
- **Connor Keane** - FullStack Developer
- **Evan Trock** - Backend Developer

## Features
- **User Accounts & Roles**: Secure authentication with User and Admin roles.
- **Database Integration**: Managed by Supabase for user data and posts.
- **Interactive UI**: Built with React and Material-UI.
- **Spotify API**: Integrated for music-related searches and posts.
- **Post Management**: Create, view, and delete posts. Admins can manage all posts.

## Requirements Fulfillment
- **User Accounts & Roles**: Implemented via Supabase Auth with role-based access.
- **Database**: Supabase used for data storage and management.
- **Interactive UI**: Developed using React and Material-UI.
- **Spotify API**: Integrated for music-related features.
- **External REST API**: Utilized Spotify's API to enhance functionalities.

## User Stories
1. **Registration**: Users can sign up and log in.
2. **Role-Based Access**: Admins can manage all posts; users manage their own.
3. **Spotify Connection**: Users connect Spotify for personalized features.
4. **Post Creation**: Users create and share posts.
5. **Content Discovery**: Browse and interact with posts from others.
6. **Post Deletion**: Users delete their own posts; Admins delete any post.

## Technical Design

### Tech Stack
- **Frontend**: React, Material-UI (MUI)
- **Backend**: Supabase
- **APIs**: Spotify API

### Architecture
Client-server model with React frontend communicating with Supabase for data and authentication. Spotify API integrated for music data.

### Database Schema
- **Users**
  - `id` (UUID)
  - `email` (String)
  - `role` (String)
  - `spotify_access_token` (String)

- **Posts**
  - `id` (UUID)
  - `user_id` (UUID)
  - `content` (Text)
  - `rating` (Integer)
  - `created_at` (Timestamp)
  - `data` (JSON)

## Installation

### Prerequisites
- Node.js (v14+)
- npm
- Supabase account
- Spotify Developer account

### Steps
1. **Clone Repository**
   ```bash
   git clone https://github.com/ConnorCKeane/CSE264-FinalProject.git
   cd LehighMuse