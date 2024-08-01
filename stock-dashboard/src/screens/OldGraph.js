import React, { useEffect, useState, useCallback } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import {
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ComposedChart,
  Bar,
} from "recharts";
import axios from 'axios';
import Loader from "../components/Loader";
import SearchInput from "../components/SearchInput";
import { fetchData, fetchSuggestions, generateBIReport } from "../APIS/utils";

const OldGraph = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [showDiff, setShowDiff] = useState(false);
  const [symbol, setSymbol] = useState("AAPL");
  const [query, setQuery] = useState("AAPL");
  const [suggestions, setSuggestions] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [timeline, setTimeline] = useState("1y");
  const [currentPrice, setCurrentPrice] = useState(null);
  const [priceChangeColor, setPriceChangeColor] = useState('');

  const fetchGraphData = useCallback(async () => {
    if (!symbol) {
      console.log("Symbol is undefined");
      return;
    }
    console.log(`Fetching data for symbol: ${symbol}`);
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
      console.log(`Symbol changed to: ${symbol}`);
      fetchGraphData();
      fetchCurrentPrice(symbol);
      const priceInterval = setInterval(() => fetchCurrentPrice(symbol), 3000);
      return () => clearInterval(priceInterval);
    }
  }, [symbol, fetchGraphData, fetchCurrentPrice]);

  const handleInputChange = async (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input.length > 1) {
      const fetchedSuggestions = await fetchSuggestions(input);
      console.log("Fetched suggestions:", fetchedSuggestions);
      setSuggestions(fetchedSuggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("Suggestion clicked:", suggestion);
    if (typeof suggestion === 'string') {
      setSymbol(suggestion);
    } else if (suggestion && suggestion.symbol) {
      setSymbol(suggestion.symbol);
    } else {
      console.error("Invalid suggestion structure:", suggestion);
      return;
    }
    setQuery(suggestion.symbol || suggestion);
    setSuggestions([]);
    fetchGraphData();
    fetchCurrentPrice(suggestion.symbol || suggestion);
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

  const CustomBar = ({ x, y, width, height, fill, stroke, payload }) => {
    const openY =
      y +
      height -
      height * ((payload.Open - payload.Low) / (payload.High - payload.Low));
    const closeY =
      y +
      height -
      height * ((payload.Close - payload.Low) / (payload.High - payload.Low));
    const highY =
      y +
      height -
      height * ((payload.High - payload.Low) / (payload.High - payload.Low));
    const lowY =
      y +
      height -
      height * ((payload.Low - payload.Low) / (payload.High - payload.Low));

    return (
      <g>
        <rect
          x={x}
          y={y}
          width={width}
          height={height}
          fill={fill}
          stroke={stroke}
        />
        <line
          x1={x}
          x2={x + width}
          y1={highY}
          y2={highY}
          stroke="green"
          strokeWidth={2}
        />
        <line
          x1={x}
          x2={x + width}
          y1={lowY}
          y2={lowY}
          stroke="red"
          strokeWidth={2}
        />
        <line
          x1={x + width / 2}
          x2={x + width / 2}
          y1={lowY}
          y2={highY}
          stroke="#000"
          strokeWidth={1.5}
        />
        <line
          x1={x}
          x2={x + width}
          y1={openY}
          y2={openY}
          stroke="blue"
          strokeWidth={2}
        />
        <line
          x1={x}
          x2={x + width}
          y1={closeY}
          y2={closeY}
          stroke="orange"
          strokeWidth={2}
        />
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
      Volume: showDiff ? data.VolumeDiff[index] : data.Volume[index],
    }));

    return (
      <div className="animate-fadeIn">
        <h2 className="text-2xl font-bold mb-4 text-primary">
          Stock Graph - {data.Date[data.Date.length - 1]}
        </h2>
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

  return (
    <div className="common-container">
      <div className="grid md:grid-cols-2 gap-4 mb-5 ">
        <div>
          <label className="block mb-2">Select Stock Symbol:</label>
          <SearchInput
            value={query}
            onChange={handleInputChange}
            suggestions={suggestions}
            onSelect={handleSuggestionClick}
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

export default OldGraph;
