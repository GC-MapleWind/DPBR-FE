import {useState, useEffect} from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [username, setUsername] = useState(localStorage.getItem('username'));

    useEffect(() => {
        const storedUsername = localStorage.getItem('username');
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    const handleLogin = (newUsername) => {
        setUsername(newUsername);
    };

    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('session');
        setUsername(null);
    };

    const handleCallback = async (code) => {
        try {
            const backendResponse = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/login?code=${code}`);
            const {accessToken, refreshToken, username, session} = backendResponse.data;

            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('username', username);
            localStorage.setItem('session', session);

            setUsername(username);
        } catch (error) {
            console.error('Error sending code to backend:', error);
            alert(`${error.response.data.message}`);
        }
    };

    return {
        username,
        handleLogin,
        handleLogout,
        handleCallback,
    };
};
