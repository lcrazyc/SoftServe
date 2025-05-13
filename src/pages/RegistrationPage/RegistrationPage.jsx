import React, { useState } from 'react';
import Header from '../../components/header/header'; 
import Footer from '../../components/footer/footer'; 
import './RegistrationPage.css'; 

const RegPage = () => {
  const [emailPlaceholder, setEmailPlaceholder] = useState('pochta@gmail.com');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Введіть пароль');
  const [namePlaceholder, setNamePlaceholder] = useState('Іван');
  const [surnamePlaceholder, setSurnamePlaceholder] = useState('Іванов');
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    sername: ''
  });

  const handleFocus = (field) => {
    if (field === 'email') setEmailPlaceholder('');
    if (field === 'password') setPasswordPlaceholder('');
    if (field === 'name') setNamePlaceholder('');
    if (field === 'sername') setSurnamePlaceholder('');
  };

  const handleBlur = (field) => {
    if (field === 'email' && !formData.email) {
      setEmailPlaceholder('pochta@gmail.com');
    }
    if (field === 'password' && !formData.password) {
      setPasswordPlaceholder('Введіть пароль');
    }
    if (field === 'name' && !formData.name) {
      setNamePlaceholder('Іван');
    }
    if (field === 'sername' && !formData.sername) {
      setSurnamePlaceholder('Іванов');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Remove placeholder when typing starts
    if (name === 'email' && value) setEmailPlaceholder('');
    if (name === 'password' && value) setPasswordPlaceholder('');
    if (name === 'name' && value) setNamePlaceholder('');
    if (name === 'sername' && value) setSurnamePlaceholder('');
  };

  return (
    <div className="login-container">
      <Header />
      <main className="login-content">
        <div className="login-window">
          <div className="login-logo">
            <div className="logo-log">
              <img src="./Icons/logo.svg" alt="logo" />
            </div>
            <h1>Реєстрація</h1>
          </div>
          <form action="">                    
            <div className="log-item">
              <h2>Прізвище</h2>
              <div className="account-item-box">
                <input
                  className="input"
                  type="text" 
                  name="sername"
                  placeholder={surnamePlaceholder}
                  onFocus={() => handleFocus('sername')}
                  onBlur={() => handleBlur('sername')}
                  onChange={handleChange}
                  value={formData.sername}
                />
              </div>
            </div>
            <div className="log-item">
              <h2>Ім'я</h2>
              <div className="account-item-box">
                <input 
                  className="input"
                  type="text" 
                  name="name"
                  placeholder={namePlaceholder}
                  onFocus={() => handleFocus('name')}
                  onBlur={() => handleBlur('name')}
                  onChange={handleChange}
                  value={formData.name}
                />
              </div>
            </div>
            <div className="log-item">
              <h2>Пошта</h2>
              <div className="account-item-box">
                <input
                  className="input"
                  type="email" 
                  name="email"
                  placeholder={emailPlaceholder}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  onChange={handleChange}
                  value={formData.email}
                />
              </div>
            </div>
            <div className="log-item">
              <h2>Пароль</h2>
              <div className="account-item-box">
                <input 
                  className="input"
                  type="password" 
                  name="password"
                  placeholder={passwordPlaceholder}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  onChange={handleChange}
                  value={formData.password}
                />
              </div>
            </div>
            <button>Зареєструватися</button>
          </form>
          <div className="not-reg">
            <p>Вже маєте аккаунт?</p>
            <p className="log-reg">Увійти</p>
          </div>            
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default RegPage;