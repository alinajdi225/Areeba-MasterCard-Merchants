import React from 'react';

const Categorybox = ({ selectedCategory, handleCategoryClick, logo, text }) => {
  return (
    <div
      className={`category-box ${selectedCategory === text ? 'selected' : ''}`}
      onClick={() => handleCategoryClick(text)}
    >
      <svg
        className={`category-logo ${
          selectedCategory === text ? 'selected' : ''
        }`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 44 40"
        fill={selectedCategory === text ? '#ff4238' : '#9a9a9a'}
      >
        
        {logo}
      </svg>
      <p
        className={`category-text ${
          selectedCategory === text ? 'selected' : ''
        }`}
      >
        {text}
      </p>
    </div>
  );
};

export default Categorybox;
