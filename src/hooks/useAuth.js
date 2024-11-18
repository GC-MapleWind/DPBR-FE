import { useState } from 'react';

export const useAuth = () => {
  const [username, setUsername] = useState(null);

  const handleLogin = (newUsername) => {
    setUsername(newUsername);
  };

  const handleLogout = () => {
    setUsername(null);
  };

  return {
    username,
    handleLogin,
    handleLogout,
  };
};
