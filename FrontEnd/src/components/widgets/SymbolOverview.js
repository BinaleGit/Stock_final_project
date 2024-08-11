import React from 'react';

const SymbolOverview = () => (
  <div style={{ position: 'relative', width: '100%', height: '199px' }}>
    <iframe 
      scrolling="no" 
      allowTransparency="true" 
      frameBorder="0" 
      src="https://www.tradingview-widget.com/embed-widget/symbol-overview/?locale=en#%7B%22symbols%22%3A%5B%5B%22FRED%3ASP500%7C1D%22%5D%2C%5B%22FRED%3ANDQ100%7C1D%22%5D%2C%5B%22BLACKBULL%3AUS30%7C1D%22%5D%5D%2C%22chartOnly%22%3Afalse%2C%22width%22%3A345%2C%22height%22%3A199%2C%22colorTheme%22%3A%22dark%22%2C%22showVolume%22%3Afalse%2C%22showMA%22%3Afalse%2C%22hideDateRanges%22%3Atrue%2C%22hideMarketStatus%22%3Atrue%2C%22hideSymbolLogo%22%3Afalse%2C%22scalePosition%22%3A%22right%22%2C%22scaleMode%22%3A%22Normal%22%2C%22fontFamily%22%3A%22-apple-system%2C%20BlinkMacSystemFont%2C%20Trebuchet%20MS%2C%20Roboto%2C%20Ubuntu%2C%20sans-serif%22%2C%22fontSize%22%3A%2210%22%2C%22noTimeScale%22%3Afalse%2C%22valuesTracking%22%3A%221%22%2C%22changeMode%22%3A%22price-and-percent%22%2C%22chartType%22%3A%22area%22%2C%22lineWidth%22%3A2%2C%22lineType%22%3A0%2C%22isTransparent%22%3Atrue%2C%22dateRanges%22%3A%5B%221d%22%5D%2C%22utm_source%22%3A%22index-tracker.netlify.app%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22symbol-overview%22%2C%22page-uri%22%3A%22index-tracker.netlify.app%2F%22%7D" 
      title="symbol overview TradingView widget" 
      lang="en" 
      style={{ userSelect: 'none', boxSizing: 'border-box', display: 'block', height: '100%', width: '100%' }}
    ></iframe>
    <div style={{
      position: 'absolute',
      bottom: '0', // Positioned at the bottom
      left: '0', // Positioned at the left side
      width: '60px', // Adjust width to cover the logo
      height: '60px', // Adjust height to cover the logo
      backgroundColor: 'transparent', // Transparent or match your background
      zIndex: 2, // Ensures it overlays the iframe
    }}></div>
  </div>
);

export default SymbolOverview;
