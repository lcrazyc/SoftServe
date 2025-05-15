import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import Header from '../components/header/header';
import Footer from '../components/footer/footer';
import SessionsCard from '../components/FilmCard/FilmCard';
import './SearchResults.css';

const SearchResults = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const query = queryParams.get('query')?.toLowerCase() || '';

  const [filteredMovies, setFilteredMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('https://localhost:9999/api/Movies')
      .then(res => {
        const allMovies = res.data;
        const results = allMovies.filter(movie =>
          movie.title.toLowerCase().includes(query)
        );
        setFilteredMovies(results);
      })
      .catch(err => console.error("Error fetching movies:", err))
      .finally(() => setLoading(false));
  }, [query]);

  return (
    <div className="search-results">
      <Header />
      <h2 className="search-title">Результати пошуку: "{query}"</h2>
      {loading ? (
        <p className="loading-text">Завантаження...</p>
      ) : filteredMovies.length > 0 ? (
        <div className="results-grid">
          {filteredMovies.map(movie => (
            <SessionsCard key={movie.id} film={movie} />
          ))}
        </div>
      ) : (
        <p className="no-results">Нічого не знайдено.</p>
      )}
      <Footer />
    </div>
  );
};

export default SearchResults;