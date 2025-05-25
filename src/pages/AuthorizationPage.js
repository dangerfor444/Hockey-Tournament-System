import React from 'react';
import '../styles/AuthorizationPage.css';
import logo from '../img/avtospartak-logo.png';
import img from '../img/Hockey1.jpg';
import AuthorizationForm from '../components/AuthorizationForm'; 

const AuthorizationPage = () => {
    return (
        <div className="authorization-page">
            <div className="logo-container">
                <img src={logo} alt="Logo" />
            </div>

            <div className="content-container">
                <AuthorizationForm /> 
                <div className="img-box">
                    <img src={img} alt="img" />
                </div>
            </div>
        </div>
    );
};

export default AuthorizationPage;