import React from 'react';
import { Box, Typography, Link } from '@mui/material';
import YouTubeIcon from '@mui/icons-material/YouTube';

export default function AppFooter() {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#000',
        color: '#fff',
        py: 3,
        mt: 'auto',
        textAlign: 'center',
      }}
    >
      <Link
        href="https://www.youtube.com"
        target="_blank"
        rel="noopener noreferrer"
        underline="none"
        sx={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#fff',
          mb: 1,
        }}
      >
        <YouTubeIcon sx={{ fontSize: 30, mr: 1, color: '#FF0000' }} />
        <Typography variant="body1" sx={{ fontWeight: 'bold', fontSize: '1rem' }}>
          Click the icon to go to the YouTube 
        </Typography>
      </Link>

      <Typography
        variant="caption"
        sx={{
          display: 'block',
          textAlign: 'center',
          color: '#777',
          mt: 1,
        }}
      >
        © {new Date().getFullYear()} YouTube Summarizer
      </Typography>
    </Box>
  );
}
