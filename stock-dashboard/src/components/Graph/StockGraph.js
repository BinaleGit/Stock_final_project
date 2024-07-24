// StockGraph.jsx
import React, { useState } from "react";
import OldGraph from "../../screens/OldGraph";
import NewGraph from "../../screens/NewGraph";
import StockTimeline from "../../screens/StockTimeline";
import SymbolOverview from "../../screens/SymbolOverview";
import UsdIlsQuote from "../../screens/UsdIlsQuote";
import TradingViewWidget from "../../screens/TradingViewWidget"; // Import the new widget
import anime from "animejs";
import "../../styles/StockGraph.css";
import "../../styles/StockDashboard.css";

const StockGraph = () => {
  const [show, setShow] = useState("first");

  const handleDropdownChange = (option) => {
    if (option === "second") {
      setShow("second");
      anime({
        targets: ".graph-container",
        opacity: [1, 0],
        duration: 500,
        easing: "easeInOutQuad",
        complete: () => {
          anime({
            targets: ".graph-container",
            opacity: [0, 1],
            duration: 500,
            easing: "easeInOutQuad",
          });
        },
      });
    } else if (option === "both") {
      setShow("both");
      anime({
        targets: ".old-graph",
        translateX: ["0%", "-50%"],
        translateY: ["0%", "0%"],
        duration: 1000,
        easing: "easeInOutQuad",
      });
      anime({
        targets: ".new-graph",
        translateX: ["0%", "50%"],
        translateY: ["0%", "0%"],
        duration: 1000,
        easing: "easeInOutQuad",
      });
    } else if (option === "tradingview") {
      setShow("tradingview");
      anime({
        targets: ".graph-container",
        opacity: [1, 0],
        duration: 500,
        easing: "easeInOutQuad",
        complete: () => {
          anime({
            targets: ".graph-container",
            opacity: [0, 1],
            duration: 500,
            easing: "easeInOutQuad",
          });
        },
      });
    } else {
      setShow("first");
      anime({
        targets: ".graph-container",
        opacity: [1, 0],
        duration: 500,
        easing: "easeInOutQuad",
        complete: () => {
          anime({
            targets: ".graph-container",
            opacity: [0, 1],
            duration: 500,
            easing: "easeInOutQuad",
          });
        },
      });
    }
  };

  return (
    <div>
      <div className="flex justify-center my-4">
        <select
          onChange={(e) => handleDropdownChange(e.target.value)}
          className="block w-48 px-4 py-2 text-base text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="first">Show the first graph</option>
          <option value="second">Show the second graph</option>
          <option value="both">Show both graphs</option>
          {/* <option value="tradingview">Show TradingView Widget</option> Add new option */}
        </select>
      </div>
      <div className="graph-container">
        {show === "first" && (
          <div className="old-graph">
            <OldGraph />
          </div>
        )}
        {show === "second" && (
          <div className="new-graph">
            <NewGraph />
          </div>
        )}
        {show === "both" && (
          <div className="both-graphs">
            <div className="old-graph">
              <OldGraph />
            </div>
            <div className="new-graph">
              <NewGraph />
            </div>
          </div>
        )}
        {show === "tradingview" && (
          <div className="tradingview-graph">
            <TradingViewWidget />
          </div>
        )}
      </div>
      <div className="stock-graph-container">
        <div className="row">
          <StockTimeline />
        </div>
        <div className="row">
          <SymbolOverview />
          <UsdIlsQuote />
        </div>
      </div>
    </div>
  );
};

export default StockGraph;
