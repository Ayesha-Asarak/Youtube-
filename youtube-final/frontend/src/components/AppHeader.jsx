import React from 'react';
import { AppBar, Toolbar, Typography, Box, Avatar, Menu, MenuItem, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HistoryIcon from '@mui/icons-material/History';
import YouTubeIcon from '@mui/icons-material/YouTube';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';

export default function AppHeader() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const navigate = useNavigate();

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  const goToHistory = () => {
    navigate('/history');
    handleClose();
  };

  const goToYouTube = () => {
    window.open('https://www.youtube.com', '_blank');
    handleClose();
  };

  return (
    <AppBar position="static" sx={{ bgcolor: '#000' }}>
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box display="flex" alignItems="center">
          <IconButton edge="start" sx={{ color: '#fff', mr: 1 }} onClick={handleMenuClick}>
            <MenuIcon />
          </IconButton>
          <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={goToHistory}>
              <HistoryIcon sx={{ mr: 1 }} /> History
            </MenuItem>
            <MenuItem onClick={goToYouTube}>
              <YouTubeIcon sx={{ mr: 1, color: 'red' }} /> YouTube
            </MenuItem>
          </Menu>
          <Avatar src={logo} alt="Logo" sx={{ width: 32, height: 32, mr: 1 }} />
          <Typography variant="h6" sx={{ color: '#fff', fontWeight: 600 }}>
            YouTube Summarizer
          </Typography>
        </Box>
        <Typography variant="subtitle1" sx={{ color: '#ccc' }}>
          Powered by Whisper + Gemini
        </Typography>
      </Toolbar>
    </AppBar>
  );
}
