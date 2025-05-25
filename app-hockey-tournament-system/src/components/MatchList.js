import React from 'react';
import MatchScoreEditor from './MatchScoreEditor';

const MatchList = ({ matches, onSaveScore }) => {
  if (!matches || matches.length === 0) {
    return <div className="no-matches">Матчи не найдены</div>;
  }

  return (
    <div className="match-list">
      <h3>Матчи</h3>
      {matches.map(match => (
        <MatchScoreEditor 
          key={match.id} 
          match={match} 
          onSaveScore={onSaveScore} 
        />
      ))}
    </div>
  );
};

export default MatchList; 