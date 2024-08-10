import React, { useState } from 'react';
import Select from 'react-select';
import OldGraph from "./OldGraph";
import NewGraph from "./NewGraph";
import TradingViewWidget from "./TradingViewWidget";

const options = [
  { value: 'first', label: 'Show the first graph' },
  { value: 'second', label: 'Show the second graph' },
  { value: 'both', label: 'Show both graphs' },
  { value: 'tradingview', label: 'Show TradingView Widget' }
];

const GraphSelector = () => {
  const [selectedOption, setSelectedOption] = useState(options[0]);

  const handleSelectChange = (option) => {
    setSelectedOption(option);
  };

  return (
    <div className="flex flex-col items-center py-6">
      <Select 
        options={options} 
        value={selectedOption} 
        onChange={handleSelectChange} 
        className="mb-4 w-full md:w-1/2"
        styles={{
          control: (base) => ({
            ...base,
            backgroundColor: '#2c3e50',
            borderColor: '#34495e',
            color: '#ecf0f1',
            fontSize: '16px',
            padding: '5px'
          }),
          menu: (base) => ({
            ...base,
            backgroundColor: '#2c3e50',
            color: '#ecf0f1'
          }),
          option: (provided, state) => ({
            ...provided,
            backgroundColor: state.isSelected ? '#34495e' : '#2c3e50',
            color: '#ecf0f1',
            padding: '10px'
          }),
          singleValue: (provided) => ({
            ...provided,
            color: '#ecf0f1',
          }),
        }}
      />
      <div className="flex flex-col items-center w-full">
        {selectedOption.value === 'first' && (
          <div>
            <OldGraph />
          </div>
        )}
        {selectedOption.value === 'second' && (
          <div>
            <NewGraph />
          </div>
        )}
        {selectedOption.value === 'both' && (
          <div className="flex flex-col md:flex-row justify-center gap-4 w-full">
            <div className="w-full md:w-1/2 bg-dark-card p-4 rounded-lg shadow-md">
              <OldGraph />
            </div>
            <div className="w-full md:w-1/2 bg-dark-card p-4 rounded-lg shadow-md">
              <NewGraph />
            </div>
          </div>
        )}
        {selectedOption.value === 'tradingview' && (
          <div className="w-full md:w-3/4 lg:w-2/3 bg-dark-card p-4 rounded-lg shadow-md">
            <TradingViewWidget />
          </div>
        )}
      </div>
    </div>
  );
};

export default GraphSelector;
