import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useParams} from 'react-router-dom';
import styles from '../styles/CharacterPage.module.css';

const CharacterPage = () => {
    const [character, setCharacter] = useState(null);
    const [sameWorldCount, setSameWorldCount] = useState(null);
    const [sameJobCount, setSameJobCount] = useState(null);
    const [levelPercent, setLevelPercent] = useState(0);
    const [combatPowerPercent, setCombatPowerPercent] = useState(0);
    const [unionLevelPercent, setUnionLevelPercent] = useState(0);
    const {characterName} = useParams();

    useEffect(() => {
        const fetchCharacterData = async () => {
            try {
                const response = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/search?name=${characterName}`);
                setCharacter(response.data.result.info);
                setSameWorldCount(response.data.result.sameWorldCharacterCount);
                setSameJobCount(response.data.result.sameJobCharacterCount);
                setLevelPercent(response.data.result.levelPercentage);
                setCombatPowerPercent(response.data.result.unionPercentage);
                setUnionLevelPercent(response.data.result.combatPowerPercentage);
            } catch (error) {
                console.error('Error fetching character data:', error);
            }
        };

        fetchCharacterData();
    }, [characterName]);

    return (
        <div className={styles.characterContainer}>
            {character ? (
                <>
                    <div className={styles.characterTopRow}>
                        <div className={styles.characterDetails}>
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
                                    <div>전투력: {character.combatPower}</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.characterAssociates}>
                            <div className={styles.generalText}><h2 style={{display: 'inline'}}>{character.name}</h2>님은
                            </div>
                            <div className={styles.generalText}>
                                <h2 style={{display: 'inline'}}>{sameWorldCount}명</h2>과
                                <h2 style={{display: 'inline'}}> {character.world}</h2>에서 함께 플레이하고 있고
                            </div>
                            <div className={styles.generalText}>
                                <h2 style={{display: 'inline'}}>{sameJobCount}명</h2>과 함께
                                <h2 style={{display: 'inline'}}> {character.job}</h2>을(를) 즐기고 있습니다.
                            </div>
                        </div>
                    </div>
                    <div className={styles.characterRanking}>
                        <div><h2>레벨</h2>
                            <div>상위 <h1 style={{display: 'inline'}}>{levelPercent}%</h1></div>
                        </div>
                        <div><h2>전투력</h2>
                            <div>상위 <h1 style={{display: 'inline'}}>{combatPowerPercent}%</h1></div>
                        </div>
                        <div><h2>유니온</h2>
                            <div>상위 <h1 style={{display: 'inline'}}>{unionLevelPercent}%</h1></div>
                        </div>
                    </div>
                </>
            ) : (
                <p>캐릭터 정보를 불러오는 중입니다...</p>
            )}
        </div>
    );
};

export default CharacterPage;
