import React from 'react';
import { Typography, Button } from '@mui/material';
import { Link } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { NotFoundContainer } from './styles';

function NotFound() {
  return (
    <NotFoundContainer container>
      <ErrorOutlineIcon style={{ fontSize: '3rem' }} />
      <Typography variant='h5'>404 - Not Found</Typography>
      <Typography variant='body1'>
        The page you are looking for does not exist.
      </Typography>
      <Button variant='contained' component={Link} to='/'>
        Go to Home
      </Button>
    </NotFoundContainer>
  );
}

export default NotFound;
