import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import SearchBar from './SearchBar';
import Offcanvas from './Offcanvas';
import StockInfo from './StockInfo';
import Popover from './Popover';
import batstockLogo from './assets/batstock.png';

const Header = () => {
    const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
    const [stockData, setStockData] = useState(null);
    const [popovers, setPopovers] = useState([]);
    const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleSetStockData = (data) => {
        setStockData(data);
        setOffcanvasOpen(true);
    };

    const handleOffcanvasClose = () => {
        if (stockData && !popovers.some(popover => popover.symbol === stockData.symbol)) {
            setPopovers([...popovers, { symbol: stockData.symbol, data: stockData }]);
        }
        setOffcanvasOpen(false);
    };

    const handlePopoverClose = (index) => {
        setPopovers(popovers.filter((_, i) => i !== index));
    };

    const handlePopoverClick = (data) => {
        setStockData(data);
        setOffcanvasOpen(true);
    };

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };

    return (
        <>
            <iframe 
                scrolling="no" 
                allowtransparency="true" 
                frameborder="0" 
                src="https://www.tradingview-widget.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22description%22%3A%22%22%2C%22proName%22%3A%22NASDAQ%3ATSLA%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22NASDAQ%3ANVDA%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22NASDAQ%3AAAPL%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22NASDAQ%3AAMD%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22NASDAQ%3AAMZN%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22NASDAQ%3AMSFT%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22NASDAQ%3ANFLX%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22NASDAQ%3AMETA%22%7D%2C%7B%22description%22%3A%22%22%2C%22proName%22%3A%22NASDAQ%3AINTC%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22isTransparent%22%3Afalse%2C%22displayMode%22%3A%22adaptive%22%2C%22colorTheme%22%3A%22dark%22%2C%22width%22%3A%22100%25%22%2C%22height%22%3A78%2C%22utm_source%22%3A%22index-tracker.netlify.app%22%2C%22utm_medium%22%3A%22widget_new%22%2C%22utm_campaign%22%3A%22ticker-tape%22%2C%22page-uri%22%3A%22index-tracker.netlify.app%2F%22%7D" 
                title="ticker tape TradingView widget" 
                lang="en" 
                style={{ userSelect: 'none', boxSizing: 'border-box', display: 'block', height: '78px', width: '100%' }}>
            </iframe>
            <header className="bg-dark-card border-b border-gray-700">
                <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <nav className="flex items-center justify-between h-16 lg:h-20">
                        <div className="flex items-center space-x-4">
                            <Link to="/" className="text-xl font-bold text-primary flex items-center">
                                <img src={batstockLogo} alt="BatStock logo" style={{ width: '63px', height: '33px', marginRight: '20px', marginTop: '5px' }} />
                                BatStock
                            </Link>
                        </div>
                        <div className="flex items-center justify-center flex-1">
                            <div className="flex items-center space-x-10">
                                <Link to="/articles" className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"> Articles </Link>
                                <Link to="/tutorials" className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"> Tutorials </Link>
                                <Link to="/glossary" className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"> Glossary </Link>
                                <Link to="/videos" className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"> Videos </Link>
                            </div>
                        </div>
                        <div className="flex items-center space-x-4">
                            <SearchBar setStockData={handleSetStockData} />
                            <button 
                                type="button" 
                                className="inline-flex p-2 text-dark-text transition-all duration-200 rounded-md md:hidden focus:bg-gray-800 hover:bg-gray-800"
                                onClick={toggleMobileMenu}
                            >
                                <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            </button>
                        </div>
                    </nav>
                </div>
            </header>
            <Offcanvas isOpen={isOffcanvasOpen} onClose={handleOffcanvasClose}>
                {stockData ? <StockInfo data={stockData} /> : <p>No data available. Please enter a valid stock symbol.</p>}
            </Offcanvas>
            {popovers.map((popover, index) => (
                <Popover 
                    key={index} 
                    stockName={popover.symbol} 
                    position={index} 
                    onClose={() => handlePopoverClose(index)} 
                    onClick={() => handlePopoverClick(popover.data)} 
                />
            ))}
        </>
    );
};

export default Header;
