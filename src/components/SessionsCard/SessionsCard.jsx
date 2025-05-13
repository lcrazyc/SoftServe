import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SessionsCard.css';
const SessionsCard = ({ film }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/movie_detail/${film.id}`);

    };

    const handleBuyClick = () => {
      navigate(`/buy_button/${film.id}`);
    };
    
  return (
    <div className="film-card">
      <img src={film.poster} alt={film.title} className="film-poster" />
      <h2 className="film-title">{film.title}</h2>
      <div className="film-rating">
        <img src="./Icons/Star.svg" alt="star" className="star-icon" />
        <span>{film.rating}</span>
      </div>
      <p className="film-year">{film.year} рік</p>
      <p className="date">13:00</p>
      <button className="details-button" onClick={handleDetailsClick}>Детальніше про фільм</button>
      <button className="buy-button" onClick={handleBuyClick}>Купити квитки</button>
    </div>
  );
};
export default SessionsCard;