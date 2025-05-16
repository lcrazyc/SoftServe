import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './AddMoviePage.css';

const AddMoviePage = () => {
  const navigate = useNavigate();
  const [movie, setMovie] = useState({
    title: '',
    description: '',
    genres: '',
    rating: '',
    release_year: '',
    poster_url: '',
    trailer_url: '',
    duration_minutes: '',
    director: '',
    cast: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie((prev) => ({ ...prev, [name]: value }));
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const movieToSend = {
        ...movie,
        rating: parseFloat(movie.rating),
        release_year: parseInt(movie.release_year),
        duration_minutes: parseInt(movie.duration_minutes),
        created_at: new Date().toISOString()
      };

      await axios.post('https://localhost:9999/api/Movies', movieToSend);
      navigate('/admin/movies');
    } catch (error) {
      console.error('Помилка додавання фільму:', error.message);
    }
  };

  return (
    <div className="add-movie-page">
      <h1 className="add-title">Додати новий фільм</h1>
      <form className="add-form" onSubmit={handleAdd}>
        {Object.entries(movie).map(([key, value]) => (
          <div className="form-group" key={key}>
            <label htmlFor={key}>
              {key
                .replace(/_/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase())}
            </label>
            <input
              type={
                ['rating', 'duration_minutes', 'release_year'].includes(key)
                  ? 'number'
                  : 'text'
              }
              name={key}
              value={value}
              onChange={handleChange}
              required={key !== 'poster_url' && key !== 'trailer_url'}
            />
          </div>
        ))}
        <button type="submit" className="submit-btn">
          Додати фільм
        </button>
      </form>
    </div>
  );
};

export default AddMoviePage;