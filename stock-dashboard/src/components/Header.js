import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./SearchBar";
import Offcanvas from "./Offcanvas";
import StockInfo from "./StockInfo";
import batstockLogo from "./assets/batstock.png";

const Header = () => {
  const [isOffcanvasOpen, setOffcanvasOpen] = useState(false);
  const [stockData, setStockData] = useState(null);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSetStockData = (data) => {
    setStockData(data);
    setOffcanvasOpen(true);
    showStockToast(data);
  };

  const handleOffcanvasClose = () => {
    setOffcanvasOpen(false);
  };

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  // Function to show stock data as a toast notification
  const showStockToast = (stock) => {
    toast.info(`${stock.symbol}: Click for details`, {
      position: "top-right",
      autoClose: false, // Toast will not close automatically
      hideProgressBar: false,
      closeOnClick: false, // Disable toast closing on click
      pauseOnHover: true,
      draggable: true,
      closeButton: true, // Ensure that the close button is enabled
      onClick: () => reopenOffcanvas(stock), // Handle click to reopen Offcanvas with the stock info
    });
  };

  // Function to reopen Offcanvas with the clicked stock info from the toast
  const reopenOffcanvas = (stock) => {
    setStockData(stock);
    setOffcanvasOpen(true);
  };

  return (
    <>
      <ToastContainer
        className={`inset-10 transform `} // Ensure this value is less than the Offcanvas z-index
      />
      <iframe
        src="https://s.tradingview.com/embed-widget/ticker-tape/?locale=en#%7B%22symbols%22%3A%5B%7B%22proName%22%3A%22NASDAQ%3ATSLA%22%2C%22title%22%3A%22%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3ANVDA%22%2C%22title%22%3A%22%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3AAAPL%22%2C%22title%22%3A%22%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3AAMD%22%2C%22title%22%3A%22%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3AAMZN%22%2C%22title%22%3A%22%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3AMSFT%22%2C%22title%22%3A%22%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3ANFLX%22%2C%22title%22%3A%22%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3AMETA%22%2C%22title%22%3A%22%22%7D%2C%7B%22proName%22%3A%22NASDAQ%3AINTC%22%2C%22title%22%3A%22%22%7D%5D%2C%22showSymbolLogo%22%3Atrue%2C%22isTransparent%22%3Atrue%2C%22displayMode%22%3A%22adaptive%22%2C%22colorTheme%22%3A%22dark%22%7D
"
        width="100%"
        height="80"
        frameborder="0"
      ></iframe>

      <header className="bg-dark-card border-b border-gray-700">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-16 lg:h-20">
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-xl font-bold text-primary flex items-center"
              >
                <img
                  src={batstockLogo}
                  alt="BatStock logo"
                  style={{
                    width: "63px",
                    height: "33px",
                    marginRight: "20px",
                    marginTop: "5px",
                  }}
                />
                BatStock
              </Link>
            </div>
            <div className="flex items-center justify-center flex-1">
              <div className="flex items-center space-x-10">
                <Link
                  to="/articles"
                  className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"
                >
                  {" "}
                  Articles{" "}
                </Link>
                <Link
                  to="/tutorials"
                  className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"
                >
                  {" "}
                  Tutorials{" "}
                </Link>
                <Link
                  to="/glossary"
                  className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"
                >
                  {" "}
                  Glossary{" "}
                </Link>
                <Link
                  to="/videos"
                  className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary"
                >
                  {" "}
                  Videos{" "}
                </Link>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <SearchBar setStockData={handleSetStockData} />
              <button
                type="button"
                className="inline-flex p-2 text-dark-text transition-all duration-200 rounded-md md:hidden focus:bg-gray-800 hover:bg-gray-800"
                onClick={toggleMobileMenu}
              >
                <svg
                  className="w-6 h-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
              </button>
            </div>
          </nav>
        </div>
      </header>
      <Offcanvas
        isOpen={isOffcanvasOpen}
        onClose={handleOffcanvasClose}
        className="offcanvas"
      >
        {stockData ? (
          <StockInfo data={stockData} />
        ) : (
          <p>No data available. Please enter a valid stock symbol.</p>
        )}
      </Offcanvas>
    </>
  );
};

export default Header;
