import React, { useState } from 'react';
import { SearchContainer, StyledTextField } from './styles';
import { InputAdornment } from '@mui/material';
import { Search as SearchIcon } from '@mui/icons-material';
import { searchMovie } from '../../features/categorySlice';
import { useDispatch } from 'react-redux';

function Search() {
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();

  function handleKeyPress(e) {
    if (e.key === 'Enter') {
      dispatch(searchMovie(query));
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
