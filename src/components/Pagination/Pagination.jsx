import React from 'react';

import { Btn, Container, PageNum } from './styles';

function Pagination({ currentPage, setPage, totalPages }) {
  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage((prevPage) => prevPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  if (totalPages === 0) return null;

  return (
    <Container>
      <Btn
        onClick={handlePrev}
        variant='contained'
        color='primary'
        type='button'
      >
        Prev
      </Btn>
      <PageNum variant='h4'>{currentPage}</PageNum>
      <Btn
        onClick={handleNext}
        variant='contained'
        color='primary'
        type='button'
      >
        Next
      </Btn>
    </Container>
  );
}

export default Pagination;
