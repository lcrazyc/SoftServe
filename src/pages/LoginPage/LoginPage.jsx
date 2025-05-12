import React, { useState } from 'react';
import Header from '../../components/header/header'; 
import Footer from '../../components/footer/footer'; 
import './LoginPage.css'; 

const LoginPage = () => {
  const [emailPlaceholder, setEmailPlaceholder] = useState('pochta@gmail.com');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Введіть пароль');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleFocus = (field) => {
    if (field === 'email') setEmailPlaceholder('');
    if (field === 'password') setPasswordPlaceholder('');
  };

  const handleBlur = (field) => {
    if (field === 'email' && !formData.email) {
      setEmailPlaceholder('pochta@gmail.com');
    }
    if (field === 'password' && !formData.password) {
      setPasswordPlaceholder('Введіть пароль');
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
            <h1>Вхід в аккаунт</h1>
          </div>
          <form action="">                    
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
            <button>Увійти в аккаунт</button>
          </form>
          <div className="not-reg">
            <p>Ще не маєте аккаунту?</p>
            <p className="log-reg">Зарєструватися</p>
          </div>            
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;