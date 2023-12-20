import React from 'react';
import { useSelector } from 'react-redux';
import { userSelector } from '../../features/authSlice';
import { Box, Button, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

function Profile() {
  const { user } = useSelector(userSelector());

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  return (
    <Box>
      <Box display='flex' justifyContent='space-between'>
        <Typography variant='h4' gutterButtom>
          My Profile - {user.username}
        </Typography>
        <Button color='inherit' onClick={handleLogout}>
          <span>Logout</span> <ExitToApp />
        </Button>
      </Box>

      <Typography variant='h5'>
        Add favorites or watchlist some movies to see them here!
      </Typography>
    </Box>
  );
}

export default Profile;
