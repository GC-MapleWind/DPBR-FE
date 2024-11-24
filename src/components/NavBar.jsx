import React from 'react';
import {Link} from 'react-router-dom';
import {useGoogleLogin} from '@react-oauth/google';
import GoogleButton from './GoogleButton';
import LogoutButton from './LogoutButton';
import {useAuth} from '../hooks/useAuth';
import styles from '../styles/NavBar.module.css';

const NavBar = () => {
    const {username, handleLogout, handleCallback} = useAuth();

    // 구글 로그인을 위한 useGoogleLogin 훅 사용
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
                        {/*로그인 여부에 따라 다른 버튼을 보여줌*/}
                        {username ? (
                            // 로그인이 되어있으면 유저 이름과 로그아웃 버튼을 보여줌
                            <div style={{display: 'flex', alignItems: 'center'}}>
                                <span className={styles.username}><Link to="/my-page">{username}님</Link></span>
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                <LogoutButton onClick={handleLogout}/>
                            </div>
                        ) : (
                            // 로그인이 되어있지 않으면 구글 로그인 버튼을 보여줌
                            <GoogleButton onClick={() => login()} name="Google"/>
                        )}
                    </li>
                </ul>
            </nav>
        </header>
    );
};

export default NavBar;
