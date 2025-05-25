import React, { useState } from 'react';
import MatchDetailsModal from './MatchDetailsModal';

const MatchScoreEditor = ({ match, onSaveScore }) => {
  const [team1Score, setTeam1Score] = useState(match.team1Score);
  const [team2Score, setTeam2Score] = useState(match.team2Score);
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

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

  const handleSaveScore = () => {
    onSaveScore(match.id, parseInt(team1Score), parseInt(team2Score));
    setIsEditing(false);
  };

  const handleTeamClick = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="match-card">
        <div className="match-info">
          <div className="match-teams">
            <div className="team" onClick={handleTeamClick}>{match.team1Name}</div>
            <div className="vs">vs</div>
            <div className="team" onClick={handleTeamClick}>{match.team2Name}</div>
          </div>
          <div className="match-date">{formatDate(match.dateTime)}</div>
        </div>

        <div className="match-score">
          {isEditing ? (
            <div className="score-editor">
              <input
                type="number"
                min="0"
                value={team1Score}
                onChange={(e) => setTeam1Score(e.target.value)}
              />
              <span className="score-separator">:</span>
              <input
                type="number"
                min="0" 
                value={team2Score}
                onChange={(e) => setTeam2Score(e.target.value)}
              />
              <div className="buttons-row">
                <button className="save-score-btn btn-fixed-width" onClick={handleSaveScore}>
                  Сохранить
                </button>
                <button className="cancel-btn btn-fixed-width" onClick={() => setIsEditing(false)}>
                  Отмена
                </button>
              </div>
            </div>
          ) : (
            <div className="score-display">
              <div className="score">
                <span>{match.team1Score}</span>
                <span className="score-separator">:</span>
                <span>{match.team2Score}</span>
              </div>
              <button className="edit-score-btn" onClick={() => setIsEditing(true)}>
                Изменить счёт
              </button>
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <MatchDetailsModal match={match} onClose={closeModal} />
      )}
    </>
  );
};

export default MatchScoreEditor; 