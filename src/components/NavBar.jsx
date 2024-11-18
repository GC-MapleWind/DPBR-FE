import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';
import GoogleButton from './GoogleButton';
import LogoutButton from './LogoutButton';
import axios from 'axios';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    const [username, setUsername] = useState(localStorage.getItem('username'));

    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: async (response) => {
            try {
                const backendResponse = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/login?code=${response.code}`);
                const {accessToken, refreshToken, username} = backendResponse.data;

                // Save tokens and username to local storage
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('username', username);

                // Update state
                setUsername(username);
            } catch (error) {
                console.error('Error sending code to backend:', error);
            }
        },
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });

    const handleLogout = () => {
        // Clear tokens and username from local storage
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');

        // Update state
        setUsername(null);
    };

    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/ranking">랭킹</Link></li>
                    <li><Link to="/statistics">통계</Link></li>
                    <li><Link to="/profile">내 정보</Link></li>
                    <li style={{marginLeft: 'auto'}}>
                        <input type="text" placeholder="검색"/>
                    </li>
                    <li>
                        {username ? (
                            <>
                                <div style={{display: 'flex', alignItems: 'center'}}>
                                    <span className={styles.username}>{username}님</span>
                                    &nbsp;
                                    <LogoutButton onClick={handleLogout}/>
                                </div>
                            </>
                        ) : (
                            <GoogleButton onClick={login} name="Google"/>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
