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

    const handleSubmit = (event) => {
        event.preventDefault();
        if (validateForm()) {
            console.log('Form submitted:', { email, password });
        }
    };

    return (
        <div className="authorization-form">
            <h2>Войти</h2>
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