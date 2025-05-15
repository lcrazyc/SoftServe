import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import SessionsCard from '../../components/SessionsCard/SessionsCard';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import './Sessions.css';

const Sessions = () => {
  const [films, setFilms] = useState([]);
  const [sessions, setSessions] = useState([]);
  const [genre, setGenre] = useState('');
  const [year, setYear] = useState('');
  const [rating, setRating] = useState('');
  const [day, setDay] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const movieId = queryParams.get('movieId');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [moviesRes, sessionsRes] = await Promise.all([
          axios.get('https://localhost:9999/api/Movies'),
          axios.get('https://localhost:9999/api/Sessions'),
        ]);
        setFilms(moviesRes.data);
        setSessions(sessionsRes.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, []);

  const uniqueGenres = Array.from(new Set(films.map(f => f.genre))).filter(Boolean);

  const filteredSessions = sessions.filter(session => {
    const film = films.find(f => f.id === session.movie_id);
    if (!film) return false;

    return (
      (!movieId || film.id.toString() === movieId) &&
      (!genre || film.genre === genre) &&
      (!year || film.release_year.toString() === year) &&
      (!rating || (
        parseFloat(film.rating) >= parseFloat(rating) &&
        parseFloat(film.rating) < parseFloat(rating) + 1
      )) &&
      (!day || session.day === day)
    );
  });

  return (
    <div className="sessions-container">
      <Header />
      <h1 className="page-title">Сеанси</h1>

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
          {uniqueGenres.map(g => (
            <option key={g} value={g}>{g}</option>
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

      <main className="sessions-grid">
        {filteredSessions.map(session => {
          const film = films.find(f => f.id === session.movie_id);
          if (!film) return null;

          return (
            <SessionsCard key={session.id} film={film} session={session} />
          );
        })}
      </main>

      <Footer />
    </div>
  );
};

export default Sessions;
