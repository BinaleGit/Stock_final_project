import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/global/header/Header';
import StockInfo from './components/global/header/StockInfo';
import StockGraph from './components/graph/StockGraph';
import Articles from './screens/Articles';
import Tutorials from './screens/Tutorials';
import Videos from './screens/Videos';
import Loader from './components/shared/Loader';
import Footer from './components/global/Footer';

const RoutesConfig = ({ setStockData, stockData, error, loading, setLoading }) => {
  const handleSetStockData = (data) => {
    setLoading(true);
    if (data) {
      setStockData(data);
    } else {
      setStockData(null);
    }
    setLoading(false);
  };

  return (
    <>
      <Header setStockData={handleSetStockData} />
      {loading && <Loader />}
      <div className={loading ? "blur-sm pointer-events-none" : ""}>
        <Routes>
          <Route
            path="/"
            element={<StockGraph setLoading={setLoading} />}
          />
          <Route
            path="/stock-info"
            element={<StockInfo data={stockData} />}
          />
          <Route
            path="/articles"
            element={<Articles />}
          />
          <Route
            path="/tutorials"
            element={<Tutorials />}
          />
          <Route
            path="/videos"
            element={<Videos />}
          />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default RoutesConfig;
