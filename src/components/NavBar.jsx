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
                    <li className={styles.navItem}><Link to="/"><img src="/logo.svg" alt="홈 아이콘"
                                                                     className={styles.logo}/></Link></li>
                    <li className={styles.navItem}><Link to="/ranking/level">레벨 랭킹</Link></li>
                    <li className={styles.navItem}><Link to="/ranking/combat-power">전투력 랭킹</Link></li>
                    <li className={styles.navItem}><Link to="/ranking/union">유니온 랭킹</Link></li>
                    <li>
                        {username ? (
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span className={styles.username}><Link to="/my-page">{username}님</Link></span>
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
