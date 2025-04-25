import React from 'react';
import { Box, Typography} from '@mui/material';

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
