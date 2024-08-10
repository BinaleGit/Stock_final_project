import React, { useState } from 'react';
import axios from 'axios';

const Articles = () => {
    const [articles, setArticles] = useState([]);
    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSearch = async (e) => {
        e.preventDefault();
        setLoading(true);
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
        <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
            <h1>Articles</h1>
            <form onSubmit={handleSearch} style={{ marginBottom: '20px' }}>
                <input 
                    type="text" 
                    placeholder="Search articles" 
                    value={query} 
                    onChange={(e) => setQuery(e.target.value)} 
                    style={{ padding: '10px', fontSize: '16px', width: '300px', marginRight: '10px' }}
                />
                <button type="submit" style={{ padding: '10px', fontSize: '16px' }}>Search</button>
            </form>
            {loading && <p>Loading...</p>}
            <ul style={{ listStyle: 'none', padding: 0 }}>
                {articles.map((article, index) => (
                    <li key={index} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
                        <div style={{ fontWeight: 'bold', color: '#555', marginBottom: '5px' }}>{article.source}</div>
                        <h2 style={{ fontSize: '18px', margin: '0 0 10px' }}>{article.title}</h2>
                        <p style={{ fontSize: '14px', color: '#333' }}>{article.description}</p>
                        <p>
                            <a href={article.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                Read more
                            </a>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Articles;
