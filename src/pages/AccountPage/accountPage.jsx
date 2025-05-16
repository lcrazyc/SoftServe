import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './accountPage.css';
import axios from 'axios';

const AccountPage = () => {
  const { id } = useParams(); // отримуємо id з маршруту
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    fetchUserById(id);
  }, [id]);

  const fetchUserById = async (userId) => {
    try {
      const response = await axios.get(`https://localhost:9999/api/Users/${userId}`, {
        headers: { 'Content-Type': 'application/json' }
      });
      setUser(response.data);
    } catch (error) {
      console.error('Помилка завантаження користувача:', error.message);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="account-page">
      <Header />
      <main className="account-content">
      {user?.role === 'admin' && (
  <div className="admin-section">
    <h1 className="admin">Ваш акаунт має права адміністратора</h1>
    <button className="edit-movies-btn" onClick={() => navigate('/admin/movies')}>
      Редагувати фільми
    </button>
  </div>
)}


        <div className="account-profile-content">
          <div className="account-profile-small">
            <div className="account-photo">
              <img src="/Icons/ProfilePicture.svg" alt="profile" />
            </div>
            <h2>Welcome!</h2>
          </div>
          <div className="account-profile-big">
            <div className="account-name">
              <div className="account-item">
                <h2>Прізвище</h2>
                <div className="account-item-box">
                  <p>{user?.surname || 'Не вказано'}</p>
                </div>
              </div>
              <div className="account-item">
                <h2>Ім'я</h2>
                <div className="account-item-box">
                  <p>{user?.username || 'Не вказано'}</p>
                </div>
              </div>
            </div>
            <div className="account-item">
              <h2>Пошта</h2>
              <div className="account-item-box">
                <p>{user?.email || 'Не вказано'}</p>
              </div>
            </div>
            <button>Скачати квитки в PDF</button>
            <h2 className="account-exit" onClick={handleLogout}>Вийти з профілю</h2>
          </div>
        </div>

        <div className="account-promotion">
          <div className="promotion-content">
            <div className="promotion-content-title">
              <h1>Пропозиції для Вас!</h1>
              <h2>Знижка на другий квиток - 10%</h2>
            </div>
            <button>Застосувати</button>
            <p>Скануйте код при купівлі квитків офлайн</p>
          </div>
          <div className="promotion-code" onClick={() => navigator.clipboard.writeText(user?.promotions || '')}>
            <h2>{user?.promotions || 'Поки пропозицій немає'}</h2>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;
