import { useTheme } from '@mui/system';
import React from 'react';
import { GenreImg, LinkContainer, StyledLink } from './styles';
import { useNavigate } from 'react-router-dom';
import {
  Divider,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListSubheader,
} from '@mui/material';

const blueLogo =
  'https://fontmeme.com/permalink/210930/8531c658a743debe1e1aa1a2fc82006e.png';
const redLogo =
  'https://fontmeme.com/permalink/210930/6854ae5c7f76597cf8680e48a2c8a50a.png';

const categories = [
  {
    label: 'adfdasf',
    value: 'asdfa',
  },
];

function SideBar({ setMobileNavOpen }) {
  const theme = useTheme();
  const navigate = useNavigate();

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
          <StyledLink onClick={() => {}} key={value}>
            <ListItemButton>
              {/* <ListItemIcon>
                <GenreImg src={redLogo} />
              </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </StyledLink>
        ))}
      </List>

      <Divider />

      <List>
        <ListSubheader>Genres</ListSubheader>
        {categories?.map(({ label, value }) => (
          <StyledLink onClick={() => {}} key={value}>
            <ListItemButton>
              {/* <ListItemIcon>
          <GenreImg src={redLogo} />
        </ListItemIcon> */}
              <ListItemText primary={label} />
            </ListItemButton>
          </StyledLink>
        ))}
      </List>
    </>
  );
}

export default SideBar;
