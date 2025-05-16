import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './EditMoviePage.css';

const EditMoviePage = () => {
  const { id } = useParams();
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
    cast: '',
  });

  const [session, setSession] = useState({
    date: '',
    session_time: '',
    price: ''
  });

  const [modalMessage, setModalMessage] = useState('');
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    axios.get(`https://localhost:9999/api/Movies/${id}`)
      .then(response => setMovie(response.data))
      .catch(error => console.error('Помилка завантаження фільму:', error));
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMovie(prev => ({ ...prev, [name]: value }));
  };

  const handleSessionChange = (e) => {
    const { name, value } = e.target;
    setSession(prev => ({ ...prev, [name]: value }));
  };

  const showConfirmation = (message) => {
    setModalMessage(message);
    setShowModal(true);
    setTimeout(() => setShowModal(false), 3000); // автоматично закривається через 3 сек
  };

  const handleEdit = async (e) => {
    e.preventDefault();
    try {
      const updatedMovie = {
        ...movie,
        rating: parseFloat(movie.rating),
        release_year: parseInt(movie.release_year),
        duration_minutes: parseInt(movie.duration_minutes),
      };

      await axios.put(`https://localhost:9999/api/Movies/${id}`, updatedMovie);
      showConfirmation('🎬 Фільм оновлено успішно!');
      // navigate('/admin/movies'); // Якщо хочеш одразу перейти
    } catch (error) {
      console.error('Помилка редагування фільму:', error.message);
    }
  };

  const handleAddSession = async (e) => {
    e.preventDefault();
    try {
      const newSession = {
        ...session,
        price: parseFloat(session.price),
        movie_id: parseInt(id)
      };

      await axios.post('https://localhost:9999/api/Sessions', newSession);
      showConfirmation('🕓 Сеанс додано успішно!');
      setSession({ date: '', session_time: '', price: '' });
    } catch (error) {
      console.error('Помилка додавання сеансу:', error.message);
    }
  };

  return (
    <div className="edit-movie-page">
      <h1 className="edit-title">Редагування фільму</h1>
      <div className="edit-content">
        <form className="edit-form" onSubmit={handleEdit}>
          {Object.entries(movie).map(([key, value]) => (
            <div className="form-group" key={key}>
              <label>{key.replace(/_/g, ' ').toUpperCase()}</label>
              <input
                name={key}
                type={['rating', 'release_year', 'duration_minutes'].includes(key) ? 'number' : 'text'}
                value={value}
                onChange={handleChange}
                required={key !== 'poster_url' && key !== 'trailer_url'}
              />
            </div>
          ))}
          <button type="submit" className="submit-btn">Зберегти зміни</button>
        </form>

        <div className="poster-preview">
          {movie.poster_url ? (
            <img src={movie.poster_url} alt="Постер фільму" />
          ) : (
            <p>Постер не вказаний</p>
          )}
        </div>
      </div>

      <h2 className="edit-subtitle">Додати сеанс</h2>
      <form className="session-form" onSubmit={handleAddSession}>
        <div className="form-group">
          <label>Дата</label>
          <input type="date" name="date" value={session.date} onChange={handleSessionChange} required />
        </div>
        <div className="form-group">
          <label>Час (формат: HH:mm)</label>
          <input type="time" name="session_time" value={session.session_time} onChange={handleSessionChange} required />
        </div>
        <div className="form-group">
          <label>Ціна</label>
          <input type="number" name="price" value={session.price} onChange={handleSessionChange} required />
        </div>
        <button type="submit" className="submit-btn">Додати сеанс</button>
      </form>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            <p>{modalMessage}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditMoviePage;