import React from 'react';
import '../styles/AccountPage.css';

const AccountPage = () => {
    return (
        <div className="account-page">
            <header className="header">
                <div className="logo">LOGO</div>
                <nav className="navigation">
                    <ul>
                        <li>Главная</li>
                        <li>Таблица турнира</li>
                        <li>Партнеры НХЛ</li>
                        <li className="active">Личный кабинет</li>
                        <li>Админ</li>
                    </ul>
                </nav>
            </header>
            <main className="content">
                <h1>Личный кабинет</h1>
                <div className="user-info">
                    <div className="form-group">
                        <label htmlFor="firstName">Имя</label>
                        <input type="text" id="firstName" value="Имя" readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Фамилия</label>
                        <input type="text" id="lastName" value="Фамилия" readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="patronymic">Отчество</label>
                        <input type="text" id="patronymic" value="Отчество" readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Номер телефона</label>
                        <input type="tel" id="phone" value="+7 (999) 999-99-99" readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" value="example@gmail.com" readOnly />
                    </div>
                    <div className="form-group">
                        <label htmlFor="preparationLevel">Уровень подготовки</label>
                        <select id="preparationLevel" value="Новичок" disabled>
                            <option value="novice">Новичок</option>
                            <option value="intermediate">Средний уровень</option>
                            <option value="expert">Мастер</option>
                        </select>
                    </div>
                </div>
                <div className="chart">
                    <h2>График прогресса</h2>
                    {/* Placeholder for chart component */}
                    <div className="chart-placeholder">[График]</div>
                </div>
                <div className="tournament-info">
                    <h2>Записи турниров</h2>
                    <ul>
                        <li>Турнир 1 - 20.03.2023 - 10:00</li>
                        <li>Турнир 2 - 25.03.2023 - 12:00</li>
                        <li>Турнир 3 - 30.03.2023 - 14:00</li>
                    </ul>
                </div>
            </main>
        </div>
    );
};

export default AccountPage;
