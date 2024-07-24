import React, { useEffect, useRef, useState, memo } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import Loader from '../components/Loader';

const TradingViewGraph = () => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [symbol, setSymbol] = useState('AAPL');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const container = useRef(null);

  useEffect(() => {
    const loadTradingViewScript = () => {
      if (container.current) {
        container.current.innerHTML = ''; // Clear previous content
        const script = document.createElement('script');
        script.src = 'https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js';
        script.type = 'text/javascript';
        script.async = true;
        script.innerHTML = JSON.stringify({
          autosize: true,
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
    };

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
  }, [symbol]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <div className="text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-4 bg-dark-card rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">Select Stock Symbol:</label>
          <input
            type="text"
            value={symbol}
            onChange={(e) => setSymbol(e.target.value.toUpperCase())}
            className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
            placeholder="Type stock symbol..."
          />
        </div>
        <div>
          <label className="block mb-2">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
          />
          <label className="block mb-2 mt-4">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
          />
        </div>
      </div>
      <div className="tradingview-widget-container" ref={container} style={{ height: "500px", width: "100%" }}>
        <div className="tradingview-widget-container__widget" style={{ height: "calc(100% - 32px)", width: "100%" }}></div>
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
