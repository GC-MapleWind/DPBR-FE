import { useState } from 'react';
import axios from 'axios';

export const useAuth = () => {
  const [username, setUsername] = useState(localStorage.getItem('username'));

  const handleLogin = (newUsername) => {
    setUsername(newUsername);
  };

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');
    setUsername(null);
  };

  const handleCallback = async (code) => {
    try {
      const backendResponse = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/login?code=${code}`);
      const { accessToken, refreshToken, username } = backendResponse.data;

      localStorage.setItem('refreshToken', refreshToken);
      localStorage.setItem('username', username);

      setUsername(username);
    } catch (error) {
      console.error('Error sending code to backend:', error);
    }
  };

  return {
    username,
    handleLogin,
    handleLogout,
    handleCallback,
  };
};
