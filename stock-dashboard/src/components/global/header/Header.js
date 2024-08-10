import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import SearchBar from "./SearchBar";
import Offcanvas from "./Offcanvas";
import StockInfo from "./StockInfo";
import TickerTapeWidget from '../../widgets/TickerTapeWidget'; // Import the TickerTapeWidget component
import batstockLogo from "../../../styles/img/batstock.png";

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

  const showStockToast = (stock) => {
    toast.info(`${stock.symbol}: Click for details`, {
      position: "top-left", // Changed position to top-left
      autoClose: false,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      closeButton: true,
      onClick: () => reopenOffcanvas(stock),
    });
  };
  
  const reopenOffcanvas = (stock) => {
    setStockData(stock);
    setOffcanvasOpen(true);
  };

  return (
    <>
      <ToastContainer />
      <TickerTapeWidget />
      <header className="bg-dark-card border-b border-gray-700">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between h-12 lg:h-16"> {/* Reduced height */}
            <div className="flex items-center space-x-4">
              <Link
                to="/"
                className="text-xl font-bold text-primary flex items-center"
              >
                <img
                  src={batstockLogo}
                  alt="BatStock logo"
                  style={{
                    width: "50px", // Reduced width
                    height: "25px", // Reduced height
                    marginRight: "20px",
                    marginTop: "2px", // Reduced margin
                  }}
                />
                BatStock
              </Link>
            </div>
            <div className="flex items-center justify-center flex-1">
              <div className="flex items-center space-x-10">
                <Link to="/articles" className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary">
                  Articles
                </Link>
                <Link to="/tutorials" className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary">
                  Tutorials
                </Link>
                <Link to="/videos" className="text-sm font-medium text-dark-text transition-all duration-200 lg:text-base hover:text-primary focus:text-primary">
                  Videos
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
      <Offcanvas isOpen={isOffcanvasOpen} onClose={handleOffcanvasClose}>
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
