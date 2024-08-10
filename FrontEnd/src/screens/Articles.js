import React, { useState } from 'react';
import axios from 'axios';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [initialLoad, setInitialLoad] = useState(true); // Track if this is the initial load

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
        setInitialLoad(false);
        try {
            const response = await axios.get('http://localhost:5000/api/edu/articles', {
                params: { query }
            });
            setArticles(response.data.articles);
        } catch (error) {
            console.error('Error fetching articles:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="p-8 text-white">
            <h1 className="text-3xl font-semibold mb-4">Articles</h1>
            <form onSubmit={handleSearch} className="mb-8 flex">
                <input 
                    type="text" 
                    placeholder="Search articles..." 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    className="flex-grow p-3 text-black rounded-l-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary"
                />
                <button 
                    type="submit" 
                    className="p-3 bg-primary text-white rounded-r-md hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-primary"
                >
                    Search
                </button>
            </form>
            {loading ? (
                <div className="flex justify-center items-center">
                    <div className="loader border-t-4 border-b-4 border-primary"></div>
                    <p className="ml-4">Loading...</p>
                </div>
            ) : initialLoad ? (
                <div className="text-center">
                    <p className="text-lg mb-4">Use the search bar above to find interesting articles.</p>
                    <p className="text-lg">You can search by topic, keyword, or source.</p>
                </div>
            ) : articles.length > 0 ? (
                <ul className="list-none p-0">
                    {articles.map((article, index) => (
                        <li key={index} className="mb-4 p-4 border border-gray-700 rounded-lg">
                            <div className="font-bold text-secondary mb-2">{article.source}</div>
                            <h2 className="text-lg mb-2">{article.title}</h2>
                            <p className="text-sm mb-4">{article.description}</p>
                            <a 
                                href={article.url} 
                                target="_blank" 
                                rel="noopener noreferrer" 
                                className="text-blue-400 underline"
                            >
                                Read more
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No articles found. Please try a different search term.</p>
            )}
        </div>
    );
};

export default Articles;
