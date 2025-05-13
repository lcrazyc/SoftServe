import React from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/header/header'; 
import Footer from '../../components/footer/footer'; 
import './accountPage.css'; 
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

const AccountPage = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
  // Тут можешь добавить очистку localStorage/sessionStorage при необходимости
  navigate('/login');
};

    

  return (
    <div className="account-page">
      <Header />
      <main className="account-content">
        <div className="account-profile-content">
            <div className="account-profile-small">
                <div className="account-photo">
                </div>
                <h2>@nickname</h2>
            </div>
            <div className="account-profile-big">
                <div className="account-name">
                    <div className="account-item">
                        <h2>Призвіще</h2>
                        <div className="account-item-box">
                            <p>Призвіще</p>
                        </div>
                    </div>
                    <div className="account-item">
                        <h2>Ім'я</h2>
                        <div className="account-item-box">
                            <p>Ім'я</p>
                        </div>
                    </div>
                </div>
                <div className="account-item">
                        <h2>Пошта</h2>
                        <div className="account-item-box">
                            <p>diwgdi@gmail.com</p>
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
                <p>Для застосування  акції при купівлі квитків оффлайн - скануйте код</p>
            </div>
            <div className="promotion-code" onClick={handleCopy}>
                <h2>{textToCopy}</h2>
            </div>
        </div>
      </main>
       <Footer></Footer>
    </div>
  );
};

export default AccountPage;