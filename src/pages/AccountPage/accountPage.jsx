import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header'; 
import Footer from '../../components/footer/footer'; 
import './accountPage.css'; 
import axios from "axios";

const textToCopy = 'dwkedeidek123';

const handleCopy = () => {
  navigator.clipboard.writeText(textToCopy)
    .then(() => {
      alert('Скопійовано!');
    })
    .catch(err => {
      console.error('Помилка копіювання: ', err);
    });
};


const sendGetRequest = async () => {
  try {
    const response = await axios.get('http://127.0.0.1:9999/api/Users', { 
      headers: { 'Content-Type': 'application/json' }
    });
    const firstUser = response.data[0]; 
    console.log('Fetched user:', firstUser);
    localStorage.setItem("users", JSON.stringify(firstUser)); 
  } catch (error) {
    console.error("Помилка запиту: ", error.message); 
  }
   try {
    const response = await axios.get('http://127.0.0.1:9999/api/Promotions', { 
      headers: { 'Content-Type': 'application/json' }
    });
    const firstUser = response.data[0]; 
    console.log('Fetched promotion:', firstUser);
    localStorage.setItem("promotion", JSON.stringify(firstUser)); 
  } catch (error) {
    console.error("Помилка запиту: ", error.message); 
  }
};

const AccountPage = () => {
  const navigate = useNavigate();
  const [users, setUsers] = useState({ email: '', surname: '', username: '' });
  const [promotions, setPromotions] = useState({ code_url: '' });

  useEffect(() => {
    const storedUsers = JSON.parse(localStorage.getItem("users"));
    const storedPromotions = JSON.parse(localStorage.getItem("promotions"));
    if (storedUsers) {
      setUsers(storedUsers); 
    } else {
      sendGetRequest(); 
    }
    if (storedPromotions) {
      setPromotions(storedPromotions); 
    } else {
      sendGetRequest(); 
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("users"); 
    navigate('/login'); 
  };
  return (
    <div className="account-page">
      <Header />
      <main className="account-content">
        {/* для адміна */}
       {users.role === 'admin' && <h1 className='admin'>Ваш акаунт має права адміністратора</h1>}
        <div className="account-profile-content">
          <div className="account-profile-small">
            <div className="account-photo">
              <img src="./Icons/ProfilePicture.svg"  />
            </div>
            <h2>Welcome!</h2>
          </div>
          <div className="account-profile-big">
            <div className="account-name">
              <div className="account-item">
                <h2>Прізвище</h2>
                <div className="account-item-box">
                  <p>{users?.surname || 'Не вказано'}</p>
                </div>
              </div>
              <div className="account-item">
                <h2>Ім'я</h2>
                <div className="account-item-box">
                  <p>{users?.username || 'Не вказано'}</p>
                </div>
              </div>
            </div>
            <div className="account-item">
              <h2>Пошта</h2>
              <div className="account-item-box">
                <p>{users?.email || 'Не вказано'}</p>
              </div>
            </div>
            <button>Скачати квитки в pdf</button>
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
            <p>Для застосування акції при купівлі квитків оффлайн - скануйте код</p>
          </div>
          <div className="promotion-code" onClick={handleCopy}>
            <h2>{promotions?.code_url || 'Поки пропозицій немає'}</h2>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AccountPage;