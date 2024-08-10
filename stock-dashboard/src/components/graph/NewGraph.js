import React, { useState, useEffect, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
} from "recharts";
import axios from 'axios';
import Loader from "../shared/Loader";
import SearchInput from "../shared/SearchInput";
import { fetchData, fetchSuggestions, generateBIReport } from "../../APIS/utils";

const NewGraph = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showDiff, setShowDiff] = useState(false);
  const [symbol, setSymbol] = useState("AAPL");
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeline, setTimeline] = useState("1y");
  const [suggestions, setSuggestions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceChangeColor, setPriceChangeColor] = useState('');

  const fetchGraphData = useCallback(async () => {
    try {
      const data = await fetchData(symbol, startDate, endDate, timeline);
      setData(data);
    } catch (error) {
      setError(error.message);
    }
  }, [symbol, startDate, endDate, timeline]);

  const fetchCurrentPrice = useCallback(async (symbol) => {
    try {
      const response = await axios.post('http://localhost:5000/api/current_price', { symbol });
      const data = response.data;

      if (data && data.current_price) {
        const newPrice = data.current_price;

        setCurrentPrice(prevCurrentPrice => {
          if (prevCurrentPrice !== null) {
            if (newPrice > prevCurrentPrice) {
              setPriceChangeColor('#7fff54');
              setTimeout(() => {
                setPriceChangeColor('');
              }, 1000);
            } else if (newPrice < prevCurrentPrice) {
              setPriceChangeColor('#ff5754');
              setTimeout(() => {
                setPriceChangeColor('');
              }, 1000);
            }
          }

          console.log(`Current price: ${newPrice} | Previous price: ${prevCurrentPrice}`);
          return newPrice;
        });
      } else {
        console.error('Error fetching current price: Unexpected data format');
      }
    } catch (error) {
      console.error('Error fetching current price:', error);
    }
  }, []);

  useEffect(() => {
    fetchGraphData();
    const interval = setInterval(fetchGraphData, 60000);
    return () => clearInterval(interval);
  }, [fetchGraphData]);

  useEffect(() => {
    if (symbol) {
      fetchGraphData();
      fetchCurrentPrice(symbol);
      const priceInterval = setInterval(() => fetchCurrentPrice(symbol), 3000);
      return () => {
        clearInterval(priceInterval);
      };
    }
  }, [symbol, fetchGraphData, fetchCurrentPrice]);

  const handleInputChange = (e) => {
    setInputValue(e.target.value);
    if (e.target.value) {
      fetchSuggestions(e.target.value).then(setSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSymbolSelect = (symbol) => {
    setSymbol(symbol);
    setInputValue("");
    setSuggestions([]);
  };

  const handleTimelineChange = (period) => {
    setTimeline(period);
    const now = new Date();
    let newStartDate;
    switch (period) {
      case "1y":
        newStartDate = new Date(now.setFullYear(now.getFullYear() - 1));
        break;
      case "6m":
        newStartDate = new Date(now.setMonth(now.getMonth() - 6));
        break;
      case "10d":
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
        <p style={{ color: "red" }}>Low: {formatDollar(data.Low)}</p>
        <p style={{ color: "green" }}>High: {formatDollar(data.High)}</p>
        <p style={{ color: "orange" }}>Close: {formatDollar(data.Close)}</p>
        <p style={{ color: "blue" }}>Open: {formatDollar(data.Open)}</p>
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
      Volume: showDiff ? data.VolumeDiff[index] : data.Volume[index],
    }));

    return (
      <div className="animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          New Stock Graph - {data.Date[data.Date.length - 1]}
        </h2>
        <div className="w-full h-96">
          <ResponsiveContainer>
            <LineChart data={chartData}>
              <XAxis dataKey="Date" />
              <YAxis tickFormatter={formatDollar} />
              <Tooltip content={<CustomTooltip />} />
              <CartesianGrid stroke="#333" />
              <Line
                type="monotone"
                dataKey="Close"
                stroke="#ff7300"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Open"
                stroke="#00ff00"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="High"
                stroke="#0000ff"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="Low"
                stroke="#ff0000"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    );
  };

  return (
    <div className="common-container">
      <div className="grid md:grid-cols-2 gap-4 mb-5 ">
        <div>
          <label className="block mb-2">Select Stock Symbol:</label>
          <SearchInput
            value={inputValue}
            onChange={handleInputChange}
            suggestions={suggestions}
            onSelect={handleSymbolSelect}
          />
          <div className="current-price-container mt-2" style={{ backgroundColor: priceChangeColor }}>
            <h2 className="text-xl">Current Price: {currentPrice !== null ? `$${currentPrice}` : 'Loading...'}</h2>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex items-center ">
            <label className="block w-20">Start Date:</label>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              className="common-input"
            />
          </div>

          <div className="flex items-center">
            <label className="block w-20">End Date:</label>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              className="common-input"
            />
          </div>
        </div>
        <div className="mb-2">
          <button
            onClick={() => handleTimelineChange("1y")}
            className="common-button"
          >
            1 Year
          </button>
          <button
            onClick={() => handleTimelineChange("6m")}
            className="common-button"
          >
            6 Months
          </button>
          <button
            onClick={() => handleTimelineChange("10d")}
            className="common-button"
          >
            10 Days
          </button>
          <button
            onClick={() => setShowDiff(!showDiff)}
            className="difference-button"
          >
            {showDiff ? "Show Actual" : "Show Difference"}
          </button>
          <button
            onClick={() => generateBIReport(symbol, startDate, endDate)}
            className="report-button"
          >
            Generate BI Report
          </button>
        </div>
      </div>

      <div className="mt-4">{renderGraph()}</div>
      {data === null && <Loader />}
    </div>
  );
};

export default NewGraph;
