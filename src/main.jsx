import React from 'react';
import {createRoot} from 'react-dom/client';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import App from './components/App';
import MyPage from "./pages/MyPage.jsx";
import HomePage from './pages/HomePage';
import './style.css';
import CharacterPage from "./pages/CharacterPage.jsx";
import RankingPage from "./pages/RankingPage.jsx";

function Main() {
    return (
        <BrowserRouter future={{v7_startTransition: true, v7_relativeSplatPath: true}}>
            <Routes>
                <Route path="/" element={<App/>}>
                    <Route index element={<HomePage/>}/>
                    <Route path="ranking/:rankingName" element={<RankingPage/>}/>
                    <Route path="my-page" element={<MyPage/>}/>
                    <Route path="character/:characterName" element={<CharacterPage/>}/>
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

const container = document.getElementById('app');
const root = createRoot(container);

root.render(
    <React.StrictMode>
        {/*@react-oauth/google를 이용해 OAuth 구현*/}
        <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
            <Main/>
        </GoogleOAuthProvider>
    </React.StrictMode>
);
