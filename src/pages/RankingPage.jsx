import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const RankingPage = () => {
    const { rankingName } = useParams(); // URL 파라미터 값 가져오기
    const [rankingData, setRankingData] = useState([]); // 랭킹 데이터
    const [isLoading, setIsLoading] = useState(true); // 로딩 상태
    const [error, setError] = useState(null); // 에러 상태

    // 랭킹 데이터 가져오기
    useEffect(() => {
        const fetchRankingData = async () => {
            setIsLoading(true); // 로딩 시작
            setError(null); // 에러 초기화
            try {
                // 랭킹 데이터 가져오기
                const response = await fetch(`${import.meta.env.VITE_DEFAULT_API_URI}/v1/character/ranking/${rankingName}`);

                // 응답이 성공적이면 데이터를 상태에 저장
                const data = await response.json();
                setRankingData(data.result);
            } catch (error) {
                setError('데이터를 가져오는 데 실패했습니다.'); // 에러 메시지 설정
            } finally {
                setIsLoading(false); // 로딩 종료
            }
        };

        fetchRankingData();
    }, [rankingName]);

    return (
        <div>
            {isLoading && <p>로딩 중입니다...</p>} {/* 로딩 상태 표시 */}
            {error && <p style={{ color: 'red' }}>{error}</p>} {/* 에러 메시지 표시 */}
            {!isLoading && !error && rankingData.length > 0 && (
                <table style={{ width: '100%' }}>
                    <thead>
                    <tr>
                        <th>순위</th>
                        <th>이미지</th>
                        <th>닉네임</th>
                        <th>직업</th>
                        <th>레벨</th>
                        <th>전투력</th>
                        <th>유니온 레벨</th>
                    </tr>
                    </thead>
                    <tbody>
                    {rankingData.map((item, index) => (
                        <tr key={index} onClick={() => window.location.href = `http://localhost:3000/character/${item.info.name}`}>
                            <td>{item.ranking}</td>
                            <td><img src={item.info.characterImage} alt={`${item.info.name} 이미지`}/></td>
                            <td>{item.info.name}</td>
                            <td>{item.info.job}</td>
                            <td>{item.info.level}</td>
                            <td>{item.info.combatPower?.toLocaleString() || 0}</td>
                            <td>{item.info.unionLevel}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default RankingPage;
