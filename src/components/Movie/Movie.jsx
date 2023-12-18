import React from 'react';
import { Img, MovieItem, StyledLink, Title } from './styles';
import { Grow, Rating, Tooltip, Zoom } from '@mui/material';

function Movie({ movie, i }) {
  return (
    <MovieItem item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <StyledLink to={`/movie/${movie.id}`}>
          <Img
            src={
              movie.poster_path
                ? `https://image.tmdb.org/t/p/w500/${movie.poster_path}`
                : 'https://fillmurray.com/200/300'
            }
            alt={movie.title}
          />
          <Title variant='h5'>{movie.title}</Title>
          <Tooltip
            disableTouchListener
            title={`${movie.vote_average} / 10`}
            TransitionComponent={Zoom}
          >
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </StyledLink>
      </Grow>
    </MovieItem>
  );
}

export default Movie;
