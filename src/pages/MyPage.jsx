import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useAuth} from '../hooks/useAuth';
import {useNavigate} from 'react-router-dom';
import styles from '../styles/MyPage.module.css';

function HomePage() {
    const [user, setUser] = useState(null);
    const [character, setCharacter] = useState(null);
    const [name, setName] = useState('');
    const {username} = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (!username) {
            navigate('/');
            return;
        }

        const fetchUserData = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                const response = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/user/profile`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setUser(response.data.result);
                setCharacter(response.data.result.info);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, [username, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(
                `${import.meta.env.VITE_DEFAULT_API_URI}/v1/user/save-character`,
                {name},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            const response = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/user/profile`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setCharacter(response.data.result.info);
        } catch (error) {
            console.error('Error saving character:', error);
        }
    };

    return (
        <div className={styles.characterContainer}>
            <div className={styles.infoContainer}>
                {user && (
                    <div className={styles.userInfo}>
                        <h1 className={`h1_5 ${styles.characterHeader}`}>사용자 정보</h1>
                        <p>이름: {user.name}</p>
                        <p>학과: {user.major}</p>
                        <p>이메일: {user.email}</p>
                        <form onSubmit={handleSubmit}>
                            <h2>캐릭터 정보 수정</h2>
                            <label>
                                캐릭터 이름:
                                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                            </label>
                            <button type="submit">저장</button>
                        </form>
                    </div>
                )}
                {character ? (
                    <div className={styles.characterDetails}>
                        <h1 className={`h1_5 ${styles.characterHeader}`}>내 캐릭터 정보</h1>
                        <img src={character.characterImage} alt="캐릭터 이미지" className={styles.characterImage}/>
                        <div>
                            <h2>{character.name} <span style={{fontSize: '0.8em'}}>({character.gender})</span></h2>
                            <div className={styles.characterInfo}>
                                <div>Lv. {character.level}</div>
                                <div>{character.job}</div>
                                <div>
                                    <img src={`/world/${character.world}.svg`} alt="world"/>
                                    {character.world}
                                </div>
                                <div>유니온 Lv. {character.unionLevel}</div>
                                <div>전투력: {character.combatPower?.toLocaleString() || 0}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <h2>캐릭터의 정보가 없으니 캐릭터 이름을 입력해 주세요.</h2>
                        <label>
                            캐릭터 이름:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                        </label>
                        <button type="submit">저장</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default HomePage;
