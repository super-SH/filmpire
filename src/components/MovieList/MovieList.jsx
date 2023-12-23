import React from 'react';
import { MovieContainer } from './styles';
import { Movie } from '../';

function MovieList({ movies, limit, excludeFirst }) {
  const startFrom = excludeFirst ? 1 : 0;

  return (
    <MovieContainer container>
      {movies?.results?.slice(startFrom, limit)?.map((movie, i) => (
        <Movie key={movie.id} movie={movie} i={i} />
      ))}
    </MovieContainer>
  );
}

export default MovieList;
