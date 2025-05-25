import React, { useState } from 'react';
import '../styles/PlayerRankingsPage.css';
import Navbar from '../components/navbar';

const PlayerRankingsPage = () => {
    const [players, setPlayers] = useState([]);
    const [genderFilter, setGenderFilter] = useState('male');
    const [minAge, setMinAge] = useState('');
    const [maxAge, setMaxAge] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleGenderFilterChange = (e) => {
        setGenderFilter(e.target.value);
    };

    const handleMinAgeChange = (e) => {
        setMinAge(e.target.value);
    };

    const handleMaxAgeChange = (e) => {
        setMaxAge(e.target.value);
    };

    const calculateAge = (birthDate) => {
        const today = new Date();
        const birth = new Date(birthDate);
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
            age--;
        }
        
        return age;
    };

    const fetchPlayers = async () => {
        if (!minAge || !maxAge) {
            setError('Укажите диапазон возраста');
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/';
                return;
            }

            const genderValue = genderFilter !== 'female';
            
            const url = `http://89.232.177.107/ApiV1/Users?ageFrom=${minAge}&ageTo=${maxAge}&page=1&pageSize=2147483647&gender=${genderValue}&orderBy=Rating&isAscending=false&roleId=0`;
            
            
            const response = await fetch(url, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.status === 401) {
                localStorage.removeItem('token');
                window.location.href = '/';
                return;
            }

            if (!response.ok) {
                throw new Error(`Ошибка при получении данных: ${response.status}`);
            }

            const data = await response.json();
            
            const filteredData = data.filter(player => player.role && player.role.id === 0);
            
            setPlayers(filteredData);
        } catch (err) {
            console.error(err);
            setError(`Ошибка при загрузке данных: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="player-rankings-page">
            <Navbar />
            <main className="content">
                <h1>Рейтинг игроков</h1>
                
                <div className="filters-container">
                    <div className="filter-group">
                        <label htmlFor="gender-filter">Пол:</label>
                        <select 
                            id="gender-filter" 
                            value={genderFilter} 
                            onChange={handleGenderFilterChange}
                        >
                            <option value="male">Мужской</option>
                            <option value="female">Женский</option>
                        </select>
                    </div>
                    
                    <div className="filter-group age-filter">
                        <div className="age-range">
                            <label htmlFor="min-age">Возраст от:</label>
                            <input 
                                type="number" 
                                id="min-age" 
                                value={minAge} 
                                onChange={handleMinAgeChange} 
                                min="0"
                                placeholder="От"
                            />
                        </div>
                        <div className="age-range">
                            <label htmlFor="max-age">до:</label>
                            <input 
                                type="number" 
                                id="max-age" 
                                value={maxAge} 
                                onChange={handleMaxAgeChange}
                                min={minAge || "0"}
                                placeholder="До"
                            />
                        </div>
                    </div>

                    <button className="apply-filters-button" onClick={fetchPlayers} disabled={isLoading}>
                        {isLoading ? 'Загрузка...' : 'Применить'}
                    </button>
                </div>
                
                {error && <div className="error-message">{error}</div>}
                
                <div className="table-container">
                    <table className="player-rankings-table">
                        <thead>
                            <tr>
                                <th>ФИО</th>
                                <th>Возраст</th>
                                <th>Рейтинг</th>
                            </tr>
                        </thead>
                        <tbody>
                            {players.length > 0 ? (
                                players.map(player => (
                                    <tr key={player.id}>
                                        <td>{`${player.lastName || ''} ${player.firstName || ''} ${player.middleName || ''}`}</td>
                                        <td>{calculateAge(player.birthDate)}</td>
                                        <td>{player.rating}</td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="3" className="no-players">
                                        {isLoading ? 'Загрузка...' : 'Игроки не найдены. Используйте фильтры и нажмите "Применить"'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
    );
};

export default PlayerRankingsPage; 