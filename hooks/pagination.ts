import { useState } from 'react';

export const usePagination = (data:any, rowsPerPage:any) => {
  const [page, setPage] = useState(0);

  const handleNextClick = () => {
    const maxPage = Math.ceil(data.length / rowsPerPage) - 1;
    setPage((prevPage) => (prevPage < maxPage ? prevPage + 1 : prevPage));
  };

  const handlePrevClick = () => {
    setPage((prevPage) => (prevPage > 0 ? prevPage - 1 : prevPage));
  };

  const paginatedData = data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  return { page, paginatedData, handleNextClick, handlePrevClick };
};
