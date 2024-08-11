import React from 'react';

const UsdIlsQuote = () => {
  // Widget configuration moved inside the component
  const widgetConfig = {
    symbol: "FX_IDC:USDILS",
    isTransparent: true,
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
    <div style={{ position: 'relative', width: '100%', height: '126px' }}>
      <iframe 
        scrolling="no" 
        allowTransparency="true" 
        frameBorder="0" 
        src={srcUrl} 
        title="single quote TradingView widget" 
        lang="en" 
        style={iframeStyle}
      ></iframe>
      <div style={{
        position: 'absolute',
        top: '0',  // Positioned at the top
        right: '0',  // Positioned on the right side
        width: '60px', // Adjust width to cover the logo
        height: '30px', // Adjust height to cover the logo
        backgroundColor: 'transparent', // Match this with your background
        zIndex: 2, // Ensures it overlays the iframe
      }}></div>
    </div>
  );
};

export default UsdIlsQuote;
