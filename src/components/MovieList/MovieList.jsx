import React from 'react';
import { MovieContainer } from './styles';
import { Movie } from '../';

function MovieList({ movies }) {
  return (
    <MovieContainer container>
      {movies?.results?.map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </MovieContainer>
  );
}

export default MovieList;
