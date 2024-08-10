import React, { useState, useEffect } from 'react';
import GraphSelector from './GraphSelector'; // Adjust the path as needed
import StockTimeline from "../widgets/StockTimeline";
import SymbolOverview from "../widgets/SymbolOverview";
import UsdIlsQuote from "../widgets/UsdIlsQuote";

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
  const [marketStatus, setMarketStatus] = useState('');

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
        {marketStatus}
      </div>
      <GraphSelector />
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
