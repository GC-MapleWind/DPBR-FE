import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import '../style.css';

ChartJS.register(ArcElement, Tooltip, Legend);

function HomePage() {
    const [characterCount, setCharacterCount] = useState(0);
    const [majorStatistics, setMajorStatistics] = useState(null);
    const [averageLevel, setAverageLevel] = useState(0);
    const [averageCombatPower, setAverageCombatPower] = useState(0);
    const [averageUnionLevel, setAverageUnionLevel] = useState(0);
    const [topLevelCharacter, setTopLevelCharacter] = useState(null);
    const [topCombatCharacter, setTopCombatCharacter] = useState(null);
    const [topUnionCharacter, setTopUnionCharacter] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [characterCountRes, majorStatisticsRes, averageLevelRes, averageCombatPowerRes, averageUnionLevelRes, topLevelCharacterRes, topCombatCharacterRes, topUnionCharacterRes] = await Promise.all([
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/count`),
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/user/statistics/major`),
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/average/level`),
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/average/combat-power`),
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/average/union`),
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/top/level`),
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/top/combat-power`),
                    axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/top/union`)
                ]);

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

    const pieData = majorStatistics ? {
        labels: Object.keys(majorStatistics),
        datasets: [{
            data: Object.values(majorStatistics),
            backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            hoverBackgroundColor: ['#FF6384', '#36A2EB', '#FFCE56']
        }]
    } : null;

    return (
        <div className="homepage-container">
            <div className="average-stats">
                <div>단풍바람은 <b>{characterCount?.toLocaleString() || 0}</b>명의 용사님들과 함께 하고 있으며,</div>
                <p>평균 레벨은 <b>{averageLevel}</b> 이고,</p>
                <p>평균 전투력은 <b>{averageCombatPower?.toLocaleString() || 0}</b> 이고,</p>
                <p>평균 유니온은 <b>{averageUnionLevel}</b> 입니다.</p>
            </div>
            <div className="top-characters">
                <div>
                    <h2>학과별 분포</h2>
                    {pieData && <Pie data={pieData} />}
                </div>
                <div>
                    <h2>최고 LV 캐릭터</h2>
                    {topLevelCharacter && (
                        <div>
                            <img src={topLevelCharacter.characterImage} alt="최고 LV 캐릭터 이미지" className="character-image"/>
                            <h3>{topLevelCharacter.name}</h3>
                            <div>
                                <p>Lv. {topLevelCharacter.level}</p>
                                <p>{topLevelCharacter.job}</p>
                                <p><img src={`/world/${topLevelCharacter.world}.svg`} alt="world"/> {topLevelCharacter.world}</p>
                                <p>유니온 LV: {topLevelCharacter.unionLevel}</p>
                                <p>전투력: {topLevelCharacter.combatPower?.toLocaleString() || 0}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <h2>최고 전투력 캐릭터</h2>
                    {topCombatCharacter && (
                        <div>
                            <img src={topCombatCharacter.characterImage} alt="최고 전투력 캐릭터 이미지" className="character-image"/>
                            <h3>{topCombatCharacter.name}</h3>
                            <div>
                                <p>Lv. {topCombatCharacter.level}</p>
                                <p>{topCombatCharacter.job}</p>
                                <p><img src={`/world/${topCombatCharacter.world}.svg`} alt="world"/> {topCombatCharacter.world}</p>
                                <p>유니온 LV: {topCombatCharacter.unionLevel}</p>
                                <p>전투력: {topCombatCharacter.combatPower?.toLocaleString() || 0}</p>
                            </div>
                        </div>
                    )}
                </div>
                <div>
                    <h2>최고 유니온 캐릭터</h2>
                    {topUnionCharacter && (
                        <div>
                            <img src={topUnionCharacter.characterImage} alt="최고 유니온 캐릭터 이미지" className="character-image"/>
                            <h3>{topUnionCharacter.name}</h3>
                            <div>
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
