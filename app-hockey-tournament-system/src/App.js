import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import AuthorizationPage from './pages/AuthorizationPage';
import RegistrationPage from './pages/RegistrationPage';
function App() {
  return (

      <Router>
        <div className="App">
          <Routes>
            <Route path="/" element={<AuthorizationPage />} />     
            <Route path="/registration" element={<RegistrationPage />} />
          </Routes>
        </div>
      </Router>
  );
}

export default App;