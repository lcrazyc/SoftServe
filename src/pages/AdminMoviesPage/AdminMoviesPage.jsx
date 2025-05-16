import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './adminMoviesPage.css';

const AdminMoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get('https://localhost:9999/api/Movies');
      setMovies(response.data);
    } catch (error) {
      console.error('Помилка завантаження фільмів:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`https://localhost:9999/api/Movies/${id}`);
      setMovies((prev) => prev.filter((movie) => movie.id !== id));
    } catch (error) {
      console.error('Помилка видалення:', error.message);
    }
  };

  return (
    <div className="admin-movies-page">
      <h1>Редагування фільмів</h1>
      <button className="add-movie-btn" onClick={() => navigate('/admin/movies/add')}>
        Додати новий фільм
      </button>
<button onClick={() => navigate('/')} className="go-home-btn">
  На головну
</button>
      <ul className="movie-list">
        {movies.map((movie) => (
          <li key={movie.id} className="movie-item">
            <span>{movie.title}</span>
            <div className="movie-actions">
              <button onClick={() => navigate(`/admin/movies/edit/${movie.id}`)}>Редагувати</button>
              <button onClick={() => handleDelete(movie.id)}>Видалити</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminMoviesPage;