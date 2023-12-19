import React, { useState } from 'react';
import { useGetMoviesQuery } from '../../services/TMDB';
import { MovieList } from '../';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useSelector } from 'react-redux';

function Movies() {
  const [page, setPage] = useState(1);
  const { categoryName, searchQuery } = useSelector(
    (state) => state.currentCategory
  );

  const { data, isFetching, error } = useGetMoviesQuery({
    categoryName,
    page,
    searchQuery,
  });

  if (isFetching)
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='4rem' />
      </Box>
    );

  if (!data?.results.length)
    return (
      <Box display='flex' alignItems='center' mt='20px'>
        <Typography variant='h4'>
          No Movies that match that name.
          <br />
          Please search for something else
        </Typography>
      </Box>
    );

  if (error) return 'An error has occured';

  return <MovieList movies={data} />;
}

export default Movies;
