import React from 'react';
import {Outlet} from 'react-router-dom';
import NavBar from './NavBar';
import '../styles/App.css';
import '../style.css';

function App() {
    return (
        <div className="app-container">
            <NavBar/>
            <main>
                <Outlet/>
            </main>
            <footer className="footer">
                <img src="/footer.svg" alt="Footer Image"/>
            </footer>
        </div>
    );
}

export default App;
