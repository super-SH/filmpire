import { Grid, styled } from '@mui/material';

export const NotFoundContainer = styled(Grid)(({ theme }) => ({
  width: '100%',
  height: '75vh',
  display: 'flex',
  alignItems: 'center',
  gap: '2rem',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(4),
  backgroundColor: '#f8d7da',
  color: '#721c24',
  borderRadius: theme.spacing(1),
  boxShadow: '0px 3px 10px rgba(0, 0, 0, 0.1)',
}));
