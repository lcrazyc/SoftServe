import React from 'react';
import { useNavigate } from 'react-router-dom';
import './FilmCard.css';

const FilmCard = ({ film }) => {
  const navigate = useNavigate();

  const handleDetailsClick = () => {
    navigate(`/movie_detail/${film.id}`);
  };

  const handleBuyClick = () => {
    navigate(`/buy_button/${film.id}`);
  };
return (
    <div className="film-card">
      <div className="poster-wrapper">
        <img src={film.poster_url} alt={film.title} className="film-poster" />
      </div>

      {/* <img src="./Icons/Zakladku.svg" alt="bookmark" className="bookmark-icon-outside" /> */}
      <h2 className="film-title">{film.title}</h2>
      <p className="film-year">{film.release_year} рік</p>
      <div className="film-rating">
        <img src="./Icons/Star.svg" alt="star" className="star-icon" />
        <span>{film.rating}</span>
      </div>
      <button className="details-button" onClick={handleDetailsClick}>Детальніше про фільм</button>
      <button className="buy-button" onClick={handleBuyClick}>Купити квитки</button>
    </div>
  );
};
export default FilmCard;
