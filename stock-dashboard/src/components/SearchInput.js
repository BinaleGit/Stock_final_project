// SearchInput.jsx
import React from 'react';

const SearchInput = ({ value, onChange, suggestions, onSelect }) => (
  <div className="relative w-full max-w-lg">
    <div className="flex">
      <input
        type="text"
        value={value}
        onChange={onChange}
        className="common-input"
        placeholder="Type to search..."
      />
    </div>
    {value && (
      <ul className="">
        {suggestions.map((suggestion) => (
          <li
            key={suggestion.symbol}
            onClick={() => onSelect(suggestion.symbol)}
            className="p-2 cursor-pointer hover:bg-gray-700"
          >
            {suggestion.symbol} - {suggestion.name}
          </li>
        ))}
      </ul>
    )}
  </div>
);

export default SearchInput;
