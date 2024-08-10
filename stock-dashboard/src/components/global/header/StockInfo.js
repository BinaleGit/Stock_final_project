import React from 'react';

const formatNumber = (num, showFullNumbers) => showFullNumbers ? num : Math.floor(num);

const StockInfo = ({ data, showFullNumbers }) => {
    if (data.error) {
        return <p>{data.error}</p>;
    }
    return (
        <div>
            <h2>{data.name} ({data.symbol})</h2>
            <p>Date: {data.date}</p>
            <p>Open: {formatNumber(data.open, showFullNumbers)}</p>
            <p>High: {formatNumber(data.high, showFullNumbers)}</p>
            <p>Low: {formatNumber(data.low, showFullNumbers)}</p>
            <p>Close: {formatNumber(data.close, showFullNumbers)}</p>
            <p>Price: {formatNumber(data.price, showFullNumbers)}</p>
            <p>Market Cap: {formatNumber(data.market_cap, showFullNumbers)}</p>
            <p>Dividend Yield: {data.dividend_yield.toFixed(3)}</p>
            <p>Volume: {formatNumber(data.volume, showFullNumbers)}</p>
            <p>Average Volume: {formatNumber(data.average_volume, showFullNumbers)}</p>
            <p>P/E Ratio: {formatNumber(data.pe_ratio, showFullNumbers)}</p>
            <p>EPS: {formatNumber(data.eps, showFullNumbers)}</p>
            <p>Sector: {data.sector}</p>
            <p>Industry: {data.industry}</p>
        </div>
    );
};

export default StockInfo;
