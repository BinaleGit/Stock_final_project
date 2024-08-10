import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import StockInfo from './components/StockInfo';
import StockGraph from './components/Graph/StockGraph';
import Articles from './components/EducationalResources/Articles';
import Tutorials from './components/EducationalResources/Tutorials';
import Videos from './components/EducationalResources/Videos';
import Loader from './components/Loader';
import Footer from './components/Footer';

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
