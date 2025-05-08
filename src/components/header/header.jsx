import './header.css';

const Header = () =>  {
  return (
    <header className="header">
      <div className="logo-circle"></div>
      <input className="search-bar" placeholder="Пошук" />
      <div className="header-icons">
        <img src="./Icons/Zakladku.svg" alt="Save" />
        <img src="./Icons/Profile.svg" alt="Account" />
        <img src="./Icons/Menu.svg" alt="Menu" />
      </div>
    </header>
  );
}

export default Header;
