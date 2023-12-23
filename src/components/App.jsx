import React from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';

import { CssBaseline } from '@mui/material';

import { Movies, MovieDetails, Actors, NavBar, Profile } from '.';
import { Content, Main, StyledToolbar } from './styles';

function App() {
  return (
    <BrowserRouter>
      <Main>
        <CssBaseline />
        <NavBar />
        <Content>
          <StyledToolbar />
          <Routes>
            <Route index element={<Navigate to='/movies' replace />} />
            <Route path='/movies' element={<Movies />} />
            <Route path='/approved' element={<Movies />} />
            <Route path='/movies/:movieId' element={<MovieDetails />} />
            <Route path='/actors/:actorId' element={<Actors />} />
            <Route path='/profile/:id' element={<Profile />} />
          </Routes>
        </Content>
      </Main>
    </BrowserRouter>
  );
}

export default App;
