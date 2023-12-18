import { Grid, Typography, styled } from '@mui/material';
import { Link } from 'react-router-dom';

export const MovieItem = styled(Grid)(({ theme }) => ({
  padding: '10px',
}));

export const Title = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textOverflow: 'ellipsis',
  overflow: 'hidden',
  width: '230px',
  whiteSpace: 'nowrap',
  marginTop: '10px',
  marginBottom: 0,
}));

export const Img = styled('img')(({ theme }) => ({
  borderRadius: '5px',
  transition: 'all 0.25s ease-in-out',
  height: '300px',
  marginBottom: 1,
  '&:hover': {
    transform: 'scale(1.05)',
  },
}));

export const StyledLink = styled(Link)(({ theme }) => ({
  alignItems: 'center',
  fontWeight: 'bolder',
  textDecorationLine: 'none',
  [theme.breakpoints.up('xs')]: {
    display: 'flex',
    flexDirection: 'column',
  },
}));
