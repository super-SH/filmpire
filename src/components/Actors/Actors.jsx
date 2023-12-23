import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { Grid, Typography, Box, Button, CircularProgress } from '@mui/material';
import { ArrowBack } from '@mui/icons-material';

import {
  useGetActorQuery,
  useGetMoviesByActorQuery,
} from '../../services/TMDB';

import { MovieList, Pagination } from '..';

import { Img } from './styles';

function Actors() {
  const [page, setPage] = useState(1);

  const { actorId } = useParams();
  const navigate = useNavigate();

  const { data, isFetching, error } = useGetActorQuery(actorId);
  const { data: movies } = useGetMoviesByActorQuery({ id: actorId, page });

  if (isFetching) {
    return (
      <Box display='flex' justifyContent='center'>
        <CircularProgress size='8rem' />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Button
          startIcon={<ArrowBack />}
          onClick={() => navigate(-1)}
          color='primary'
        >
          Go back
        </Button>
      </Box>
    );
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={5} xl={4}>
          <Img
            src={`https://image.tmdb.org/t/p/w780/${data?.profile_path}`}
            alt={data?.name}
          />
        </Grid>
        <Grid
          item
          lg={7}
          xl={8}
          style={{
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          }}
        >
          <Typography variant='h2' gutterBottom fontWeight={'medium'}>
            {data?.name}
          </Typography>
          <Typography variant='h5' gutterBottom>
            Born: {new Date(data?.birthday).toDateString()}
          </Typography>
          <Typography variant='body1' align='justify' paragraph>
            {data?.biography || 'Sorry, no biography yet...'}
          </Typography>
          <Box marginTop='2rem' display='flex' justifyContent='space-around'>
            <Button
              variant='contained'
              color='primary'
              target='_blank'
              href={`https://www.imdb.com/name/${data?.imdb_id}`}
            >
              IMDB
            </Button>
            <Button
              startIcon={<ArrowBack />}
              onClick={() => navigate(-1)}
              color='primary'
            >
              Back
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Box margin='2rem 0'>
        <Typography variant='h2' gutterBottom align='center'>
          Movies
        </Typography>
        {movies && <MovieList movies={movies} limit={12} />}
        <Pagination
          currentPage={page}
          setPage={setPage}
          totalPages={movies?.total_pages}
        />
      </Box>
    </>
  );
}

export default Actors;
