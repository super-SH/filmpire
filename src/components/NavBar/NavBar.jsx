import React, { useState } from 'react';
import {
  AppBar,
  Avatar,
  Button,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { DrawerPaper, IconBtn, LinkBtn, Nav, StyledToolBar } from './styles';
import {
  AccountCircle,
  Brightness4,
  Brightness7,
  Menu,
} from '@mui/icons-material';
import { Search, SideBar } from '..';

function NavBar() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // temp
  const isAuthenticated = true;

  return (
    <>
      <AppBar position='fixed'>
        <StyledToolBar>
          {isMobile && (
            <IconBtn
              edge='start'
              onClick={() => setMobileNavOpen((open) => !open)}
            >
              <Menu />
            </IconBtn>
          )}
          <IconButton color='inherit' sx={{ ml: 1 }} onClick={() => {}}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}

          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={() => {}}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkBtn>
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar
                  sx={{ width: 30, height: 30 }}
                  src='https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_1280.png'
                  alt='Profile'
                />
              </LinkBtn>
            )}
          </div>
          {isMobile && <Search />}
        </StyledToolBar>
      </AppBar>
      <div>
        <Nav>
          {isMobile ? (
            <DrawerPaper
              variant='temporary'
              anchor='right'
              onClick={() => setMobileNavOpen((prevOpen) => !prevOpen)}
              open={mobileNavOpen}
              ModalProps={{ keepMounted: true }}
            >
              <SideBar setMobileNavOpen={setMobileNavOpen} />
            </DrawerPaper>
          ) : (
            <DrawerPaper variant='permanent' open>
              <SideBar setMobileNavOpen={setMobileNavOpen} />
            </DrawerPaper>
          )}
        </Nav>
      </div>
    </>
  );
}

export default NavBar;
