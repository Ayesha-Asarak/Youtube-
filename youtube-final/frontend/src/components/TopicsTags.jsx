import React from 'react';
import { Chip, Box } from '@mui/material';

export default function TopicsTags({ topics }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
      {topics?.map((topic, index) => (
        <Chip 
          key={index} 
          label={topic} 
          sx={{ 
            backgroundColor: '#fff', 
            color: '#000',
            fontSize: '0.8rem'
          }}
        />
      ))}
    </Box>
  );
}
