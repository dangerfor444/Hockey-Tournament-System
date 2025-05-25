import React, { useState, useEffect } from 'react';
import '../styles/TournamentsPage.css';
import Navbar from '../components/navbar';

const TournamentsPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedId, setSelectedId] = useState('');
  const [message, setMessage] = useState('');

  const token = localStorage.getItem('token');

  const handleUnauthorized = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };

  useEffect(() => {
    if (!token) {
      handleUnauthorized();
      return;
    }
    fetchTournaments();
  }, [token]);

  const fetchTournaments = async () => {
    try {
      const response = await fetch('http://89.232.177.107/ApiV1/Tournaments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!response.ok) {
        throw new Error(`Ошибка при получении турниров: ${response.status}`);
      }
      const data = await response.json();
      setTournaments(data);
    } catch (err) {
      console.error(err);
      setMessage('Ошибка при загрузке турниров: ' + err.message);
    }
  };

  const handleSelect = e => {
    setSelectedId(e.target.value);
    setMessage('');
  };

  const handleRegister = async () => {
    if (!selectedId) return;
    try {
      const response = await fetch(
        `http://89.232.177.107/ApiV1/Tournaments/${selectedId}/Participants`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      if (response.status === 401) {
        handleUnauthorized();
        return;
      }


      let responseData;
      try {
        responseData = await response.json();
      } catch (parseErr) {
        console.error(parseErr);
        if (parseErr.message.includes('Unexpected token')) {
          setMessage('Вы уже отправили заявку на турнир');
          return;
        } else { 
          throw parseErr;
        }
      }

      if (!response.ok) {
        throw new Error(`Ошибка регистрации: ${response.status}`);
      }

      setTournaments(prev => prev.filter(t => t.id !== selectedId));
      setMessage('Заявка отправлена и ждёт согласования');
      setSelectedId('');
    } catch (err) {
      console.error(err);
      setMessage('Ошибка при регистрации: ' + err.message);
    }
  };

  const selectedTournament = tournaments.find(t => t.id === selectedId);
  const formatDate = iso =>
    iso ? new Date(iso).toLocaleDateString('ru-RU') : '';

  return (
    <div className="tournaments-page">
      <Navbar />
      <h2>Запись на турниры</h2>

      {tournaments.length > 0 ? (
        <>
          <div className="form-group">
            <label>Выберите турнир:</label>
            <select value={selectedId} onChange={handleSelect}>
              <option value="">-- Выберите турнир --</option>
              {tournaments.map(t => (
                <option key={t.id} value={t.id}>
                  {t.title}
                </option>
              ))}
            </select>
          </div>

          {selectedTournament && (
            <div className="tournament-details">
              <h3>{selectedTournament.title}</h3>
              <p>{selectedTournament.description}</p>
              <p>Начало: {formatDate(selectedTournament.startTime)}</p>
              <button onClick={handleRegister}>Записаться</button>
            </div>
          )}
        </>
      ) : (
        <p>Нет доступных турниров</p>
      )}

      {message && <p className="info-message">{message}</p>}
    </div>
  );
};

export default TournamentsPage;