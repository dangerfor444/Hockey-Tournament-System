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
        birthDate: '', 
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        const { id, value, type, name } = e.target;
        
        if (id === 'phone') {
            const phoneNumber = value.replace(/\D/g, '');
            
            if (phoneNumber.length <= 11) {
                setFormData({
                    ...formData,
                    [id]: phoneNumber
                });
            }
        } else if (type === 'radio' && name === 'gender') {
            setFormData({
                ...formData,
                [name]: value
            });
        } else {
            setFormData({
                ...formData,
                [id]: value
            });
        }
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.firstName) newErrors.firstName = "Имя обязательно";
        if (!formData.lastName) newErrors.lastName = "Фамилия обязательна";
        if (!formData.phone) {
            newErrors.phone = "Введите корректный номер телефона";
        } else if (formData.phone.length !== 11) {
            newErrors.phone = "Номер телефона должен содержать 11 цифр";
        }
        if (!formData.email.includes('@')) newErrors.email = "Введите корректный email";
        if (formData.password.length < 6) newErrors.password = "Пароль должен содержать минимум 6 символов";
        if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Пароли не совпадают";
        if (!formData.birthDate) newErrors.birthDate = "Дата рождения обязательна";
        if (!formData.gender) newErrors.gender = "Выберите пол";
        
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0; 
    };

    const loginUser = async (email, password) => {
        try {
            const loginResponse = await fetch('http://89.232.177.107/ApiV1/Auth/Login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            if (loginResponse.ok) {
                const token = await loginResponse.text();
                localStorage.setItem('token', token);
                return token;
            }
            return null;
        } catch (error) {
            console.error('Error during login:', error);
            return null;
        }
    };

    const fetchUserData = async (token) => {
        try {
            const response = await fetch('http://89.232.177.107/ApiV1/Users/Me', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            if (response.ok) {
                const userData = await response.json();
                localStorage.setItem('userData', JSON.stringify(userData));
                return userData;
            } else {
                console.error('Failed to fetch user data');
                return null;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            return null;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); 
        if (validate()) {
            try {
                const requestBody = {
                    firstName: formData.firstName,
                    middleName: formData.patronymic,
                    lastName: formData.lastName,
                    birthDate: formData.birthDate,
                    gender: formData.gender === 'male',
                    email: formData.email,
                    phone: formData.phone,
                    password: formData.password,
                    sportLevel: formData.preparationLevel
                };

                const registerResponse = await fetch('http://89.232.177.107/ApiV1/Auth/Register', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(requestBody)
                });

                if (registerResponse.ok) {
                    const token = await loginUser(formData.email, formData.password);
                    
                    if (token) {
                        const userData = await fetchUserData(token);
                        if (userData) {
                            window.location.href = '/account';
                        } else {
                            setErrors({
                                submit: 'Ошибка при получении данных пользователя'
                            });
                        }
                    } else {
                        setErrors({
                            submit: 'Ошибка при автоматической авторизации'
                        });
                    }
                } else {
                    const text = await registerResponse.text();
                    if (text) {
                        const errorData = JSON.parse(text);
                        console.error('Registration failed:', errorData);
                        if (errorData.errors && errorData.errors.Phone) {
                            setErrors({
                                phone: errorData.errors.Phone[0]
                            });
                        } else {
                            setErrors({
                                submit: 'Ошибка при регистрации. Пожалуйста, попробуйте снова.'
                            });
                        }
                    } else {
                        setErrors({
                            submit: 'Ошибка при регистрации. Нет данных от сервера.'
                        });
                    }
                }
            } catch (error) {
                console.error('Error during registration:', error);
                setErrors({
                    submit: 'Ошибка сервера. Пожалуйста, попробуйте позже.'
                });
            }
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
                        <label htmlFor="birthDate">Дата рождения</label>
                        <input 
                            type="date" 
                            id="birthDate"
                            value={formData.birthDate}
                            onChange={handleChange}
                        />
                        {errors.birthDate && <span className="error">{errors.birthDate}</span>}
                    </div>
                </div>
                <div className="form-row">
                    <div className="form-group">
                        <label htmlFor="phone">Номер телефона</label>
                        <input 
                            type="tel" 
                            id="phone" 
                            placeholder="89999999999" 
                            value={formData.phone}
                            onChange={handleChange}
                            maxLength="11"
                        />
                        {errors.phone && <span className="error">{errors.phone}</span>}
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input 
                            type="text" 
                            id="email" 
                            placeholder="Введите email" 
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <span className="error">{errors.email}</span>}
                    </div>
                </div>
                <div className="form-group">
                    <label>Пол</label>
                    <div className="gender-options">
                        <div className="gender-option">
                            <input 
                                type="radio" 
                                id="male" 
                                name="gender" 
                                value="male" 
                                checked={formData.gender === 'male'}
                                onChange={handleChange}
                            />
                            <label htmlFor="male">Мужской</label>
                        </div>
                        <div className="gender-option">
                            <input 
                                type="radio" 
                                id="female" 
                                name="gender" 
                                value="female" 
                                checked={formData.gender === 'female'}
                                onChange={handleChange}
                            />
                            <label htmlFor="female">Женский</label>
                        </div>
                    </div>
                    {errors.gender && <span className="error">{errors.gender}</span>}
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
                {errors.submit && <div className="error">{errors.submit}</div>}
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