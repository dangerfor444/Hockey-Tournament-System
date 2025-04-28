import React from 'react';
import '../styles/AccountPage.css';


const PlayerRanking = () => {
    return (
        <div className="profile-right">
        <div className="player-ranking">
            <h2>Ваш текущий рейтинг</h2>
            <p>Текущий рейтинг: <strong>1200</strong></p>
            <p>Последний матч: <strong>Победа</strong></p>
            <p>Всего матчей: <strong>25</strong></p>
            <p>Побед: <strong>15</strong></p>
            <p>Поражений: <strong>10</strong></p>
        </div>
        <div className="tournament-info">
            <h2>Расписание ваших матчей</h2>
            <div className="tournament-list">
                {[
                    { name: "Матч 1", date: "20.03.2023", time: "10:00" },
                    { name: "Матч 2", date: "25.03.2023", time: "12:00" },
                    { name: "Матч 3", date: "30.03.2023", time: "14:00" }
                ].map((match, index) => (
                    <div key={index} className="tournament-item">
                        <span>{match.name}</span>
                        <span>{match.date}</span>
                        <span>{match.time}</span>
                    </div>
                ))}
            </div>
        </div>
    </div>
    );
};

export default PlayerRanking;