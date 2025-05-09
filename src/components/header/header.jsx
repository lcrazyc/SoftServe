import './header.css';
import React, { useState } from 'react';

const Header = () =>  {

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="header">
      <div className="logo-circle"></div>
      <input className="search-bar" placeholder="Пошук" />
      <div className="header-icons">
        <img src="./Icons/Zakladku.svg" alt="Save" className="icon"/>
        <img src="./Icons/Profile.svg" alt="Account" className="icon"/>
        <img src='./Icons/Menu.svg'
          alt="Menu"
          className="icon"
          onClick={toggleMenu}/>
      </div>
      {menuOpen && (
        <div className="burger-menu">
          <a href="#">Головна</a>
          <a href="#">Сеанси</a>
          <a href="#">Акаунт</a>
          <a href="#">Пошук</a>
        </div>
      )}
    </header>
  );
}

export default Header;
