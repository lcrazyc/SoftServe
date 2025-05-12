import React, { useState } from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import FilmCard from "../components/FilmCard/FilmCard";
import filmsData from "../movies.json";
import "./SearchPage.css";

const SearchPage = () => {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  const filteredFilms = filmsData.filter(film => {
    return (
      (genre === "" || film.genre === genre) &&
      (year === "" || film.year.toString() === year) &&
      (rating === "" || (
        Number(film.rating) >= Number(rating) &&
        Number(film.rating) < Number(rating) + 1
      ))
    );
  });

  return (
    <div className="App">
      <Header />
      <main className="search-main">
        <h1 className="search-title">Пошук</h1>
        <div className="filter-bar">
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

          <select value={year} onChange={e => setYear(e.target.value)}>
            <option value="">Рік</option>
            {Array.from({ length: 2025 - 1980 + 1 }, (_, i) => {
              const y = 1980 + i;
              return <option key={y} value={y}>{y}</option>;
            })}
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

        <div className="films-grid">
          {filteredFilms.map(film => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SearchPage;