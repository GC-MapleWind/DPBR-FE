import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import App from './components/App';
import MyPage from "./pages/MyPage.jsx";
import HomePage from './pages/HomePage';
import './style.css';

function Main() {
    return (
        <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="ranking" element={<div>랭킹 페이지</div>}/>
                    <Route path="my-page" element={<MyPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Main/>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
