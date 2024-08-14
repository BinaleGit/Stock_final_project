import React, { useState, useEffect } from 'react';
import GraphSelector from './GraphSelector'; // Adjust the path as needed
import StockTimeline from "../widgets/StockTimeline";
import SymbolOverview from "../widgets/SymbolOverview";
import UsdIlsQuote from "../widgets/UsdIlsQuote";

// StockGraph.js

export const calculateMarketStatus = () => {
  const now = new Date();
  
  // Convert to US Eastern Time
  const nowEST = new Date(now.toLocaleString('en-US', { timeZone: 'America/New_York' }));
  
  const day = nowEST.getDay(); // 0 = Sunday, 6 = Saturday
  const hour = nowEST.getHours(); // 24-hour format
  const minute = nowEST.getMinutes();

  // Market is closed on weekends
  if (day === 0 || day === 6) {
    return { message: "The market is currently closed. It will reopen on Monday.", isOpen: false };
  }
  
  // Market opens at 9:30 AM ET
  else if (hour < 9 || (hour === 9 && minute < 30)) {
    const reopenTime = new Date(nowEST);
    reopenTime.setHours(9, 30, 0, 0);
    const timeDiff = reopenTime - nowEST;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return { message: `The market is currently closed. It will reopen in ${hours} hours and ${minutes} minutes.`, isOpen: false };
  }
  
  // Market closes at 4:00 PM ET
  else if (hour >= 16) {
    const reopenTime = new Date(nowEST);
    reopenTime.setDate(nowEST.getDate() + (day === 5 ? 3 : 1)); // If it's Friday, reopen on Monday
    reopenTime.setHours(9, 30, 0, 0);
    const timeDiff = reopenTime - nowEST;
    const hours = Math.floor(timeDiff / (1000 * 60 * 60));
    const minutes = Math.floor((timeDiff % (1000 * 60 * 60)) / (1000 * 60));
    return { message: `The market is currently closed. It will reopen in ${hours} hours and ${minutes} minutes.`, isOpen: false };
  }
  
  // Market is currently open
  else {
    return { message: "The market is currently open.", isOpen: true };
  }
};


// Rest of your StockGraph component...



const StockGraph = () => {
  const [marketStatus, setMarketStatus] = useState({ message: '', isOpen: false });

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
        {marketStatus.message}
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
