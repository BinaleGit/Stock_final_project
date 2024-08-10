import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Tutorials = () => {
    const [tutorials, setTutorials] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/edu/tutorials')
            .then(response => setTutorials(response.data))
            .catch(error => console.error('Error fetching tutorials:', error));
    }, []);

    return (
        <div>
            <h1>Tutorials</h1>
            <ul>
                {tutorials.map((tutorial, index) => (
                    <li key={index}>
                        <h2>{tutorial.title}</h2>
                        <p>
                            <a href={tutorial.url} target="_blank" rel="noopener noreferrer" style={{ color: 'blue', textDecoration: 'underline' }}>
                                Read more
                            </a>
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Tutorials;
