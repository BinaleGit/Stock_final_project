import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './new-folder/Header';
import StockInfo from './new-folder/StockInfo';
import StockGraph from './new-folder/Graph/StockGraph';
import Loader from './new-folder/Loader';
import Footer from './new-folder/Footer';
import Articles from './new-folder/EducationalResources/Articles';
import Tutorials from './new-folder/EducationalResources/Tutorials';
import Videos from './new-folder/EducationalResources/Videos';
import './styles/pop.css';
import About from './screens/About';


const App = () => {
    const [stockData, setStockData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSetStockData = (data) => {
        setLoading(true);
        if (data) {
            setStockData(data);
            setError(false);
        } else {
            setStockData(null);
            setError(true);
        }
        setLoading(false);
    };

    return (
        <Router>
            <div className="flex flex-col min-h-screen">
                <Header setStockData={handleSetStockData} /><br/>
                {loading && <Loader />}
                <div className={`flex-grow ${loading ? "blur-sm pointer-events-none" : ""}`}>
                    <Routes>
                        <Route path="/" element={stockData ? <StockInfo data={stockData} /> : (error && <p>No data available. Please enter a valid stock symbol.</p>)} />
                        <Route path="/articles" element={<Articles />} />
                        <Route path="/tutorials" element={<Tutorials />} />
                        <Route path="/videos" element={<Videos />} />
                        <Route path="/about" element={<About />} /> {/* Added About route */}

                    </Routes>
                    { <StockGraph setLoading={setLoading} /> }  
                </div>
                <Footer />
            </div>
        </Router>
    );
};

export default App;
