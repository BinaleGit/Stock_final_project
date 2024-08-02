import React, { useEffect, useRef, useState, useCallback, memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../components/Loader';
import SearchInput from '../components/SearchInput'; // Importing the SearchInput for consistent UI

const TradingViewGraph = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [symbol, setSymbol] = useState('AAPL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [suggestions, setSuggestions] = useState([]); // Similar to OldGraph for symbol suggestions

  const container = useRef(null);

  const loadTradingViewScript = useCallback(() => {
    if (container.current) {
      container.current.innerHTML = ''; // Clear previous content
      const script = document.createElement('script');
      script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
      script.type = 'text/javascript';
      script.async = true;
      script.innerHTML = JSON.stringify({
        autosize: false, // Set to false to control the size manually
        width: "100%", // Width of the widget
        height: "800px", // Increase the height to make the widget larger
        symbol: `NASDAQ:${symbol}`,
        interval: 'D',
        timezone: 'Etc/UTC',
        theme: 'dark',
        style: '1',
        locale: 'en',
        gridColor: 'rgba(255, 255, 255, 0.06)',
        withdateranges: true,
        hide_side_toolbar: false,
        allow_symbol_change: true,
        calendar: false,
        support_host: 'https://www.tradingview.com'
      });
      container.current.appendChild(script);
    }
  }, [symbol]);

  useEffect(() => {
    setLoading(true);
    try {
      loadTradingViewScript();
    } catch (err) {
      setError('Error loading TradingView widget');
    } finally {
      setLoading(false);
    }

    return () => {
      if (container.current) {
        container.current.innerHTML = ''; // Cleanup on unmount
      }
    };
  }, [symbol, loadTradingViewScript]);

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
        <div>
          <label className="block mb-2">Select Stock Symbol:</label>
          <SearchInput
            value={symbol}
            onChange={handleInputChange}
            suggestions={suggestions}
            onSelect={setSymbol} // Assuming onSelect sets the symbol in SearchInput component
          />
        </div>
        <div className="flex items-center space-x-4">
          <div className="flex flex-col">
            <label className="mb-2">Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="common-input"
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2">End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="common-input"
            />
          </div>
        </div>

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

export default memo(TradingViewGraph);
