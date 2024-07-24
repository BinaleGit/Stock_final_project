import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Videos = () => {
    const [videos, setVideos] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/edu/videos')
            .then(response => setVideos(response.data))
            .catch(error => console.error('Error fetching videos:', error));
    }, []);

    return (
        <div>
            <h1>Videos</h1>
            <ul>
                {videos.map((video, index) => (
                    <li key={index}>
                        <h2>{video.title}</h2>
                        <div className="video-container">
                            <iframe
                                width="560"
                                height="315"
                                src={video.embed_url}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                title={video.title}
                            ></iframe>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Videos;
