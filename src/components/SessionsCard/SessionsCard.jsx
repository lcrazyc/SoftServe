import React from 'react';
import { useNavigate } from 'react-router-dom';
import './SessionsCard.css';

const SessionsCard = ({ film, session }) => {
  const navigate = useNavigate();

  if (!film || !session) return null;

  const handleDetailsClick = () => {
    navigate(`/movie_detail/${film.id}`);
  };

  const handleBuyClick = () => {
    navigate(`/buy_button/${session.id}`, {
      state: { film, session },
    });
  };

  const formatDate = (dateStr) => new Date(dateStr).toLocaleDateString('uk-UA');
  const formatTime = (timeStr) =>
    timeStr?.length >= 5 ? timeStr.slice(0, 5) : 'NaN:NaN';
 return (
    <div className="film-card">
      <div className="poster-wrapper">
        <img src={film.poster_url} alt={film.title} className="film-poster" />
      </div>
      <h2 className="film-title">{film.title}</h2>
      <p className="date">
        {formatDate(session.date)} {formatTime(session.session_time)}
      </p>
      <div className="film-rating">
        <img src="./Icons/Star.svg" alt="star" className="star-icon" />
        <span>{film.rating}</span>
      </div>
      <button className="details-button" onClick={handleDetailsClick}>Детальніше про фільм</button>
      <button className="buy-button" onClick={handleBuyClick}>Купити квитки</button>
    </div>
  );
};

export default SessionsCard;
