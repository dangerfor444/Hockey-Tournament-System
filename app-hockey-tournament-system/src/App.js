import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import RegistrationPage from './pages/RegistrationPage';
import AccountPage from './pages/AccountPage';
import TournamentsPage from './pages/TournamentsPage';
import TournamentsAcceptPage from './pages/TournamentsAcceptPage';
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
          </Routes>
        </div>
      </Router>
  );
}

export default App;