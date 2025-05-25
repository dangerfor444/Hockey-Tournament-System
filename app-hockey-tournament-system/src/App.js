import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import RegistrationPage from './pages/RegistrationPage';
import AccountPage from './pages/AccountPage';
import TournamentsPage from './pages/TournamentsPage';
import TournamentsAcceptPage from './pages/TournamentsAcceptPage';
import PlayerRankingsPage from './pages/PlayerRankingsPage';
import MatchScoresPage from './pages/MatchScoresPage';

function App() {
  return (

      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AuthorizationPage />} />     
            <Route path="/registration" element={<RegistrationPage />} />
            <Route path="/account" element={<AccountPage />} />
            <Route path="/tournaments" element={<TournamentsPage />} />
            <Route path="/tournaments-accept" element={<TournamentsAcceptPage />} />
            <Route path="/rankings" element={<PlayerRankingsPage />} />
            <Route path="/match-scores" element={<MatchScoresPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;