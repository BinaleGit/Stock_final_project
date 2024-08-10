import React, { useState } from 'react';
import axios from 'axios';

const SearchBar = ({ setStockData }) => {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);

    const fetchSuggestions = async (input) => {
        try {
            const response = await axios.get(`http://localhost:5000/api/suggestions/${input}`);
            setSuggestions(response.data);
        } catch (error) {
            console.error('Error fetching suggestions:', error);
        }
    };

    const handleInputChange = (e) => {
        const input = e.target.value;
        setQuery(input);
        if (input.length > 1) {
            fetchSuggestions(input);
        } else {
            setSuggestions([]);
        }
    };

    const handleSearch = async (symbol) => {
        if (symbol) {
            try {
                const response = await axios.get(`http://localhost:5000/api/stock/${symbol}`);
                setStockData(response.data);
            } catch (error) {
                console.error('Error fetching stock data:', error);
                setStockData(null);
            }
        }
    };

    return (
        <div className="relative w-full max-w-lg">
            <div className="flex shadow-md">
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Search for stocks..."
                    className="flex-grow p-3 border border-r-0 border-gray-600 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary bg-dark-card text-white"
                />
                <button
                    onClick={() => handleSearch(query)}
                    className="p-3 bg-primary text-white rounded-r-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary transition-colors duration-300"
                >
                    Search
                </button>
            </div>
            {suggestions.length > 0 && (
                <ul className="absolute left-0 right-0 bg-dark-card border border-gray-600 mt-1 max-h-48 overflow-y-auto rounded-md shadow-lg z-10 text-white">
                    {suggestions.map((suggestion, index) => (
                        <li
                            key={`${suggestion.symbol}-${index}`}
                            onClick={() => handleSearch(suggestion.symbol)}
                            className="p-3 cursor-pointer hover:bg-gray-700 transition-colors duration-300"
                        >
                            <span className="font-semibold">{suggestion.symbol}</span> - {suggestion.name}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default SearchBar;
