import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';
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
          endDate: endDate.toISOString().split('T')[0]
        }
      });
      setData(response.data);
    } catch (error) {
      setError(error.message);
    }
  }, [symbol, startDate, endDate]);

  useEffect(() => {
    const fetchDataAndUpdate = async () => {
      await fetchData();
    };

    fetchDataAndUpdate();
    const interval = setInterval(fetchDataAndUpdate, 60000);

    return () => clearInterval(interval);
  }, [fetchData]);

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

    const formatDollar = (value) => `$${value.toFixed(2)}`;

    const latestDate = data.Date[data.Date.length - 1];

    return (
      <div className="animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-primary">Old Stock Graph - {latestDate}</h2>
        <div className="w-full h-96">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis dataKey="Date" />
              <YAxis tickFormatter={formatDollar} />
              <Tooltip formatter={(value) => formatDollar(value)} />
              <CartesianGrid stroke="#333" />
              <Line type="monotone" dataKey="Close" stroke="#ff7300" />
              <Line type="monotone" dataKey="Open" stroke="#00ff00" />
              <Line type="monotone" dataKey="High" stroke="#0000ff" />
              <Line type="monotone" dataKey="Low" stroke="#ff0000" />
              <Line type="monotone" dataKey="Volume" stroke="#000000" />
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
          <label className="block mb-2 mt-4">End Date:</label>
          <DatePicker
            selected={endDate}
            onChange={(date) => setEndDate(date)}
            className="block w-full border border-gray-600 rounded-md p-2 bg-dark-bg text-dark-text"
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row items-center mb-4">
        <button
          onClick={() => setShowDiff(!showDiff)}
          className="button-blue mb-4 md:mb-0 md:mr-2 w-full md:w-auto"
        >
          {showDiff ? 'Show Actual Values' : 'Show Day Differences'}
        </button>
        <button
          onClick={generateBIReport}
          className="button-green mb-4 md:mb-0 md:ml-2 w-full md:w-auto"
        >
          Generate BI Report
        </button>
      </div>
      <div className="resizable-container mb-4">
        {renderGraph()}
      </div>
    </div>
  );
};

export default OldGraph;
