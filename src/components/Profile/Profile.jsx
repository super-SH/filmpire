import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Box, Button, CircularProgress, Typography } from '@mui/material';
import { ExitToApp } from '@mui/icons-material';

import { userSelector } from '../../features/authSlice';
import { useGetListQuery } from '../../services/TMDB';
import { RatedCards } from '../';

function Profile() {
  const { user } = useSelector(userSelector());

  const {
    data: favoriteMovies,
    isFetching: isFetchingFavorites,
    refetch: refetchFavorites,
  } = useGetListQuery({
    listName: 'favorite/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });
  const {
    data: watchlistMovies,
    isFetching: isFetchingWatchList,
    refetch: refetchWatchlisted,
  } = useGetListQuery({
    listName: 'watchlist/movies',
    accountId: user.id,
    sessionId: localStorage.getItem('session_id'),
    page: 1,
  });

  useEffect(() => {
    refetchFavorites();
    refetchWatchlisted();
  }, [refetchFavorites, refetchWatchlisted]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = '/';
  };

  if (isFetchingFavorites || isFetchingWatchList)
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='4rem' />
      </Box>
    );

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

      {!favoriteMovies?.results?.length && !watchlistMovies?.results?.length ? (
        <Typography variant='h5'>
          Add favorites or watchlist some movies to see them here!
        </Typography>
      ) : (
        <Box>
          <RatedCards title='Favorite Movies' data={favoriteMovies} />
          <RatedCards title='Watchlist' data={watchlistMovies} />
        </Box>
      )}
    </Box>
  );
}

export default Profile;
