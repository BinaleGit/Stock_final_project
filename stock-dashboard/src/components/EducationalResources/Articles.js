import React, { useEffect, useState, useCallback } from 'react';
import axios from 'axios';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [page, setPage] = useState(1);
    const [limit] = useState(10);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [totalArticles, setTotalArticles] = useState(0);

    const fetchArticles = useCallback((page = 1, query = '') => {
        setLoading(true);
        axios.get(`http://localhost:5000/api/edu/articles`, {
            params: { page, limit, query }
        })
            .then(response => {
                setArticles(prevArticles => (page === 1 ? response.data.articles : [...prevArticles, ...response.data.articles]));
                setTotalArticles(response.data.total_articles);
                setPage(page);
            })
            .catch(error => {
                console.error('Error fetching articles:', error);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [limit]);

    useEffect(() => {
        fetchArticles(1, query);
    }, [fetchArticles, query]);

    const loadMoreArticles = () => {
        fetchArticles(page + 1, query);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        setArticles([]); // Clear current articles
        fetchArticles(1, query);
    };

    return (
        <div>
            <h1>Articles</h1>
            <form onSubmit={handleSearch}>
                <input 
                    type="text" 
                    placeholder="Search articles by company name" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                />
                <button type="submit">Search</button>
            </form>
            <ul>
                {articles.map((article, index) => (
                    <li key={index}>
                        <div>
                            {article.image && 
                                <a href={article.url} target="_blank" rel="noopener noreferrer">
                                    <img src={article.image} alt={article.title} style={{ maxWidth: '100px' }} />
                                </a>
                            }
                            <h2>{article.title}</h2>
                            <p>{article.description}</p>
                            <p>Names mentioned: {article.names ? article.names.join(', ') : 'None'}</p>
                            <p>
                                <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                    Read more
                                </a>
                            </p>
                        </div>
                    </li>
                ))}
            </ul>
            {loading && <p>Loading...</p>}
            {articles.length < totalArticles && <button onClick={loadMoreArticles} disabled={loading}>Load More</button>}
        </div>
    );
};

export default Articles;
