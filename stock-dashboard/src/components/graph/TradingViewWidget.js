import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../shared/Loader';
import SearchInput from '../shared/SearchInput'; // Importing the SearchInput for consistent UI


function TradingViewWidget() {

  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [symbol, setSymbol] = useState('AAPL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // Similar to OldGraph for symbol suggestions

  const container = useRef(null);

  useEffect(() => {
    // Only append the script if it hasn't already been appended
    if (container.current && !container.current.hasChildNodes()) {
      const script = document.createElement("script");
      script.src = "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js";
      script.type = "text/javascript";
      script.async = true;
      script.innerHTML = JSON.stringify({
        "width": "980",
        "height": "610",
        "symbol": "NASDAQ:AAPL",
        "interval": "D",
        "timezone": "Etc/UTC",
        "theme": "dark",
        "gridColor": "rgba(30, 41, 59)",
        "backgroundColor": "rgba(51, 65, 85)",
        "style": "1",
        "locale": "en",
        "withdateranges": true,
        "hide_side_toolbar": false,
        "allow_symbol_change": true,
        "details": true,
        "hotlist": true,
        "calendar": false,
        "show_popup_button": true,
        "popup_width": "1000",
        "popup_height": "650",
        "hide_volume": true,
        "support_host": "https://www.tradingview.com"
      });
      container.current.appendChild(script);
    }

    
    // Cleanup function to remove the script on unmount
    return () => {
      if (container.current) {
        container.current.innerHTML = ''; // Clears the container, removing the script
      }
    };
  }, []); // Empty dependency array ensures this effect only runs once after the initial render

  const handleInputChange = async (e) => {
    const input = e.target.value.toUpperCase();
    setSymbol(input);
    if (input.length > 1) {
      // Placeholder for suggestion fetch logic
      setSuggestions([]); // Update based on actual fetch logic
    } else {
      setSuggestions([]);
    }
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }
  return (
    <div className="common-container container mx-auto max-w-7xl p-40">
      <div className="grid md:grid-cols-5 gap-20 mb-10">
   

      </div>
      <div className="tradingview-widget-container" ref={container} style={{ height: "400px", width: "100%" }}>
        {/* The widget's container height is set to 800px */}
        <div className="tradingview-widget-container__widget" style={{ height: "100%", width: "100%" }}></div>
        <div className="tradingview-widget-copyright">
          <a href="https://www.tradingview.com/" rel="noopener nofollow" target="_blank">
            <span className="blue-text">Track all markets on TradingView</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default memo(TradingViewWidget);
