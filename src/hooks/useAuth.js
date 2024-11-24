import {useState, useEffect} from 'react';
import axios from 'axios';

export const useAuth = () => {
    const [username, setUsername] = useState(localStorage.getItem('username')); // 로그인한 유저의 이름

    // 페이지가 로드될 때 로컬 스토리지에 저장된 username을 가져옴
    useEffect(() => {
        const storedUsername = localStorage.getItem('username'); // 로컬 스토리지에 저장된 username을 가져옴
        if (storedUsername) {
            setUsername(storedUsername);
        }
    }, []);

    // 로그인한 유저의 이름을 변경
    const handleLogin = (newUsername) => {
        setUsername(newUsername);
    };

    // 로컬 스토리지에 저장된 정보를 삭제하여 로그아웃
    const handleLogout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('username');
        localStorage.removeItem('session');
        setUsername(null);
        window.location.reload(); // 페이지 새로고침
    };

    // 로그인 처리
    const handleCallback = async (code) => {
        try {
            // 백엔드에 code를 보내 로그인 처리
            const backendResponse = await axios.get(`${import.meta.env.VITE_DEFAULT_API_URI}/login?code=${code}`);
            const {accessToken, refreshToken, username, session} = backendResponse.data; // 백엔드에서 받은 응답

            // 로컬 스토리지에 토큰과 유저 정보를 저장
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
            localStorage.setItem('username', username);
            localStorage.setItem('session', session);

            setUsername(username); // 유저 이름 변경
            window.location.reload(); // 페이지 새로고침
        } catch (error) {
            console.error('Error sending code to backend:', error);
            alert(`${error.response.data.message}`);
        }
    };

    return {
        username,
        handleLogin,
        handleLogout,
        handleCallback,
    };
};
