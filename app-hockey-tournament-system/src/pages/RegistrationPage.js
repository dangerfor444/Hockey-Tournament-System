import React from 'react';
import '../styles/RegistrationPage.css';
import logo from '../img/avtospartak-logo.png';
import img from '../img/Hockey2.jpg';

const RegistrationPage = () => {
    return (
        <div className="registration-page">
            <header className="logo-container2">
                <img src={logo} alt="Logo" />
            </header>
            <div className="content-container-reg">
                <div className="gray-box2">
                    <div className="img-box-reg">
                        <img src={img} alt="img" />
                    </div>
                </div>
                <div className="registration-form">
                    <h2>Регистрация</h2>
                    <p>Создайте ваш личный кабинет</p>
                    <form>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="firstName">Имя</label>
                                <input type="text" id="firstName" placeholder="Введите имя" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="lastName">Фамилия</label>
                                <input type="text" id="lastName" placeholder="Введите фамилию" />
                            </div>
                        </div>
                        <div className="form-row">
                            <div className="form-group">
                                <label htmlFor="patronymic">Отчество</label>
                                <input type="text" id="patronymic" placeholder="Введите отчество" />
                            </div>
                            <div className="form-group">
                                <label htmlFor="phone">Номер телефона</label>
                                <input type="tel" id="phone" placeholder="+7 (999) 999-99-99" />
                            </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email</label>
                            <input type="email" id="email" placeholder="Введите email" />
                        </div>
                        <div className="form-group gender-group">
                            <label>Пол</label>
                            <div className="gender-group-options">
                                <div className="gender-group-option">
                                <input type="radio" id="male" name="gender" value="male" />
                                <label htmlFor="male">Мужской</label>
                            </div>
                            <div className="gender-group-option">
                                <input type="radio" id="female" name="gender" value="female" />
                                <label htmlFor="female">Женский</label>
                            </div>
                        </div>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <input type="password" id="password" placeholder="Введите пароль" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirmPassword">Подтвердите пароль</label>
                            <input type="password" id="confirmPassword" placeholder="Подтвердите пароль" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="preparationLevel">Ваш уровень подготовки</label>
                            <select id="preparationLevel">
                                <option value="novice">Новичок</option>
                                <option value="intermediate">Средний уровень</option>
                                <option value="expert">Мастер</option>
                            </select>
                        </div>
                        <button type="submit">Создать аккаунт</button>
                    </form>
                    <div className="login-link">
                        <span>Есть аккаунт? </span>
                        <a className="login-link-a" href="/">Войти</a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;