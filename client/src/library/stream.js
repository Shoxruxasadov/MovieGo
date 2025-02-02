import { useEffect, useState } from 'react';
import Hls from 'hls.js';
import axios from 'axios';

export default function LiveStream({ name, movieUrl  }) {
    const [movie, setMovie] = useState('');

    const fetchStream = () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/live/${name}?movieUrl=${movieUrl}`).then(({ data }) => setMovie(data)).catch(() => console.error('Error fetching hls movie'))
    const fetchTest = () => axios.get(`${process.env.NEXT_PUBLIC_SERVER_API}/live/${name}`).then(({ data }) => console.log(data)).catch(() => console.error('Error fetching test'))

    useEffect(() => {
        fetchStream();
        fetchTest()
    }, [movieUrl]);

    console.log(movie);
    
    return (
        <div style={{ width: "100%", minHeight: "100svh", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {movie ? (
                <video id="video" controls autoPlay style={{ width: '80%' }}>
                    <source src={movie} type="application/x-mpegURL" />
                </video>
            ) : (
                <p>Loading stream...</p>
            )}
        </div>
    );
}