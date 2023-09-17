import React from 'react';
import './padination.css'
function Pagination({ currentPage, totalPages, onPageChange }) {
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <ul className="pagination">
      {currentPage > 1 && ( // Render "Previous" button if not on the first page
        <li
          className="page-item"
          onClick={() => onPageChange(currentPage - 1)}
        >
          <button className="page-link">Previous</button>
        </li>
      )}

      {pageNumbers.map((page) => (
        <li
          key={page}
          className={`page-item ${currentPage === page ? 'active' : ''}`}
          onClick={() => onPageChange(page)}
        >
          <button className="page-link">{page}</button>
        </li>
      ))}

      {currentPage < totalPages && ( // Render "Next" button if not on the last page
        <li
          className="page-item"
          onClick={() => onPageChange(currentPage + 1)}
        >
          <button className="page-link">Next</button>
        </li>
      )}
    </ul>
  );
}

export default Pagination;
