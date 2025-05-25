import React from 'react';

const TournamentSelector = ({ tournaments, selectedTournamentId, onTournamentChange }) => {
  return (
    <div className="tournament-selector">
      <h3>Выберите турнир</h3>
      <select 
        value={selectedTournamentId} 
        onChange={(e) => onTournamentChange(e.target.value)}
      >
        <option value="">-- Выберите турнир --</option>
        {tournaments.map(tournament => (
          <option key={tournament.id} value={tournament.id}>
            {tournament.title}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TournamentSelector; 