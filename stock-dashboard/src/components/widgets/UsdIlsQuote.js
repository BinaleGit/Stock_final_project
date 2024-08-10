import React from 'react';

const UsdIlsQuote = () => {
  // Widget configuration moved inside the component
  const widgetConfig = {
    symbol: "FX_IDC:USDILS",
    isTransparent: true, // Set background to transparent
    width: "100%",
    colorTheme: "dark",
    height: 126,
    utm_source: "index-tracker.netlify.app",
    utm_medium: "widget",
    utm_campaign: "single-quote",
    page_uri: "index-tracker.netlify.app/"
  };

  // Construct the widget URL from the configuration
  const encodedParams = encodeURIComponent(JSON.stringify(widgetConfig));
  const baseUrl = "https://www.tradingview-widget.com/embed-widget/single-quote/?locale=en#";
  const srcUrl = `${baseUrl}${encodedParams}`;

  // Iframe styles
  const iframeStyle = {
    userSelect: 'none',
    boxSizing: 'border-box',
    display: 'block',
    height: '100%',
    width: '100%',
  };

  return (
    <iframe 
      scrolling="no" 
      allowTransparency="true" 
      frameBorder="0" 
      src={srcUrl} 
      title="single quote TradingView widget" 
      lang="en" 
      style={iframeStyle}
    ></iframe>
  );
};

export default UsdIlsQuote;
