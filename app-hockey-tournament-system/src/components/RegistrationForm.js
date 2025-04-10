// RegistrationForm.js
import React, { useState } from 'react';

const RegistrationForm = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        phone: '',
        email: '',
        password: '',
        confirmPassword: '',
        gender: '',
        preparationLevel: 'novice',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value, type } = e.target;
        setFormData({
            ...formData,
            [id]: type === 'radio' ? e.target.value : value, 
        });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "Имя обязательно";
        if (!formData.lastName) newErrors.lastName = "Фамилия обязательна";
        if (!formData.phone.match(/^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/)) {
            newErrors.phone = "Введите корректный номер телефона";
        }
        if (!formData.email.includes('@')) newErrors.email = "Введите корректный email";
        if (formData.password.length < 6) newErrors.password = "Пароль должен содержать минимум 6 символов";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Пароли не совпадают";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const handleSubmit = (e) => {
        e.preventDefault(); 
        if (validate()) {
            console.log('Form submitted successfully:', formData);

        }
    };

    return (
        <div className="registration-form">
            <h2>Регистрация</h2>
            <p>Создайте ваш личный кабинет</p>
            <form onSubmit={handleSubmit}>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="firstName">Имя</label>
                        <input 
                            type="text" 
                            id="firstName" 
                            placeholder="Введите имя" 
                            value={formData.firstName}
                            onChange={handleChange}
                        />
                        {errors.firstName && <span className="error">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="lastName">Фамилия</label>
                        <input 
                            type="text" 
                            id="lastName" 
                            placeholder="Введите фамилию" 
                            value={formData.lastName}
                            onChange={handleChange}
                        />
                        {errors.lastName && <span className="error">{errors.lastName}</span>}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="patronymic">Отчество</label>
                        <input 
                            type="text" 
                            id="patronymic"
                            placeholder="Введите отчество"
                            value={formData.patronymic}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="phone">Номер телефона</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            placeholder="+7 (999) 999-99-99" 
                            value={formData.phone}
                            onChange={handleChange}
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder="Введите email" 
                        value={formData.email}
                        onChange={handleChange}
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group gender-group">
                    <label>Пол</label>
                    <div className="gender-group-options">
                        <div className="gender-group-option">
                            <input 
                                type="radio" 
                                id="male" 
                                name="gender" 
                                value="male" 
                                onChange={handleChange}
                            />
                            <label htmlFor="male">Мужской</label>
                        </div>
                        <div className="gender-group-option">
                            <input 
                                type="radio" 
                                id="female" 
                                name="gender" 
                                value="female" 
                                onChange={handleChange}
                            />
                            <label htmlFor="female">Женский</label>
                        </div>
                    </div>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Пароль</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder="Введите пароль" 
                        value={formData.password}
                        onChange={handleChange}
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="confirmPassword">Подтвердите пароль</label>
                    <input 
                        type="password" 
                        id="confirmPassword" 
                        placeholder="Подтвердите пароль" 
                        value={formData.confirmPassword}
                        onChange={handleChange}
                    />
                    {errors.confirmPassword && <span className="error">{errors.confirmPassword}</span>}
                </div>
                <div className="form-group">
                    <label htmlFor="preparationLevel">Ваш уровень подготовки</label>
                    <select 
                        id="preparationLevel" 
                        value={formData.preparationLevel} 
                        onChange={handleChange}
                    >
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
    );
};

export default RegistrationForm;