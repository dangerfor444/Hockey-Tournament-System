import React from 'react';

const MatchDetailsModal = ({ match, onClose }) => {
  if (!match) return null;

  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric', 
      hour: '2-digit', 
      minute: '2-digit' 
    };
    return new Date(dateString).toLocaleDateString('ru-RU', options);
  };

  // Вытаскиваем номера команд из названий (например, "Команда 1" -> "1")
  const getTeamNumber = (teamName) => {
    const match = teamName.match(/\d+/);
    return match ? match[0] : '';
  };

  const team1Number = getTeamNumber(match.team1Name);
  const team2Number = getTeamNumber(match.team2Name);

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2>Информация о матче</h2>
          <button className="modal-close-btn" onClick={onClose}>×</button>
        </div>
        
        <div className="modal-body">
          <div className="match-details">
            <div className="match-time">
              <p><strong>Начало матча:</strong> {formatDate(match.dateTime)}</p>
              {match.endTime && (
                <p><strong>Конец матча:</strong> {formatDate(match.endTime)}</p>
              )}
            </div>
            
            <div className="match-score-info">
              <p className="current-score"><strong>Текущий счёт: </strong> 
                <span className="score-value">{match.team1Score} : {match.team2Score}</span>
              </p>
            </div>
            
            <div className="teams-container">
              <div className="team-details">
                <h3>Команда {team1Number}</h3>
                <ul className="players-list">
                  {match.teams[0].members.map(player => (
                    <li key={player.memberId} className="player-item">
                      <span className="player-name">{player.lastName} {player.firstName} {player.middleName}</span>
                      <span className="player-rating">Рейтинг: {player.ratingOnTournament}</span>
                    </li>
                  ))}
                </ul>
              </div>
              
              <div className="vs-divider">VS</div>
              
              <div className="team-details">
                <h3>Команда {team2Number}</h3>
                {match.teams.length > 1 ? (
                  <ul className="players-list">
                    {match.teams[1].members.map(player => (
                      <li key={player.memberId} className="player-item">
                        <span className="player-name">{player.lastName} {player.firstName} {player.middleName}</span>
                        <span className="player-rating">Рейтинг: {player.ratingOnTournament}</span>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p>Информация о второй команде отсутствует</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MatchDetailsModal; 