import { useTheme } from '@mui/system';
import React from 'react';
import { GenreImg, LinkContainer, StyledLink } from './styles';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  CircularProgress,
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';
import { useGetGenresQuery } from '../../services/TMDB';
import genreIcons from '../../assets/genres';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory } from '../../features/categorySlice';

const blueLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  { label: 'Popular', value: 'popular' },
  { label: 'Top Rated', value: 'top_rated' },
  { label: 'Upcoming', value: 'upcoming' },
];

function SideBar({ setMobileNavOpen }) {
  const { categoryName } = useSelector((state) => state.currentCategory);
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { data: { genres } = {}, isFetching } = useGetGenresQuery();

  return (
    <>
      <LinkContainer onClick={() => navigate('/')}>
        <img
          src={theme.palette.mode === 'light' ? blueLogo : redLogo}
          alt='Filmpire Logo'
        />
      </LinkContainer>

      <Divider />

      <List>
        <ListSubheader>Categories</ListSubheader>
        {categories?.map(({ label, value }) => (
          <StyledLink
            onClick={() => dispatch(selectCategory(value))}
            key={value}
          >
            <ListItemButton>
              <ListItemIcon>
                <GenreImg src={genreIcons[label.toLowerCase()]} />
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </StyledLink>
        ))}
      </List>

      <Divider />

      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display='flex' justifyContent='center' alignItems='center'>
            <CircularProgress />
          </Box>
        ) : (
          genres?.map(({ name, id }) => (
            <StyledLink
              onClick={() => {
                dispatch(selectCategory(id));
              }}
              key={id}
            >
              <ListItemButton>
                <ListItemIcon>
                  <GenreImg src={genreIcons[name.toLowerCase()]} />
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItemButton>
            </StyledLink>
          ))
        )}
      </List>
    </>
  );
}

export default SideBar;
