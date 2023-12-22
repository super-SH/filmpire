import React, { useEffect, useState } from 'react';
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
import { createSessionId, fetchToken, movieApi } from '../../utils';
import { useDispatch, useSelector } from 'react-redux';
import { setUser, userSelector } from '../../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { useColorMode } from '../../utils/ToggleColorMode';

function NavBar() {
  const { isAuthenticated, user } = useSelector(userSelector());
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const token = localStorage.getItem('request_token');
  const sessionIdFromLocalStorage = localStorage.getItem('session_id');

  const { toggleColorMode } = useColorMode();

  useEffect(
    function () {
      const logInUser = async () => {
        //  1. if there is no token , do nothing
        if (!token) return;

        // 2. if there is a token ,check session id from local storage

        // 2. A ) get account with existing session id
        if (sessionIdFromLocalStorage) {
          const { data: userData } = await movieApi.get(
            `/account?session_id=${sessionIdFromLocalStorage}`
          );
          dispatch(setUser(userData));
        }

        // 2. B ) no session from local storage , create a new sessionId and login with it
        else {
          const session_id = await createSessionId();

          const { data: userData } = await movieApi.get(
            `/account?session_id=${session_id}`
          );
          dispatch(setUser(userData));
        }
      };

      logInUser();
    },
    [token, sessionIdFromLocalStorage, dispatch]
  );

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
          <IconButton color='inherit' sx={{ ml: 1 }} onClick={toggleColorMode}>
            {theme.palette.mode === 'dark' ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}

          <div>
            {!isAuthenticated ? (
              <Button color='inherit' onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkBtn onClick={() => navigate(`profile/${user.id}`)}>
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
