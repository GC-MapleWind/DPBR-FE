import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useAuth} from '../hooks/useAuth';
import '../style.css';

function HomePage() {
    const [character, setCharacter] = useState(null);
    const [name, setName] = useState('');
    const {username} = useAuth();

    useEffect(() => {
        const fetchCharacter = async () => {
            try {
                const token = localStorage.getItem('accessToken');
                console.log('token:', token);
                const response = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/user/my-character`, {
                    headers: {Authorization: `Bearer ${token}`},
                });
                setCharacter(response.data.result);
            } catch (error) {
                console.error('Error fetching character:', error);
            }
        };

        fetchCharacter();
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('accessToken');
            await axios.post(
                `${import.meta.env.VITE_DEFAULT_API_URI}/v1/user/save-character`,
                {name},
                {headers: {Authorization: `Bearer ${token}`}}
            );
            const response = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/user/my-character`, {
                headers: {Authorization: `Bearer ${token}`},
            });
            setCharacter(response.data.result);
        } catch (error) {
            console.error('Error saving character:', error);
        }
    };

    return (
        <div style={{height: '40%'}}>
            <h1 className={'h1_5'} style={{textAlign: 'left', marginTop: '10px'}}>내 캐릭터 정보</h1>
            {username ? (
                character ? (
                    <div style={{display: 'flex', alignItems: 'center'}}>
                        <img src={character.characterImage} alt="캐릭터 이미지" style={{margin: '30px'}} width='200'
                             height='200'/>
                        <div>
                            <h2>{character.name} <span style={{fontSize: '0.8em'}}>({character.gender})</span></h2>
                            <div style={{textAlign: 'left'}}>
                                <div>Lv. {character.level}</div>
                                <div>{character.job}</div>
                                <div>
                                    <img src={`/world/${character.world}.svg`} alt="world"/>
                                    {character.world}
                                </div>
                                <div>유니온 Lv. {character.unionLevel}</div>
                                <div>전투력: {character.combatPower}</div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit}>
                        <label>
                            캐릭터 이름:
                            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required/>
                        </label>
                        <button type="submit">저장</button>
                    </form>
                )
            ) : (
                <div>로그인이 필요합니다. 로그인 해주세요.</div>
            )}
        </div>
    );
}

export default HomePage;
