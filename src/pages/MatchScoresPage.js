import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/navbar';
import TournamentSelector from '../components/TournamentSelector';
import TourSelector from '../components/TourSelector';
import MatchList from '../components/MatchList';
import '../styles/MatchScoresPage.css';

const MatchScoresPage = () => {
  const navigate = useNavigate();
  
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournamentId, setSelectedTournamentId] = useState('');
  const [tours, setTours] = useState([]);
  const [selectedTourId, setSelectedTourId] = useState('');
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const checkAdminPermission = () => {
      const userDataStr = localStorage.getItem('userData');
      if (!userDataStr) {
        navigate('/');
        return false;
      }

      try {
        const userData = JSON.parse(userDataStr);
        if (!userData.role || userData.role.id !== 1) {
          navigate('/account');
          return false;
        }
        return true;
      } catch (e) {
        console.error('Ошибка при проверке прав доступа:', e);
        navigate('/');
        return false;
      }
    };

    const hasPermission = checkAdminPermission();
    if (hasPermission) {
      fetchTournaments();
    }
  }, [navigate]);

  const fetchTournaments = async () => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      
      const response = await fetch('http://89.232.177.107/ApiV1/Tournaments', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Ошибка при получении турниров: ${response.status}`);
      }
      
      const data = await response.json();
      setTournaments(data);
    } catch (err) {
      console.error(err);
      setError(`Ошибка при загрузке турниров: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchTours = async (tournamentId) => {
    setLoading(true);
    setSelectedTourId('');
    setMatches([]);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      
      const response = await fetch(`http://89.232.177.107/ApiV1/Tournaments/${tournamentId}/Tours`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Ошибка при получении туров: ${response.status}`);
      }
      
      const data = await response.json();
      const formattedTours = data.map((tour, index) => ({
        id: tour.id,
        name: `Тур ${index + 1}`,
        matchesCount: tour.matchesCount,
        membersCount: tour.membersCount,
        startTime: tour.startTime,
        endTime: tour.endTime
      }));
      
      setTours(formattedTours);
    } catch (err) {
      console.error(err);
      setError(`Ошибка при загрузке туров: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const fetchMatches = async (tournamentId, tourId) => {
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/');
        return;
      }
      
      const response = await fetch(`http://89.232.177.107/ApiV1/Tournaments/${tournamentId}/Tours/${tourId}/Matches`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (response.status === 401) {
        localStorage.removeItem('token');
        navigate('/');
        return;
      }
      
      if (!response.ok) {
        throw new Error(`Ошибка при получении матчей: ${response.status}`);
      }
      
      const data = await response.json();
      
      const formattedMatches = data.map((match, index) => {
        const team1 = match.teams[0] || { members: [] };
        const team2 = match.teams.length > 1 ? match.teams[1] : { members: [] };
        

        const matchNumber = index + 1;
        const team1Name = `Команда ${matchNumber * 2 - 1}`;
        const team2Name = `Команда ${matchNumber * 2}`;
        
        return {
          id: match.id,
          team1Name: team1Name,
          team2Name: team2Name,
          team1Score: 0, 
          team2Score: 0,
          dateTime: match.startTime,
          endTime: match.endTime,
          teams: match.teams 
        };
      });
      
      setMatches(formattedMatches);
    } catch (err) {
      console.error(err);
      setError(`Ошибка при загрузке матчей: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  const handleTournamentChange = (tournamentId) => {
    setSelectedTournamentId(tournamentId);
    if (tournamentId) {
      fetchTours(tournamentId);
    } else {
      setTours([]);
      setSelectedTourId('');
      setMatches([]);
    }
  };

  const handleTourChange = (tourId) => {
    setSelectedTourId(tourId);
    if (tourId && selectedTournamentId) {
      fetchMatches(selectedTournamentId, tourId);
    } else {
      setMatches([]);
    }
  };

  const handleSaveScore = async (matchId, team1Score, team2Score) => {
    setMatches(prevMatches =>
      prevMatches.map(match =>
        match.id === matchId
          ? { ...match, team1Score, team2Score }
          : match
      )
    );
    
    alert(`Счёт матча успешно обновлен: ${team1Score}:${team2Score}`);
  };

  return (
    <div className="match-scores-page">
      <Navbar />
      <main className="content">
        <h1>Редактирование счетов матчей</h1>
        
        {loading ? (
          <div className="loading">Загрузка...</div>
        ) : (
          <>
            {error && <div className="error-message">{error}</div>}
            
            <div className="selectors-container">
              <TournamentSelector
                tournaments={tournaments}
                selectedTournamentId={selectedTournamentId}
                onTournamentChange={handleTournamentChange}
              />

              {selectedTournamentId && (
                <TourSelector
                  tours={tours}
                  selectedTourId={selectedTourId}
                  onTourChange={handleTourChange}
                />
              )}
            </div>

            {selectedTourId && (
              <MatchList
                matches={matches}
                onSaveScore={handleSaveScore}
              />
            )}
          </>
        )}
      </main>
    </div>
  );
};

export default MatchScoresPage; 