import React, { useState, useEffect } from 'react';
import '../styles/AccountPage.css';

import avatar from '../img/png-avatar.png';
import { IoIosSettings } from "react-icons/io";
import AdminInterface from '../components/AdminInterface';
import Navbar from '../components/navbar';

const AccountPage = () => {
    const [isEditing, setIsEditing] = useState(false);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        middleName: '',
        birthDate: '',
        email: '',
        phone: '',
        sportLevel: '',
        role: { id: null },
        rating: 0
    });

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');
        if (storedUserData) {
            const parsedData = JSON.parse(storedUserData);
            setUserData(parsedData);
        }
    }, []);

    const toggleEditing = () => {
        setIsEditing(!isEditing);
    };

    const handleLogout = async () => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                window.location.href = '/';
                return;
            }

            const response = await fetch('http://89.232.177.107/ApiV1/Auth/Logout', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                localStorage.removeItem('token');
                localStorage.removeItem('userData');
                window.location.href = '/';
            } else {
                throw new Error('Logout failed');
            }
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    if (!userData.firstName) {
        return <div>Loading...</div>;
    }

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('ru-RU');
    };

    const token = localStorage.getItem('token'); 

    return (
        <div className="account-page">
            <Navbar />
            <main className="content">
                <h1>Личный кабинет</h1>
                <div className="profile-container">
                    <div className="profile-left">
                        <div className="avatar-section">
                            <div className="avatar-info-container">
                                <img src={avatar} alt="Аватар пользователя" className="avatar-circle" />
                                <div className="user-quick-info">
                                    <h2 className="user-full-name">{`${userData.lastName} ${userData.firstName} ${userData.middleName}`}</h2>
                                    <p className="user-birth-date">Дата рождения: {formatDate(userData.birthDate)}</p>
                                    <p className="user-email">Email: {userData.email || ''}</p>
                                    <p className="user-rating">Текущий рейтинг: <strong>{userData.rating || 0}</strong></p>
                                </div>
                            </div>
                            <div className="edit-profile-container">
                                <button 
                                    className="edit-profile-btn"
                                    onClick={toggleEditing}
                                >
                                    {isEditing ? 'Скрыть редактирование' : 'Редактировать профиль'}
                                    <IoIosSettings className='edit-icon' />
                                </button>
                                <button 
                                    className="logout-btn"
                                    onClick={handleLogout}
                                >
                                    Выйти из аккаунта
                                </button>
                            </div>
                        </div>
                        {isEditing && (
                            <div className="user-info">
                                <div className="form-group">
                                    <label htmlFor="name">Имя</label>
                                    <input 
                                        type="text"
                                        id="name"
                                        value={userData.firstName || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="lastName">Фамилия</label>
                                    <input
                                        type="text"
                                        id="lastName" 
                                        value={userData.lastName || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="patronymic">Отчество</label>
                                    <input
                                        type="text"
                                        id="patronymic"
                                        value={userData.middleName || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="phone">Телефон</label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        value={userData.phone || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input
                                        type="text"
                                        id="email"
                                        value={userData.email || ''}
                                        readOnly
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="level">Уровень подготовки</label>
                                    <input
                                        type="text"
                                        id="level"
                                        value={userData.sportLevel || ''}
                                        readOnly
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    {userData.role.id !== 0 && 
                        <AdminInterface 
                            token={token} 
                        />
                    }
                </div>
            </main>
        </div>
    );
};

export default AccountPage;