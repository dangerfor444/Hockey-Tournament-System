import React, { useState, useEffect } from 'react';
import '../styles/TournamentsAcceptPage.css';
import Navbar from '../components/navbar';

const TournamentsAcceptPage = () => {
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState('');
  const [pendingParticipants, setPendingParticipants] = useState([]);
  const [acceptedParticipants, setAcceptedParticipants] = useState([]);
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
        headers: { 'Authorization': `Bearer ${token}` }
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
    }
  };

  
  useEffect(() => {
    if (!selectedTournamentId) {
      setPendingParticipants([]);
      setAcceptedParticipants([]);
      return;
    }
    fetchParticipants(selectedTournamentId);
  }, [selectedTournamentId]);

  const fetchParticipants = async (tournamentId) => {
    try {
      const response = await fetch(
        `http://89.232.177.107/ApiV1/Tournaments/${tournamentId}/Participants`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!response.ok) {
        throw new Error(`Ошибка при получении заявок: ${response.status}`);
      }
      const data = await response.json();
      setPendingParticipants(data.filter(p => !p.isAccepted));
      setAcceptedParticipants(data.filter(p => p.isAccepted));
    } catch (err) {
      console.error(err);
    }
  };

  const handleAccept = async (participantId) => {
    try {
      const response = await fetch(
        `http://89.232.177.107/ApiV1/Tournaments/${selectedTournamentId}/Participants/${participantId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isAccepted: true })
        }
      );
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!response.ok) {
        throw new Error(`Ошибка при подтверждении заявки: ${response.status}`);
      }

      
      setPendingParticipants(prev => prev.filter(p => p.id !== participantId));
      const accepted = pendingParticipants.find(p => p.id === participantId);
      if (accepted) {
        setAcceptedParticipants(prev => [
          ...prev,
          { ...accepted, isAccepted: true }
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleExclude = async (participantId) => {
    try {
      const response = await fetch(
        `http://89.232.177.107/ApiV1/Tournaments/${selectedTournamentId}/Participants/${participantId}`,
        {
          method: 'PATCH',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ isAccepted: false })
        }
      );
      if (response.status === 401) {
        handleUnauthorized();
        return;
      }
      if (!response.ok) {
        throw new Error(`Ошибка при исключении участника: ${response.status}`);
      }

      
      setAcceptedParticipants(prev => prev.filter(p => p.id !== participantId));
      const removed = acceptedParticipants.find(p => p.id === participantId);
      if (removed) {
        setPendingParticipants(prev => [
          ...prev,
          { ...removed, isAccepted: false }
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="tournaments-accept-page">
      <Navbar />
      <h2>Согласование заявок на турнир</h2>
      <div className="form-group">
        <label>Выберите турнир:</label>
        <select
          value={selectedTournamentId}
          onChange={e => setSelectedTournamentId(e.target.value)}
        >
          <option value="">-- Выберите турнир --</option>
          {tournaments.map(t => (
            <option key={t.id} value={t.id}>
              {t.title}
            </option>
          ))}
        </select>
      </div>

      {selectedTournamentId && (
        <div className="participants-lists">
          <section className="pending-section">
            <h3>Ожидают подтверждения:</h3>
            {pendingParticipants.length > 0 ? (
              <ul>
                {pendingParticipants.map(p => (
                  <li key={p.id}>
                    {p.lastName} {p.firstName} {p.middleName}{' '}
                    <button type="button" onClick={() => handleAccept(p.id)}>
                      Принять
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет заявок на подтверждение</p>
            )}
          </section>

          <section className="accepted-section">
            <h3>Подтверждённые участники:</h3>
            {acceptedParticipants.length > 0 ? (
              <ul>
                {acceptedParticipants.map(p => (
                  <li key={p.id}>
                    {p.lastName} {p.firstName} {p.middleName}{' '}
                    <button type="button" onClick={() => handleExclude(p.id)}>
                      Исключить
                    </button>
                  </li>
                ))}
              </ul>
            ) : (
              <p>Нет подтверждённых участников</p>
            )}
          </section>
        </div>
      )}
    </div>
  );
};

export default TournamentsAcceptPage;
