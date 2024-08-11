import React from 'react';

const TickerTapeWidget = () => {
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

  const encodedParams = encodeURIComponent(JSON.stringify(tickerConfig));
  const baseUrl = "https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#";
  const srcUrl = `${baseUrl}${encodedParams}`;

  const iframeStyle = {
    width: '100%',
    height: '45px',
    frameBorder: '0'
  };

  const mobileStyle = window.matchMedia("(max-width: 768px)").matches ? { height: '80px' } : {};

  return (
    <div style={{ position: 'relative', width: '100%', height: '45px' }}>
      <iframe
        src={srcUrl}
        style={{ ...iframeStyle, ...mobileStyle }}
      ></iframe>
      <div style={{
        position: 'absolute',
        top: '0', // Aligning to the top of the ticker
        right: '0', // Positioned on the right side
        width: '60px', // Adjust width to cover the logo
        height: '45px', // Match the height of the ticker
        backgroundColor: 'transparent', // Match this with your background
        zIndex: 2, // Ensures it overlays the iframe
      }}></div>
    </div>
  );
};

export default TickerTapeWidget;
