import React from 'react';
import searchIcon from '../Images/searchIcon.svg';

const Searchbox = ({ searchQuery, handleSearchQueryChange }) => {
  return (
    <div className="search-box">
      <img src={searchIcon} className="search-icon" alt="searchIcon" />
      <input
        className="search"
        type="text"
        placeholder="Search by merchant name..."
        value={searchQuery}
        onChange={handleSearchQueryChange}
      />
    </div>
  );
};

export default Searchbox;
