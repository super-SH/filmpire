import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';

import { searchMovie } from '../../features/categorySlice';
import { SearchContainer, StyledTextField } from './styles';

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
      navigate('/');
      setQuery('');
    }
  }

  return (
    <SearchContainer>
      <StyledTextField
        onKeyPress={handleKeyPress}
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        variant='standard'
        InputProps={{
          startAdornment: (
            <InputAdornment position='start'>
              <SearchIcon />
            </InputAdornment>
          ),
        }}
      />
    </SearchContainer>
  );
}

export default Search;
