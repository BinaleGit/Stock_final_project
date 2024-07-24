import React from 'react';

const UsdIlsQuote = () => (
  <iframe 
    scrolling="no" 
    allowTransparency="true" 
    frameBorder="0" 
    src="https://www.tradingview-widget.com/embed-widget/single-quote/?locale=en#%7B%22symbol%22%3A%22FX_IDC%3AUSDILS%22%2C%22isTransparent%22%3Afalse%2C%22width%22%3A%22100%25%22%2C%22colorTheme%22%3A%22dark%22%2C%22height%22%3A126%2C%22utm_source%22%3A%22index-tracker.netlify.app%22%2C%22utm_medium%22%3A%22widget%22%2C%22utm_campaign%22%3A%22single-quote%22%2C%22page-uri%22%3A%22index-tracker.netlify.app%2F%22%7D" 
    title="single quote TradingView widget" 
    lang="en" 
    style={{ userSelect: 'none', boxSizing: 'border-box', display: 'block', height: '100%', width: '100%' }}
  ></iframe>
);

export default UsdIlsQuote;
