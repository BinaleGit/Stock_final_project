import React from 'react';

const StockTimeline = () => (
  <div style={{ position: 'relative', width: '100%', height: '550px' }}>
    <iframe 
      scrolling="no" 
      allowTransparency="true" 
      frameBorder="0" 
      src="https://www.tradingview-widget.com/embed-widget/timeline/?market=stock#%7B%22market%22%3A%22stock%22%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22regular%22%2C%22width%22%3A%2290%25%22%2C%22height%22%3A550%2C%22colorTheme%22%3A%22dark%22%2C%22utm_source%22%3A%22index-tracker.netlify.app%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22timeline%22%2C%22page-uri%22%3A%22index-tracker.netlify.app%2F%22%7D" 
      title="timeline TradingView widget" 
      lang="en" 
      style={{ userSelect: 'none', boxSizing: 'border-box', display: 'block', height: '100%', width: '100%' }}
    ></iframe>
    <div style={{
      position: 'absolute',
      top: '10px', // Adjust the positioning as necessary
      right: '10px', 
      width: '80px', // Adjust the width to cover the watermark
      height: '30px', // Adjust the height to cover the watermark
      zIndex: 2,
      textAlign: 'center',
      lineHeight: '30px',
      color: 'white',
      fontSize: '12px',
    }}>
    </div>
  </div>
);

export default StockTimeline;
