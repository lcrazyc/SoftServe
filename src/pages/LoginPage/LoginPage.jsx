import React from 'react';
import Header from '../../components/header/header'; 
import Footer from '../../components/footer/footer'; 
import './LoginPage.css'; 
const LoginPage = () => {
  return (
    <div>
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
                            <p>pochta@gmail.com</p>
                        </div>
                  </div>
                  <div className="log-item">
                        <h2>Пароль</h2>
                        <div className="account-item-box">
                            <p>password</p>
                        </div>
                  </div>
                  <button>Увійти в аккаунт</button>
                  </form>
                  <div class="not-reg">
                    <p>Ще не маєте аккаунту?</p>
                    <p className="log-reg">Зарєструватися</p>
                  </div>            
              </div>
          </main>
          <Footer />
      </div>
    
  )
};

export default LoginPage;