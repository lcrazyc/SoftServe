import './header.css';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleSearch = (e) => {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      navigate(`/search?query=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <header className="header">
      <div className="logo-circle">
        <img src="../../Icons/logo.svg" alt="logo" />
      </div>

      <input
        className="search-bar"
        placeholder="Пошук"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        onKeyDown={handleSearch}
      />

      <div className="header-icons">
        <img 
          src="../../Icons/Zakladku.svg" 
          alt="Save" 
          className="icon"
          onClick={() => navigate('/saved')} 
        />
       <img src="../../Icons/Profile.svg" alt="Account" className="icon" onClick={() => navigate('/login')} />
        <img
          src='../../Icons/Menu.svg'
          alt="Menu"
          className="icon"
          onClick={toggleMenu}
        />
      </div>

      {menuOpen && (
        <div className="burger-menu">
          <Link to="/" onClick={toggleMenu}>Головна</Link>
          <Link to="/sessions" onClick={toggleMenu}>Сеанси</Link>
          <Link to="/account" onClick={toggleMenu}>Акаунт</Link>
          <Link to="/searchh" onClick={toggleMenu}>Пошук</Link>
        </div>
      )}
    </header>
  );
};

export default Header;