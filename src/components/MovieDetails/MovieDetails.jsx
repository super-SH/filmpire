import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import {
  useGetMovieQuery,
  useGetRecommendationsQuery,
} from '../../services/TMDB';
import {
  Box,
  Button,
  ButtonGroup,
  CircularProgress,
  Grid,
  Rating,
  Typography,
} from '@mui/material';
import {
  BtnsContainer,
  CastImg,
  ContainerSpaceAround,
  GenreImg,
  GenresContainer,
  Links,
  Poster,
  StyledModal,
  Video,
} from './styles';
import { useDispatch } from 'react-redux';

import genreIcons from '../../assets/genres/index';
import { selectCategory } from '../../features/categorySlice';
import {
  ArrowBack,
  Favorite,
  FavoriteBorderOutlined,
  Language,
  Movie as MovieIcon,
  PlusOne,
  Remove,
  Theaters,
} from '@mui/icons-material';
import { MovieList } from '..';

function MovieDetails() {
  const [trailerModalOpen, setTrailerModalOpen] = useState(false);
  // temp
  const isMovieWatchlisted = true;
  const isMovieFavorited = true;

  function addToWatchlist() {}
  function addToFavorites() {}

  const { movieId } = useParams();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data, isFetching, error } = useGetMovieQuery(movieId);
  const { data: recommendations, isFetching: isFetchingRecommendations } =
    useGetRecommendationsQuery({
      id: movieId,
      list: '/recommendations',
    });

  if (isFetching || isFetchingRecommendations)
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <CircularProgress size='8rem' />
      </Box>
    );

  if (error)
    return (
      <Box display='flex' justifyContent='center' alignItems='center'>
        <Link to='/'>Something has gone wrong - Go back</Link>
      </Box>
    );

  return (
    <ContainerSpaceAround container>
      <Grid
        item
        sm={12}
        lg={4}
        sx={{ display: 'flex', alignItems: 'flex-start' }}
      >
        <Poster
          src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>

      <Grid item container direction='column' lg={7}>
        <Typography variant='h3' align='center' gutterBottom>
          {data?.title} ({data?.release_date.split('-')[0]})
        </Typography>
        <Typography variant='h5' align='center' gutterBottom>
          {data?.tagline}
        </Typography>
        <ContainerSpaceAround>
          <Box display='flex' alignItems='center' gap='10px'>
            <Rating readOnly value={data?.vote_average / 2} />
            <Typography variant='subtitle1' gutterButtom>
              {data?.vote_average?.toFixed(1)} / 10
            </Typography>
          </Box>
          <Typography varient='h6' align='center' gutterBottom>
            {data?.runtime}mins{' '}
            {data?.spoken_languages.length > 0
              ? `/ ${data?.spoken_languages[0].english_name}`
              : ''}
          </Typography>
        </ContainerSpaceAround>
        <GenresContainer item>
          {data?.genres?.map((genre) => (
            <Links
              key={genre.name}
              onClick={() => {
                dispatch(selectCategory(genre.id));
                navigate('/');
              }}
            >
              <GenreImg
                src={genreIcons[genre.name.toLowerCase()]}
                alt={`genre icon of ${genre.name}`}
              />
              <Typography color='textPrimary' variant='subtitle1'>
                {genre?.name}
              </Typography>
            </Links>
          ))}
        </GenresContainer>
        <Typography variant='h5' gutterButtom mt={'10px'}>
          Overview
        </Typography>
        <Typography mb='2rem'>{data?.overview}</Typography>

        <Typography variant='h5' gutterButtom>
          Top Cast
        </Typography>

        <Grid item container spacing={2}>
          {data?.credits?.cast
            ?.map(
              (actor, i) =>
                actor.profile_path && (
                  <Grid
                    key={i}
                    item
                    xs={4}
                    md={2}
                    onClick={() => navigate(`/actors/${actor.id}`)}
                    style={{ textDecoration: 'none', cursor: 'pointer' }}
                  >
                    <CastImg
                      src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                      alt={actor.name}
                    />
                    <Typography color='textPrimary'>{actor?.name}</Typography>
                    <Typography color='textSecondary'>
                      {actor.character.split('/')[0]}
                    </Typography>
                  </Grid>
                )
            )
            .slice(0, 6)}
        </Grid>

        <Grid item container style={{ marginTop: '2rem' }}>
          <BtnsContainer item container spacing={1}>
            <BtnsContainer item xs={12}>
              <ButtonGroup size='medium' variant='outlined'>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={data?.homepage}
                  endIcon={<Language />}
                >
                  Website
                </Button>
                <Button
                  target='_blank'
                  rel='noopener noreferrer'
                  href={`https://www.imdb.com/title/${data?.imdb_id}`}
                  endIcon={<MovieIcon />}
                >
                  IMDB
                </Button>
                <Button
                  onClick={() => setTrailerModalOpen(true)}
                  href='#'
                  endIcon={<Theaters />}
                >
                  Trailer
                </Button>
              </ButtonGroup>
            </BtnsContainer>
            <BtnsContainer item xs={12}>
              <ButtonGroup size='medium' variant='outlined'>
                <Button
                  onClick={addToFavorites}
                  endIcon={
                    isMovieFavorited ? <FavoriteBorderOutlined /> : <Favorite />
                  }
                >
                  {isMovieFavorited ? 'Unfavorite' : 'Favorite'}
                </Button>
                <Button
                  onClick={addToWatchlist}
                  endIcon={isMovieWatchlisted ? <Remove /> : <PlusOne />}
                >
                  Watchlist
                </Button>
                <Button
                  onClick={() => navigate('/')}
                  endIcon={<ArrowBack />}
                  sx={{ borderColor: 'primary.main' }}
                >
                  <Typography color='inherit' variant='subtitle2'>
                    Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </BtnsContainer>
          </BtnsContainer>
        </Grid>
      </Grid>

      <Box marginTop='5rem' width='100%'>
        <Typography variant='h3' gutterBottom align='center'>
          You might also like
        </Typography>
        {recommendations ? (
          <MovieList movies={recommendations} limit={12} />
        ) : (
          <Box>Sorry, nothing was found.</Box>
        )}
      </Box>

      <StyledModal
        closeAfterTransition
        open={trailerModalOpen}
        onClose={() => setTrailerModalOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
          <Video
            autoPlay
            title='Trailer'
            src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
            allow='autoplay'
          />
        )}
      </StyledModal>
    </ContainerSpaceAround>
  );
}

export default MovieDetails;
