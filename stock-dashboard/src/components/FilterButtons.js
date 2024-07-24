// src/components/FilterButtons.js
import React from 'react';

function FilterButtons({ onFilter }) {
  const handleFilter = (parameter) => {
    onFilter(parameter);
  };

  return (
    <div>
      <button onClick={() => handleFilter('sector')}>Filter by Sector</button>
      <button onClick={() => handleFilter('industry')}>Filter by Industry</button>
      <button onClick={() => handleFilter('market_cap')}>Filter by Market Cap</button>
    </div>
  );
}

export default FilterButtons;
