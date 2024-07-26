import React, { useState } from 'react';
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

const StockGraph = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleDropdownChange = (option) => {
    setSelectedOption(option);
  };

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
