import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import OldGraph from "../../screens/OldGraph";
import NewGraph from "../../screens/NewGraph";
import StockTimeline from "../../screens/StockTimeline";
import SymbolOverview from "../../screens/SymbolOverview";
import UsdIlsQuote from "../../screens/UsdIlsQuote";
import TradingViewWidget from "../../screens/TradingViewWidget";

const options = [
  { value: 'first', label: 'Show the first graph' },
  { value: 'second', label: 'Show the second graph' },
  { value: 'both', label: 'Show both graphs' },
  { value: 'tradingview', label: 'Show TradingView Widget' }
];

const customStyles = {
  control: (provided) => ({
    ...provided,
    borderColor: '#d1d5db',
    boxShadow: 'none',
    '&:hover': {
      borderColor: '#6366f1',
    },
    '&:focus': {
      borderColor: '#6366f1',
      boxShadow: '0 0 0 2px rgba(99, 102, 241, 0.5)',
    },
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'black',
    backgroundColor: state.isFocused ? '#e0e7ff' : 'white',
  }),
  singleValue: (provided) => ({
    ...provided,
    color: 'black',
  }),
};

const calculateMarketStatus = () => {
  const now = new Date();
  const day = now.getDay();
  const hour = now.getHours();
  const minute = now.getMinutes();

  if (day === 0 || day === 6) {
    return "The market is currently closed. It will reopen on Monday.";
  } else if (hour < 9 || (hour === 9 && minute < 30)) {
    const reopenTime = new Date(now);
    reopenTime.setHours(9, 30, 0, 0);
    const timeDiff = reopenTime - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `The market is currently closed. It will reopen in ${hours} hours and ${minutes} minutes.`;
  } else if (hour >= 16) {
    const reopenTime = new Date(now);
    reopenTime.setDate(now.getDate() + (day === 5 ? 3 : 1));
    reopenTime.setHours(9, 30, 0, 0);
    const timeDiff = reopenTime - now;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return `The market is currently closed. It will reopen in ${hours} hours and ${minutes} minutes.`;
  } else {
    return "The market is currently open.";
  }
};

const StockGraph = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);
  const [marketStatus, setMarketStatus] = useState('');

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };

  useEffect(() => {
    setMarketStatus(calculateMarketStatus());
    const interval = setInterval(() => {
      setMarketStatus(calculateMarketStatus());
    }, 60000); // Update market status every minute
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <div className="flex justify-center my-4">
        <Select
          value={selectedOption}
          onChange={handleDropdownChange}
          options={options}
          styles={customStyles}
          className="block w-48"
        />
      </div>
      <div className="text-center text-xl font-semibold my-2">
        {marketStatus}
      </div>
      <div className="flex flex-col items-center opacity-100">
        {selectedOption.value === 'first' && (
          <div className="old-graph">
            <OldGraph />
          </div>
        )}
        {selectedOption.value === 'second' && (
          <div className="new-graph">
            <NewGraph />
          </div>
        )}
        {selectedOption.value === 'both' && (
          <div className="both-graphs">
            <div className="old-graph">
              <OldGraph />
            </div>
            <div className="new-graph">
              <NewGraph />
            </div>
          </div>
        )}
        {selectedOption.value === 'tradingview' && (
          <div className="tradingview-graph">
            <TradingViewWidget />
          </div>
        )}
      </div>
      <div className="flex flex-col items-center gap-4 p-4 dark:bg-dark-card dark:text-dark-text">
        <div className="w-full md:w-2/2 p-4 bg-dark-card rounded-lg shadow-md">
          <StockTimeline />
        </div>
        <div className="w-full flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/2 p-4 bg-dark-card rounded-lg shadow-md">
            <SymbolOverview />
          </div>
          <div className="w-full md:w-1/2 p-4 bg-dark-card rounded-lg shadow-md">
            <UsdIlsQuote />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockGraph;
