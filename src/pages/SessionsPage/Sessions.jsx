import filmsData from '../../movies.json';
import { useLocation } from 'react-router-dom';
import SessionsCard from "../../components/SessionsCard/SessionsCard";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import React, { useState } from "react";
import "./Sessions.css";

const Sessions = () => {
    const [genre, setGenre] = useState("");
    const [year, setYear] = useState("");
    const [rating, setRating] = useState("");
    const [day, setDay] = useState("");

  const movieData = new Array(10).fill({}); // Заглушка для 12 фильмов

  const filteredFilms = filmsData.filter(film => {
    return (
      (genre === "" || film.genre === genre) &&
      (year === "" || film.year.toString() === year) &&
      (rating === "" || (
        Number(film.rating) >= Number(rating) &&
        Number(film.rating) < Number(rating) + 1
      )) &&
      (day === "" || film.day === day)
    );
  });

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get('movieId');
  const selectedMovie = filmsData.find((m) => m.id.toString() === movieId);


  return (
    <div className="sessions-container">
      <Header />

      {/* Title */}
      <h1 class="page-title">Сеанси</h1>

      {/* Filters */}
      <div className="filters1">
        <select value={day} onChange={e => setDay(e.target.value)}>
            <option value="">День</option>
            <option value="Понеділок">Понеділок</option>
            <option value="Вівторок">Вівторок</option>
            <option value="Середа">Середа</option>
            <option value="Четвер">Четвер</option>
            <option value="П’ятниця">П’ятниця</option>
            <option value="Субота">Субота</option>
            <option value="Неділя">Неділя</option>
        </select>
        <select value={genre} onChange={e => setGenre(e.target.value)}>
            <option value="">Жанр</option>
            <option value="Драма">Драма</option>
            <option value="Комедія">Комедія</option>
            <option value="Екшн">Екшн</option>
            <option value="Мелодрама">Мелодрама</option>
            <option value="Бойовик">Бойовик</option>
            <option value="Триллер">Триллер</option>
            <option value="Жахи">Жахи</option>
            <option value="Пригоди">Пригоди</option>
          </select>
        <select value={rating} onChange={e => setRating(e.target.value)}>
            <option value="">Рейтинг</option>
            <option value="5">5+</option>
            <option value="4">4+</option>
            <option value="3">3+</option>
            <option value="2">2+</option>
            <option value="1">1+</option>
          </select>
      </div>

      {/* Movie Grid */}
      <main className="sessions-grid">
  {movieId && selectedMovie ? (
    <SessionsCard film={selectedMovie} />
  ) : (
    filteredFilms.map(film => (
      <SessionsCard key={film.id} film={film} />
    ))
  )}
</main>


<Footer />
    </div>
  );
};

export default Sessions;