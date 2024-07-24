// C:\Users\Mor\Desktop\fina\Stocke_poke\stock-dashboard\src\components\StockInfo.js
import React from 'react';

const StockInfo = ({ data }) => {
    if (data.error) {
        return <p>{data.error}</p>;
    }
    return (
        <div>
            <h2>{data.name} ({data.symbol})</h2>
            <p>Date: {data.date}</p>
            <p>Open: {data.open}</p>
            <p>High: {data.high}</p>
            <p>Low: {data.low}</p>
            <p>Close: {data.close}</p>
            <p>Price: {data.price}</p>
            <p>Market Cap: {data.market_cap}</p>
            <p>Dividend Yield: {data.dividend_yield}</p>
            <p>52 Week High: {data.week_52_high}</p>
            <p>52 Week Low: {data.week_52_low}</p>
            <p>Volume: {data.volume}</p>
            <p>Average Volume: {data.average_volume}</p>
            <p>P/E Ratio: {data.pe_ratio}</p>
            <p>EPS: {data.eps}</p>
            <p>Sector: {data.sector}</p>
            <p>Industry: {data.industry}</p>
        </div>
    );
};

export default StockInfo;
