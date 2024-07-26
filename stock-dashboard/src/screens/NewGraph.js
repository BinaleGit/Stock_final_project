import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, LineChart, Line } from 'recharts';
import { saveAs } from 'file-saver';
import Loader from '../components/Loader';

const NewGraph = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showDiff, setShowDiff] = useState(false);
  const [symbol, setSymbol] = useState('AAPL'); // Default symbol
  const [startDate, setStartDate] = useState(new Date()); // Default start date
  const [endDate, setEndDate] = useState(new Date()); // Default end date
  const [timeline, setTimeline] = useState('1y'); // Add state for timeline
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState('');

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/graph/${symbol}`, {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          timeline // Pass timeline to backend
        }
      });
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  }, [symbol, startDate, endDate, timeline]);

  useEffect(() => {
    fetchData();

    const interval = setInterval(fetchData, 60000); // Fetch every minute

    return () => clearInterval(interval);
  }, [fetchData]);

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/suggestions/${input}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      fetchSuggestions(e.target.value);
    } else {
      setSuggestions([]);
    }
  };

  const handleSymbolSelect = (symbol) => {
    setSymbol(symbol);
    setInputValue('');
    setSuggestions([]);
  };

  const handleTimelineChange = (period) => {
    setTimeline(period);
    const now = new Date();
    let newStartDate;

    switch (period) {
      case '1y':
        newStartDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case '6m':
        newStartDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case '10d':
        newStartDate = new Date(now.setDate(now.getDate() - 10));
        break;
      default:
        return;
    }

    setStartDate(newStartDate);
    setEndDate(new Date());
  };

  const formatDollar = (value) => `$${value.toFixed(2)}`;

  const CustomTooltip = ({ payload, label }) => {
    if (!payload || !payload.length) return null;

    const data = payload[0].payload;

    return (
      <div className="custom-tooltip">
        <p>{label}</p>
        <p style={{ color: 'red' }}>Low: {formatDollar(data.Low)}</p>
        <p style={{ color: 'green' }}>High: {formatDollar(data.High)}</p>
        <p style={{ color: 'orange' }}>Close: {formatDollar(data.Close)}</p>
        <p style={{ color: 'blue' }}>Open: {formatDollar(data.Open)}</p>
      </div>
    );
  };

  if (error) {
    return <div className="text-red-500">Error fetching data: {error}</div>;
  }

  const renderGraph = () => {
    if (!data) {
      return <div className="text-center">No data available</div>;
    }

    const chartData = data.Date.map((date, index) => ({
      Date: date,
      Open: showDiff ? data.OpenDiff[index] : data.Open[index],
      Close: showDiff ? data.CloseDiff[index] : data.Close[index],
      High: showDiff ? data.HighDiff[index] : data.High[index],
      Low: showDiff ? data.LowDiff[index] : data.Low[index],
      Volume: showDiff ? data.VolumeDiff[index] : data.Volume[index]
    }));

    return (
      <div className="animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-primary">New Stock Graph - {data.Date[data.Date.length - 1]}</h2>
        <div className="w-full h-96">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis dataKey="Date" />
              <YAxis tickFormatter={formatDollar} />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid stroke="#333" />
              <Line type="monotone" dataKey="Close" stroke="#ff7300" strokeWidth={2} />
              <Line type="monotone" dataKey="Open" stroke="#00ff00" strokeWidth={2} />
              <Line type="monotone" dataKey="High" stroke="#0000ff" strokeWidth={2} />
              <Line type="monotone" dataKey="Low" stroke="#ff0000" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  const generateBIReport = async () => {
    try {
      const response = await axios.post(`http://localhost:5000/api/graph/report/${symbol}`, {
        startDate: startDate.toISOString().split('T')[0],
        endDate: endDate.toISOString().split('T')[0]
      }, {
        responseType: 'blob'
      });

      const blob = new Blob([response.data], { type: 'application/vnd.ms-excel' });
      saveAs(blob, `${symbol}_BI_Report.xlsx`);
    } catch (error) {
      console.error('Failed to generate BI report:', error);
    }
  };

  return (
    <div className="p-4 bg-dark-card rounded-lg shadow-lg">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block mb-2">Select Stock Symbol:</label>
          <div className="relative w-full max-w-lg">
            <div className="flex">
              <input
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                placeholder="Type to search..."
                className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
              />
            </div>
            {inputValue && (
              <ul className="absolute z-10 w-full bg-dark-bg border border-gray-600 rounded-md mt-1">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.symbol}
                    onClick={() => handleSymbolSelect(suggestion.symbol)}
                    className="p-2 cursor-pointer hover:bg-gray-700"
                  >
                    {suggestion.symbol} - {suggestion.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div>
          <label className="block mb-2">Start Date:</label>
          <DatePicker
            selected={startDate}
            onChange={(date) => setStartDate(date)}
            className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
          />
        </div>
        <div>
          <label className="block mb-2">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
          />
        </div>
      </div>
      <div className="mb-4">
        <button
          onClick={() => handleTimelineChange('1y')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 transition duration-300"
        >
          1 Year
        </button>
        <button
          onClick={() => handleTimelineChange('6m')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md mr-2 hover:bg-blue-600 transition duration-300"
        >
          6 Months
        </button>
        <button
          onClick={() => handleTimelineChange('10d')}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
        >
          10 Days
        </button>
      </div>
      <div className="flex justify-between items-center mb-4">
        <button
          onClick={() => setShowDiff(!showDiff)}
          className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-300"
        >
          {showDiff ? 'Show Actual' : 'Show Difference'}
        </button>
        <button
          onClick={generateBIReport}
          className="bg-orange-500 text-white py-2 px-4 rounded-md hover:bg-orange-600 transition duration-300"
        >
          Generate BI Report
        </button>
      </div>
      {data ? renderGraph() : <Loader />}
    </div>
  );
};

export default NewGraph;
