// src/pages/AboutUs.jsx

import React from 'react';
import { Box, Typography, Grid, Card, CardContent, CardMedia } from '@mui/material';

const linkedinLogo = '/LinkedInLogo2.png'; // Replace with the actual path or URL to the LinkedIn logo

const teamMembers = [
  {
    name: 'Amanda Mertz',
    role: 'Front End Developer',
    description:
      'Amanda focuses on front-end development, crafting interactive and user-friendly interfaces.',
    image: '/mertz-image.png', // Replace with the actual image path
    linkedin: 'https://www.linkedin.com/in/amanda-mertz-04603524b/', // Replace with actual LinkedIn profile URL
  },
  {
    name: 'Evan Trock',
    role: 'Full Stack Developer / Project Manager',
    description:
      'Evan oversees the project while contributing to both front-end and back-end development.',
    image: '/trock-image.png', // Replace with the actual image path
    linkedin: 'https://www.linkedin.com/in/evantrock/', // Replace with actual LinkedIn profile URL
  },
  {
    name: 'Connor Keane',
    role: 'Full Stack Developer',
    description: 'Connor works on both front-end and back-end to ensure seamless integration.',
    image: 'KeaneHeadShot.jpg', // Replace with the actual image path
    linkedin: 'https://www.linkedin.com/in/connor-keane/', // Replace with actual LinkedIn profile URL
  },
];

const AboutUs = () => {
  return (
    <div style={{ backgroundColor: '#121212', minHeight: '100vh' }}>
      <Box sx={{ padding: 4 }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ color: '#FFFFFF', paddingTop: '30px' }}
        >
          Our Mission
        </Typography>
        <Typography
          variant="body1"
          align="center"
          style={{ color: '#B3B3B3', paddingBottom: '20px', maxWidth: '800px', margin: '0 auto' }}
        >
          Our mission is to provide music enthusiasts with dynamic and interactive ways to explore
          popular albums and songs. By leveraging cutting-edge technologies, we aim to deliver an
          engaging platform that showcases music trends and insights.
        </Typography>
        <Grid container spacing={4} justifyContent="center" paddingLeft={10}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card style={{ maxWidth: 345, position: 'relative', backgroundColor: '#181818' }}>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ position: 'absolute', top: 8, right: 8 }}
                >
                  <img src={linkedinLogo} alt="LinkedIn" style={{ width: 24, height: 24 }} />
                </a>
                <CardMedia
                  component="img"
                  height="355"
                  image={member.image}
                  alt={member.name}
                />
                <CardContent>
                  <Typography variant="h6" component="div" style={{ color: '#FFFFFF' }}>
                    {member.name}
                  </Typography>
                  <Typography variant="subtitle1" style={{ color: '#B3B3B3' }}>
                    {member.role}
                  </Typography>
                  <Typography variant="body2" style={{ color: '#B3B3B3' }}>
                    {member.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </div>
  );
};

export default AboutUs;