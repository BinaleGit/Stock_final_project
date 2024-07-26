import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, ComposedChart, Bar } from 'recharts';
import { saveAs } from 'file-saver';
import Loader from '../components/Loader';

const OldGraph = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showDiff, setShowDiff] = useState(false);
  const [symbol, setSymbol] = useState('AAPL');
  const [query, setQuery] = useState('AAPL');
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeline, setTimeline] = useState('1y'); // Add state for timeline

  const fetchSuggestions = async (input) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/suggestions/${input}`);
      setSuggestions(response.data);
    } catch (error) {
      console.error('Error fetching suggestions:', error);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input.length > 1) {
      fetchSuggestions(input);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setSymbol(suggestion.symbol);
    setQuery(suggestion.symbol);
    setSuggestions([]);
  };

  const fetchData = useCallback(async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/graph/${symbol}`, {
        params: {
          startDate: startDate.toISOString().split('T')[0],
          endDate: endDate.toISOString().split('T')[0],
          timeline // Pass timeline to backend
        }
      });
      console.log('Data fetched:', response.data); // Check data here
      setData(response.data);
    } catch (error) {
      setError(error.message);
      console.error('Error fetching data:', error);
    }
  }, [symbol, startDate, endDate, timeline]); // Include timeline in dependencies

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 60000);
    return () => clearInterval(interval);
  }, [fetchData]);

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

  const CustomBar = ({ x, y, width, height, fill, stroke, payload }) => {
    // Calculate Y positions based on the height of the bar and the data values
    const openY = y + height - (height * ((payload.Open - payload.Low) / (payload.High - payload.Low)));
    const closeY = y + height - (height * ((payload.Close - payload.Low) / (payload.High - payload.Low)));
    const highY = y + height - (height * ((payload.High - payload.Low) / (payload.High - payload.Low)));
    const lowY = y + height - (height * ((payload.Low - payload.Low) / (payload.High - payload.Low)));
  
    return (
      <g>
      <rect x={x} y={y} width={width} height={height} fill={fill} stroke={stroke} />
      {/* High and Low lines */}
      <line x1={x} x2={x + width} y1={highY} y2={highY} stroke="green" strokeWidth={2} />
      <line x1={x} x2={x + width} y1={lowY} y2={lowY} stroke="red" strokeWidth={2} />
      {/* Vertical line for High to Low range */}
      <line x1={x + width / 2} x2={x + width / 2} y1={lowY} y2={highY} stroke="#000" strokeWidth={1.5} />
      {/* Open and Close lines */}
      <line x1={x} x2={x + width} y1={openY} y2={openY} stroke="blue" strokeWidth={2} />
      <line x1={x} x2={x + width} y1={closeY} y2={closeY} stroke="orange" strokeWidth={2} />
    </g>
  );
};
  
  

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
        <h2 className="text-2xl font-bold mb-4 text-primary">Stock Graph - {data.Date[data.Date.length - 1]}</h2>
        <div className="w-full h-96">
          <ResponsiveContainer>
            <ComposedChart data={chartData}>
              <XAxis dataKey="Date" />
              <YAxis tickFormatter={formatDollar} />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid stroke="#333" />
              <Bar
                dataKey="Volume"
                shape={<CustomBar />}
                fill="#8884d8"
                stroke="#8884d8"
              />
            </ComposedChart>
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
                value={query}
                onChange={handleInputChange}
                className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
                placeholder="Type stock symbol..."
              />
            </div>
            {suggestions.length > 0 && (
              <ul className="absolute z-10 w-full bg-dark-bg border border-gray-600 rounded-md mt-1">
                {suggestions.map((suggestion) => (
                  <li
                    key={suggestion.symbol}
                    className="p-2 cursor-pointer hover:bg-gray-700"
                    onClick={() => handleSuggestionClick(suggestion)}
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
          className="btn btn-primary mr-2"
        >
          1 Year
        </button>
        <button
          onClick={() => handleTimelineChange('6m')}
          className="btn btn-primary mr-2"
        >
          6 Months
        </button>
        <button
          onClick={() => handleTimelineChange('10d')}
          className="btn btn-primary mr-2"
        >
          10 Days
        </button>
      </div>
      <button
        onClick={generateBIReport}
        className="btn btn-primary"
      >
        Generate BI Report
      </button>
      <div className="mt-4">{renderGraph()}</div>
      {data === null && <Loader />}
    </div>
  );
};

export default OldGraph;
