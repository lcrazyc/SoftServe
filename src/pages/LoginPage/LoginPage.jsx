import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './LoginPage.css';

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailPlaceholder, setEmailPlaceholder] = useState('pochta@gmail.com');
  const [passwordPlaceholder, setPasswordPlaceholder] = useState('Введіть пароль');
  const [error, setError] = useState('');

  const handleFocus = (field) => {
    if (field === 'email') setEmailPlaceholder('');
    if (field === 'password') setPasswordPlaceholder('');
  };

  const handleBlur = (field) => {
    if (field === 'email' && !email) setEmailPlaceholder('pochta@gmail.com');
    if (field === 'password' && !password) setPasswordPlaceholder('Введіть пароль');
  };

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Будь ласка, введіть і пошту, і пароль');
      return;
    }

    try {
      const response = await axios.get('https://localhost:9999/api/Users');
      const users = response.data;

      const user = users.find(u => u.username === email && u.password_hash === password);

      if (user) {
        localStorage.setItem('user', JSON.stringify(user));
        navigate(`/account/${user.id}`); // ⬅️ Перенаправлення з id
      } else {
        setError('Неправильний логін або пароль');
      }
    } catch (err) {
      console.error('Помилка логіну:', err);
      setError('Помилка з сервером');
    }
  };

  const goToRegister = () => navigate('/register');

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

          <form onSubmit={(e) => { e.preventDefault(); handleLogin(); }}>
            <div className="log-item">
              <h2>Пошта</h2>
                <input
                  className="account-item-box"
                  type="email"
                  name="email"
                  placeholder={emailPlaceholder}
                  onFocus={() => handleFocus('email')}
                  onBlur={() => handleBlur('email')}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
            </div>

            <div className="log-item">
              <h2>Пароль</h2>
                <input
                  className="account-item-box"
                  type="password"
                  name="password"
                  placeholder={passwordPlaceholder}
                  onFocus={() => handleFocus('password')}
                  onBlur={() => handleBlur('password')}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
            </div>

            {error && <p className="error-message" style={{ color: 'red' }}>{error}</p>}

            <button type="submit">Увійти в аккаунт</button>
          </form>

          <div className="not-reg">
            <p>Ще не маєте аккаунту?</p>
            <p
              className="log-reg"
              onClick={goToRegister}
              style={{ cursor: 'pointer'}}
            >
              Зареєструватися
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default LoginPage;