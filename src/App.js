import React from 'react';
import movies from './movies.json';  // assuming movies.json is in the same directory as your component

const Movies = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {movies.map((movie) => (
        <div key={movie.id} className="rounded-2xl shadow-lg p-4 bg-white">
          <img
            src={movie.poster}  // Исправлено на movie.poster
            alt={movie.title}  // Исправлено на movie.title
            className="rounded-xl w-full h-60 object-cover mb-4"
          />
          <h2 className="text-xl font-semibold">{movie.title}</h2>  // Исправлено на movie.title
          <p className="text-sm text-gray-600">{movie.description.slice(0, 150)}...</p>  // Исправлено на movie.description
          <div className="mt-2">
            <span className="text-sm font-medium">Жанр: </span>{movie.genre.join(', ')}  // Исправлено на movie.genre
          </div>
          <div className="mt-1 text-sm">
            <span className="font-medium">Рік:</span> {movie.year}  // Исправлено на movie.year
            <br />
            <span className="font-medium">Рейтинг:</span> {movie.rating ?? 'Немає'}  // Исправлено на movie.rating
          </div>
          <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">
            Дивитися трейлер
          </a>  // Исправлено на movie.trailer
        </div>
      ))}
    </div>
  );
};

export default Movies;
