import React from 'react';
import {Link} from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';
import GoogleButton from './GoogleButton';
import LogoutButton from './LogoutButton';
import {useAuth} from '../hooks/useAuth';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    const {username, handleLogout, handleCallback} = useAuth();

    const login = useGoogleLogin({
        flow: 'auth-code',
        onSuccess: (response) => handleCallback(response.code),
        onError: (error) => {
            console.error('Login failed:', error);
        },
    });

    return (
        <header>
            <nav>
                <ul>
                    <li className={styles.navItem}><Link to="/"><img src="../../public/logo.svg" alt="홈 아이콘"
                                                                     className={styles.logo}/></Link></li>
                    <li className={styles.navItem}><Link to="/ranking">랭킹</Link></li>
                    <li>
                        {username ? (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span className={styles.username}>{username}님</span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <LogoutButton onClick={handleLogout}/>
                            </div>
                        ) : (
                            <GoogleButton onClick={() => login()} name="Google"/>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
