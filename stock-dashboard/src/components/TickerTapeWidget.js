import React from 'react';

const TickerTapeWidget = () => {
  // Widget configuration moved inside the component
  const tickerConfig = {
    symbols: [
      { proName: "NASDAQ:TSLA", title: "" },
      { proName: "NASDAQ:NVDA", title: "" },
      { proName: "NASDAQ:AAPL", title: "" },
      { proName: "NASDAQ:AMD", title: "" },
      { proName: "NASDAQ:AMZN", title: "" },
      { proName: "NASDAQ:MSFT", title: "" },
      { proName: "NASDAQ:NFLX", title: "" },
      { proName: "NASDAQ:META", title: "" },
      { proName: "NASDAQ:INTC", title: "" }
    ],
    showSymbolLogo: true,
    isTransparent: true,
    displayMode: "adaptive",
    colorTheme: "dark"
  };

  // Construct the widget URL from the configuration
  const encodedParams = encodeURIComponent(JSON.stringify(tickerConfig));
  const baseUrl = "https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#";
  const srcUrl = `${baseUrl}${encodedParams}`;

  // Responsive iframe styles
  const iframeStyle = {
    width: '100%',
    height: '45px', // Default height for larger screens
    frameBorder: '0'
  };

  // Media query to adjust iframe height on smaller screens
  const mobileStyle = window.matchMedia("(max-width: 768px)").matches ? { height: '80px' } : {};

  return (
    <iframe
      src={srcUrl}
      style={{ ...iframeStyle, ...mobileStyle }}
    ></iframe>
  );
};

export default TickerTapeWidget;
