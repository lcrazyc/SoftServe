import React from 'react';
import './FilmCard.css';
const FilmCard = ({ film }) => {
  return (
    <div className="film-card">
      <img src={film.poster} alt={film.title} className="film-poster" />
      <h2 className="film-title">{film.title}</h2>
      <p className="film-year">{film.year} рік</p>
      <div className="film-rating">
        <img src="./Icons/Star.svg" alt="star" className="star-icon" />
        <span>{film.rating}</span>
      </div>
      <button className="details-button">Детальніше про фільм</button>
      <button className="buy-button">Купити квитки</button>
    </div>
  );
};
export default FilmCard;