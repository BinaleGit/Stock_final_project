import React, { useState } from 'react';
import Select from 'react-select';
import OldGraph from "../../screens/OldGraph";
import NewGraph from "../../screens/NewGraph";
import TradingViewWidget from "../../screens/TradingViewWidget";

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
    <div className="flex flex-col items-center">
      <Select 
        options={options} 
        value={selectedOption} 
        onChange={handleSelectChange} 
        className="mb-4 w-full md:w-1/2"
      />
      <div className="flex flex-col items-center">
        {selectedOption.value === 'first' && <OldGraph />}
        {selectedOption.value === 'second' && <NewGraph />}
        {selectedOption.value === 'both' && (
          <div className="flex justify-center gap-4 w-full">
            <div className="w-1/2">
              <OldGraph />
            </div>
            <div className="w-1/2">
              <NewGraph />
            </div>
          </div>
        )}
        {selectedOption.value === 'tradingview' && <TradingViewWidget />}
      </div>
    </div>
  );
};

export default GraphSelector;
