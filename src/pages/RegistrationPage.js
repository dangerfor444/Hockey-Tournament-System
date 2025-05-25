// RegistrationPage.js
import React from 'react';
import '../styles/RegistrationPage.css';
import logo from '../img/avtospartak-logo.png';
import img from '../img/Hockey2.jpg';
import RegistrationForm from '../components/RegistrationForm'; 

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
                <RegistrationForm /> 
            </div>
        </div>
    );
};

export default RegistrationPage;