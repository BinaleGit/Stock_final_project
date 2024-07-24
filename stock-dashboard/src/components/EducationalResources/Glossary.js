import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Glossary = () => {
    const [Glossary, setGlossary] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/edu/glossary')
            .then(response => setGlossary(response.data))
            .catch(error => console.error('Error fetching glossary:', error));
    }, []);

    return (
        <div>
            <h1>Glossary</h1>
            <ul>
                {Glossary.map((Glossary, index) => (
                    <li key={index}>
                        <h2>{Glossary.title}</h2>
                        <p>
                            <a href={Glossary.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                Read more
                            </a>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Glossary;
