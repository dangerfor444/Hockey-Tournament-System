import React from 'react';
import { Link } from 'react-router-dom';
import img from '../img/avtospartak-logo.png';

const Navbar = () => {
  const userDataStr = localStorage.getItem('userData');
  let participantsRoute = '/tournaments';
  let isAdmin = false;

  if (userDataStr) {
    try {
      const userData = JSON.parse(userDataStr);
      if (userData.role && userData.role.id === 1) {
        participantsRoute = '/tournaments-accept';
        isAdmin = true;
      }
    } catch (e) {
      console.error('Не удалось распарсить userData из localStorage', e);
    }
  }

  return (
    <header className="header">
      <img src={img} alt="Логотип" />
      <nav className="navigation">
        <ul>
          <li>
            <Link to={participantsRoute}>Участники турнира</Link>
          </li>
          <li>
            <Link to="/rankings">Рейтинг игроков</Link>
          </li>
          {isAdmin && (
            <li>
              <Link to="/match-scores">Матчи</Link>
            </li>
          )}
          <li>
            <Link to="/account">Личный кабинет</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
