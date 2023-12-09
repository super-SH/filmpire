import React from 'react';
import { CssBaseline } from '@mui/material';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { Movies, MovieDetails, Actors, NavBar, Profile } from './';

function App() {
  return (
    <BrowserRouter>
      <CssBaseline />
      <main>
        <Routes>
          <Route index element={<Navigate to='/movies' replace />} />
          <Route path='/movies' element={<Movies />} />
          <Route path='/movie/movieId' element={<MovieDetails />} />
          <Route path='/actors/:actorId' element={<Actors />} />
          <Route path='/profile/:id' element={<Profile />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
