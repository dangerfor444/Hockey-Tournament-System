import React, { useState, useEffect } from 'react';

const AdminInterface = ({ token }) => {
    const [tournaments, setTournaments] = useState([]);
    const [newTournament, setNewTournament] = useState({
        title: '',
        description: '',
        startTime: ''
    });

    useEffect(() => {
        fetchTournaments();
    }, []);

    const fetchTournaments = async () => {
        try {
            if (!token) {
                console.error('No token found');
                return;
            }

            const response = await fetch('http://89.232.177.107/ApiV1/Tournaments', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            setTournaments(data);
        } catch (error) {
            console.error('Error fetching tournaments:', error);
        }
    };

    const handleCreateTournament = async (e) => {
        e.preventDefault();
        try {
            if (!token) {
                console.error('No token found');
                return;
            }

            const formattedTournament = {
                ...newTournament,
                startTime: new Date(newTournament.startTime).toISOString()
            };

            const response = await fetch('http://89.232.177.107/ApiV1/Tournaments', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify(formattedTournament)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
            }

            setNewTournament({
                title: '',
                description: '',
                startTime: ''
            });
            await fetchTournaments(); 
            alert('Турнир успешно создан!');
        } catch (error) {
            console.error('Error creating tournament:', error);
            alert('Ошибка при создании турнира: ' + error.message);
        }
    };

    const handleInputChange = (e, field) => {
        const value = e.target.value;
        setNewTournament(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };

    return (
        <div className="profile-right">
            <div className="create-tournament">
                <h2>Создать новый турнир</h2>
                <form onSubmit={handleCreateTournament}>
                    <div className="form-group">
                        <label>Название турнира</label>
                        <input
                            type="text"
                            value={newTournament.title}
                            onChange={(e) => handleInputChange(e, 'title')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Описание</label>
                        <textarea
                            value={newTournament.description}
                            onChange={(e) => handleInputChange(e, 'description')}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Дата начала</label>
                        <input
                            type="datetime-local"
                            value={newTournament.startTime}
                            onChange={(e) => handleInputChange(e, 'startTime')}
                            required
                        />
                    </div>
                    <button type="submit">Создать турнир</button>
                </form>
            </div>
            <div className="tournaments-list">
                <h2>Список турниров</h2>
                {tournaments.map(tournament => (
                    <div key={tournament.id} className="tournament-item">
                        <h3>{tournament.title}</h3>
                        <p>{tournament.description}</p>
                        <p>Начало: {formatDate(tournament.startTime)}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AdminInterface;