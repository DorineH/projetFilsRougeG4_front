import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './page/HomePage';
import GamesPage from './page/GamesPage';
import { CssBaseline, GlobalStyles, ThemeProvider } from '@mui/material';
import { theme } from './components/css/palette';
import LoginPage from './page/LoginPage';
import SignupPage from './page/SignupPage';
import ProfilPage from './page/ProfilPage';
import { AuthProvider } from './AuthContext';
import ScorePage from './page/ScorePage';
import GameComponent from './components/GameComponent';

function App() {
    return (
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <GlobalStyles styles={{ body: { backgroundColor: theme.palette.background.default, margin: 0, padding: 0, minHeight: '100vh' } }} />
            <Routes>
                <Route path='/home' element={<HomePage />} />
                <Route path='/games' element={<GamesPage />} />
                <Route path='/login' element={<LoginPage />} />
                <Route path='/signup' element={<SignupPage />} />
                <Route path='/profil' element={<ProfilPage />} />
                <Route path='/score' element={<ScorePage />} />
                <Route path='/game' element={<GameComponent />} />
            </Routes>

        </ThemeProvider>

    );
};

export default App;
