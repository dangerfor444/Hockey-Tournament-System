import React, { useState } from 'react';

const AuthorizationForm = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        if (!email) {
            newErrors.email = 'Введите Email';
        } else if (!/\S+@\S+\.\S+/.test(email)) {
            newErrors.email = 'Некорректный email';
        }
        if (!password) {
            newErrors.password = 'Введите пароль';
        } else if (password.length < 6) {
            newErrors.password = 'Пароль должен содержать не менее 6 символов';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
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

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (validateForm()) {
            try {
                const response = await fetch('http://89.232.177.107/ApiV1/Auth/Login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });

                if (response.ok) {
                    const token = await response.text();
                    localStorage.setItem('token', token);
                    
                    const userData = await fetchUserData(token);
                    if (userData) {
                        window.location.href = '/account';
                    } else {
                        setErrors({
                            submit: 'Ошибка при получении данных пользователя'
                        });
                    }
                } else {
                    const text = await response.text();
                    if (text) {
                        try {
                            const errorData = JSON.parse(text);
                            console.error('Login failed:', errorData);
                            setErrors({
                                submit: 'Неверный email или пароль'
                            });
                        } catch {
                            setErrors({
                                submit: 'Ошибка аутентификации. Неверные почта или пароль'
                            });
                        }
                    } else {
                        setErrors({
                            submit: 'Ошибка при входе. Нет данных от сервера.'
                        });
                    }
                }
            } catch (error) {
                console.error('Error during login:', error);
                setErrors({
                    submit: 'Ошибка сервера. Пожалуйста, попробуйте позже.'
                });
            }
        }
    };

    return (
        <div className="authorization-form">
            <h2>Вход</h2>
            <p>Войдите в ваш личный кабинет</p>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="label-group" htmlFor="email">Email</label>
                    <input 
                        type="email" 
                        id="email" 
                        placeholder=" " 
                        value={email} 
                        onChange={(e) => setEmail(e.target.value)} 
                    />
                    {errors.email && <span className="error">{errors.email}</span>}
                </div>
                <div className="form-group">
                    <label className="label-group" htmlFor="password">Пароль</label>
                    <input 
                        type="password" 
                        id="password" 
                        placeholder=" " 
                        value={password} 
                        onChange={(e) => setPassword(e.target.value)} 
                    />
                    {errors.password && <span className="error">{errors.password}</span>}
                </div>
                {errors.submit && <div className="error">{errors.submit}</div>}
                <div className="checkbox-group">
                    <div className="checkbox-group-rememberMe">
                        <input type="checkbox" id="rememberMe" />
                        <label className="rememberMe">Запомнить меня</label>
                    </div>
                    <a className="forgot-password" href="#">Забыли пароль?</a>
                </div>
                <button type="submit">Войти</button>
            </form>
            <div className="register">
                <span>Нет аккаунта? </span>
                <a className="register-link" href="/registration">Зарегистрироваться</a>
            </div>
        </div>
    );
};

export default AuthorizationForm;