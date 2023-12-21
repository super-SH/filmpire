import React from 'react';
import { MovieContainer } from './styles';
import { Movie } from '../';

function MovieList({ movies, limit }) {
  return (
    <MovieContainer container>
      {movies?.results?.slice(0, limit)?.map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </MovieContainer>
  );
}

export default MovieList;
