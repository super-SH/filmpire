import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Box, Typography } from '@mui/material';

import {
  Container,
  StyledCard,
  StyledCardContent,
  StyledCardMedia,
} from './styles';

function FeaturedMovie({ movie }) {
  const navigate = useNavigate();

  if (!movie) return null;

  return (
    <Container onClick={() => navigate(`/movies/${movie.id}`)}>
      <StyledCard>
        <StyledCardMedia
          media='picture'
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original/${movie?.backdrop_path}`}
          title={movie.title}
        />
        <Box padding='20px'>
          <StyledCardContent>
            <Typography variant='h5' gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant='body2'>{movie.overview}</Typography>
          </StyledCardContent>
        </Box>
      </StyledCard>
    </Container>
  );
}

export default FeaturedMovie;
