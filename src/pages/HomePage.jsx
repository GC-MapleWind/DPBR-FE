import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import styles from '../styles/HomePage.module.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function HomePage() {
    const [characterCount, setCharacterCount] = useState(0); // 캐릭터 수
    const [majorStatistics, setMajorStatistics] = useState(null); // 학과별 통계
    const [averageLevel, setAverageLevel] = useState(0); // 평균 레벨
    const [averageCombatPower, setAverageCombatPower] = useState(0); // 평균 전투력
    const [averageUnionLevel, setAverageUnionLevel] = useState(0); // 평균 유니온 레벨
    const [topLevelCharacter, setTopLevelCharacter] = useState(null); // 최고 레벨 캐릭터
    const [topCombatCharacter, setTopCombatCharacter] = useState(null); // 최고 전투력 캐릭터
    const [topUnionCharacter, setTopUnionCharacter] = useState(null); // 최고 유니온 레벨 캐릭터

    // 페이지가 로드될 때 데이터를 가져옴
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [characterCountRes, majorStatisticsRes, averageLevelRes, averageCombatPowerRes, averageUnionLevelRes, topLevelCharacterRes, topCombatCharacterRes, topUnionCharacterRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/count`), // 캐릭터 수
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/user/statistics/major`), // 학과별 통계
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/average/level`), // 평균 레벨
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/average/combat-power`), // 평균 전투력
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/average/union`), // 평균 유니온 레벨
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/top/level`), // 최고 레벨 캐릭터
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/top/combat-power`), // 최고 전투력 캐릭터
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/top/union`) // 최고 유니온 레벨 캐릭터
                ]);

                // 데이터를 상태에 저장
                setCharacterCount(characterCountRes.data.result);
                setMajorStatistics(majorStatisticsRes.data.result);
                setAverageLevel(averageLevelRes.data.result.average);
                setAverageCombatPower(averageCombatPowerRes.data.result.average);
                setAverageUnionLevel(averageUnionLevelRes.data.result.average);
                setTopLevelCharacter(topLevelCharacterRes.data.result);
                setTopCombatCharacter(topCombatCharacterRes.data.result);
                setTopUnionCharacter(topUnionCharacterRes.data.result);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    // pie 차트 데이터
    const pieData = majorStatistics ? {
        labels: Object.keys(majorStatistics),
        datasets: [{
            data: Object.values(majorStatistics),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    } : null;

    return (
        <div className={styles.homepageContainer}>
            <div className={styles.averageStats}>
                <div>단풍바람은 <b>{characterCount?.toLocaleString() || 0}</b>명의 용사님들과 함께 하고 있으며,</div>
                <p>평균 레벨은 <b>{averageLevel}</b> 이고,</p>
                <p>평균 전투력은 <b>{averageCombatPower?.toLocaleString() || 0}</b> 이고,</p>
                <p>평균 유니온은 <b>{averageUnionLevel}</b> 입니다.</p>
            </div>
            <div className={styles.topCharacters}>
                <div>
                    <h2>학과별 분포</h2>
                    {pieData && <Pie data={pieData} />}
                </div>
                <div onClick={() => window.location.href = `http://localhost:3000/character/${topLevelCharacter.name}`}>
                    <h2>최고 LV 캐릭터</h2>
                    {topLevelCharacter && (
                        <div>
                            <img src={topLevelCharacter.characterImage} alt="최고 LV 캐릭터 이미지" className={styles.characterImage}/>
                            <h3>{topLevelCharacter.name}</h3>
                            <div className={styles.characterInfo}>
                                <p>Lv. {topLevelCharacter.level}</p>
                                <p>{topLevelCharacter.job}</p>
                                <p><img src={`/world/${topLevelCharacter.world}.svg`} alt="world"/> {topLevelCharacter.world}</p>
                                <p>유니온 LV: {topLevelCharacter.unionLevel}</p>
                                <p>전투력: {topLevelCharacter.combatPower?.toLocaleString() || 0}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div onClick={() => window.location.href = `http://localhost:3000/character/${topCombatCharacter.name}`}>
                    <h2>최고 전투력 캐릭터</h2>
                    {topCombatCharacter && (
                        <div>
                            <img src={topCombatCharacter.characterImage} alt="최고 전투력 캐릭터 이미지" className={styles.characterImage}/>
                            <h3>{topCombatCharacter.name}</h3>
                            <div className={styles.characterInfo}>
                                <p>Lv. {topCombatCharacter.level}</p>
                                <p>{topCombatCharacter.job}</p>
                                <p><img src={`/world/${topCombatCharacter.world}.svg`} alt="world"/> {topCombatCharacter.world}</p>
                                <p>유니온 LV: {topCombatCharacter.unionLevel}</p>
                                <p>전투력: {topCombatCharacter.combatPower?.toLocaleString() || 0}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div onClick={() => window.location.href = `http://localhost:3000/character/${topUnionCharacter.name}`}>
                    <h2>최고 유니온 캐릭터</h2>
                    {topUnionCharacter && (
                        <div>
                            <img src={topUnionCharacter.characterImage} alt="최고 유니온 캐릭터 이미지" className={styles.characterImage}/>
                            <h3>{topUnionCharacter.name}</h3>
                            <div className={styles.characterInfo}>
                                <p>Lv. {topUnionCharacter.level}</p>
                                <p>{topUnionCharacter.job}</p>
                                <p><img src={`/world/${topUnionCharacter.world}.svg`} alt="world"/> {topUnionCharacter.world}</p>
                                <p>유니온 LV: {topUnionCharacter.unionLevel}</p>
                                <p>전투력: {topUnionCharacter.combatPower?.toLocaleString() || 0}</p>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default HomePage;
