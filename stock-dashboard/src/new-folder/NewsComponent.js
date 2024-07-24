import React, { useEffect, useState } from 'react';
import axios from 'axios';

const NewsComponent = () => {
    const [news, setNews] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const newsPerPage = 5;

    useEffect(() => {
        axios.get('http://localhost:5000/api/edu/articles')
            .then(response => setNews(response.data))
            .catch(error => console.error('Error fetching news:', error));
    }, []);

    const indexOfLastNews = currentPage * newsPerPage;
    const indexOfFirstNews = indexOfLastNews - newsPerPage;
    const currentNews = news.slice(indexOfFirstNews, indexOfLastNews);

    const handleNextPage = () => {
        if (currentPage < Math.ceil(news.length / newsPerPage)) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <div className="news-container">
            <h2>Latest Stock News</h2>
            <ul>
                {currentNews.map((article, index) => (
                    <li key={index}>
                        <a href={article.url} target="_blank" rel="noopener noreferrer">
                            {article.title}
                        </a>
                        <p>{article.description}</p>
                        {article.names && article.names.length > 0 && (
                            <p>Names mentioned: {article.names.join(', ')}</p>
                        )}
                    </li>
                ))}
            </ul>
            <div>
                <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
                <button onClick={handleNextPage} disabled={currentPage === Math.ceil(news.length / newsPerPage)}>Next</button>
            </div>
        </div>
    );
};

export default NewsComponent;
