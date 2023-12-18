import { Button, Drawer, IconButton, Toolbar, styled } from '@mui/material';

export const StyledToolBar = styled(Toolbar)(({ theme }) => ({
  height: '80px',
  marginLeft: '240px',
  display: 'flex',
  justifyContent: 'space-between',
  [theme.breakpoints.down('sm')]: {
    marginLeft: 0,
    flexWrap: 'wrap',
  },
}));

export const IconBtn = styled(IconButton)(({ theme }) => ({
  color: 'inherit',
  outline: 'none',
  marginRight: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    display: 'none',
  },
}));

export const LinkBtn = styled(Button)(({ theme }) => ({
  color: 'inherit',
  '&:hover': {
    color: 'white !important',
    textDecoration: 'none',
  },
}));

export const Nav = styled('nav')(({ theme }) => ({
  [theme.breakpoints.up('sm')]: {
    width: '240px',
    flexShrink: 0,
  },
}));

export const DrawerPaper = styled(Drawer)(({ theme }) => ({
  width: '240px',
}));
