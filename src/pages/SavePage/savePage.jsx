import React, { useState, useEffect } from "react";
import Header from '../../components/header/header'; 
import Footer from '../../components/footer/footer'; 
import FilmCard from "../../components/FilmCard/FilmCard";
import axios from "axios";
import "./savePage.css";

const SavePage = () => {
  const [savedFilms, setSavedFilms] = useState([]);
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState("");

  useEffect(() => {
    const fetchFavorites = async () => {
      try {
        // 1. Отримати об'єкти Favorites
        const favRes = await axios.get('https://localhost:9999/api/Favorites/user/1');
        const favoriteMovieIds = favRes.data.map(fav => fav.movie_id);

        // 2. Отримати всі фільми (можна також через окремі запити, але краще одним)
        const moviesRes = await axios.get('https://localhost:9999/api/Movies');
        const allMovies = moviesRes.data;

        // 3. Фільтруємо ті, що є в улюблених
        const favoriteMovies = allMovies.filter(movie => favoriteMovieIds.includes(movie.id));

        setSavedFilms(favoriteMovies);
      } catch (error) {
        console.error("Помилка при завантаженні збережених фільмів:", error);
      }
    };

    fetchFavorites();
  }, []);

  const filteredFilms = savedFilms.filter(film => {
    return (
      (genre === "" || film.genre === genre) &&
      (year === "" || film.release_year?.toString() === year) &&
      (rating === "" || (
        Number(film.rating) >= Number(rating) &&
        Number(film.rating) < Number(rating) + 1
      ))
    );
  });

  const uniqueGenres = Array.from(new Set(savedFilms.map(f => f.genre))).filter(Boolean);
  const uniqueYears = Array.from(new Set(savedFilms.map(f => f.release_year))).filter(Boolean);

  return (
    <div className="save-container">
      <Header />
      <main className="save-main">
        <h1>Збережені фільми</h1>

        <div className="filters1">
          <select value={genre} onChange={e => setGenre(e.target.value)}>
            <option value="">Жанр</option>
            {uniqueGenres.map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>

          <select value={year} onChange={e => setYear(e.target.value)}>
            <option value="">Рік</option>
            {uniqueYears.map(y => (
              <option key={y} value={y}>{y}</option>
            ))}
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

        <div className="save-films">
          {filteredFilms.length > 0 ? filteredFilms.map(film => (
            <FilmCard key={film.id} film={film} />
          )) : <p>Немає збережених фільмів, що відповідають фільтрам.</p>}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SavePage;