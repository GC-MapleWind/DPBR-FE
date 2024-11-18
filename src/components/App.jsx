import React, { useState } from 'react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import NavBar from './NavBar';
import '../styles/App.css'

const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID;

function App() {
    const [username, setUsername] = useState(null);

    const handleLogout = () => {
        setUsername(null);
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
    };

    return (
        <GoogleOAuthProvider clientId={CLIENT_ID}>
            <NavBar username={username} handleLogout={handleLogout} />
            <div>
                <h1>Google OAuth Login</h1>
            </div>
        </GoogleOAuthProvider>
    );
}

export default App;
