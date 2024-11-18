import React, { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter, Routes, Route, useSearchParams } from 'react-router-dom';
import { GoogleOAuthProvider } from '@react-oauth/google';
import App from './components/App';
import HomePage from './pages/HomePage';
import { useAuth } from './hooks/useAuth';

const Callback = () => {
    const [searchParams] = useSearchParams();
    const code = searchParams.get('code');
    const { handleCallback } = useAuth();

    useEffect(() => {
        if (code) {
            handleCallback(code);
        }
    }, [code, handleCallback]);

    return <div>로그인 중...</div>;
};

function Main() {
    return (
        <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
            <App>
                <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/ranking" element={<div>랭킹 페이지</div>} />
                    <Route path="/statistics" element={<div>통계 페이지</div>} />
                    <Route path="/profile" element={<div>내 정보 페이지</div>} />
                    <Route path="/callback" element={<Callback />} />
                </Routes>
            </App>
        </BrowserRouter>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Main />
        </GoogleOAuthProvider>
    </React.StrictMode>
);
