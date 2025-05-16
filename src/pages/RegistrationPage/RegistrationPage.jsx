import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './RegistrationPage.css';

const RegPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    name: '',
    sername: ''
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleRegister = async (e) => {
    e.preventDefault();

    const userPayload = {
      username: formData.name,       // ім’я — це username
      password_hash: formData.password,
      email: formData.email,
      role: 'user',                  // завжди юзер
      promotions: '',
      surname: formData.sername
    };

    try {
      const response = await axios.post('https://localhost:9999/api/Users', userPayload, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const userId = response.data.id;
      console.log('Користувач зареєстрований:', response.data);
      navigate(`/account/${userId}`);
    } catch (error) {
      console.error('Помилка при реєстрації:', error);
      alert('Не вдалося зареєструвати користувача');
    }
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
          <form onSubmit={handleRegister}>
            <div className="log-item">
              <h2>Прізвище</h2>
                <input
                  className="account-item-box"
                  type="text"
                  name="sername"
                  placeholder="Іванов"
                  onChange={handleChange}
                  value={formData.sername}
                />
            </div>
            <div className="log-item">
              <h2>Ім'я</h2>
                <input
                  className="account-item-box"
                  type="text"
                  name="name"
                  placeholder="Іван"
                  onChange={handleChange}
                  value={formData.name}
                />
            </div>
            <div className="log-item">
              <h2>Пошта</h2>
                <input
                  className="account-item-box"
                  type="email"
                  name="email"
                  placeholder="pochta@gmail.com"
                  onChange={handleChange}
                  value={formData.email}
                />
            </div>
            <div className="log-item">
              <h2>Пароль</h2>
                <input
                  className="account-item-box"
                  type="password"
                  name="password"
                  placeholder="Введіть пароль"
                  onChange={handleChange}
                  value={formData.password}
                />
            </div>
            <button type="submit">Зареєструватися</button>
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