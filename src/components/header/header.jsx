import './header.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () =>  {
   const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="logo-circle">
        <img src="./Icons/logo.svg" alt="logo" />
      </div>
      <input className="search-bar" placeholder="Пошук" />
      <div className="header-icons">
        <img 
          src="./Icons/Zakladku.svg" 
          alt="Save" 
          className="icon"
          onClick={() => navigate('/saved')} // 👈 Переход на сохранённые
        />
        <Link to="/login">
          <img src="./Icons/Profile.svg" alt="Account" className="icon" />
        </Link>
        <img src='./Icons/Menu.svg'
          alt="Menu"
          className="icon"
          onClick={toggleMenu}/>
      </div>
      {menuOpen && (
        <div className="burger-menu">
          <Link to="/" onClick={toggleMenu}>Головна</Link>
          <Link to="/sessions" onClick={toggleMenu}>Сеанси</Link>
          <Link to="/account" onClick={toggleMenu}>Акаунт</Link>
          <Link to="/search" onClick={toggleMenu}>Пошук</Link>
        </div>
      )}
    </header>
  );
}

export default Header;
