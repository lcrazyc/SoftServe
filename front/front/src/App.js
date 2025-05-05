import React from 'react';
import movies from './data/movie.json';

const Movies = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {movies.map((movie) => (
        <div key={movie.id} className="rounded-2xl shadow-lg p-4 bg-white">
          <img src={movie.poster} alt={movie.title} className="rounded-xl w-full h-60 object-cover mb-4" />
          <h2 className="text-xl font-semibold">{movie.title}</h2>
          <p className="text-sm text-gray-600">{movie.description.slice(0, 150)}...</p>
          <div className="mt-2">
            <span className="text-sm font-medium">Жанр: </span>{movie.genre.join(', ')}
          </div>
          <div className="mt-1 text-sm">
            <span className="font-medium">Рік:</span> {movie.year}
            <br />
            <span className="font-medium">Рейтинг:</span> {movie.rating ?? 'Немає'}
          </div>
          <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">
            Дивитися трейлер
          </a>
        </div>
      ))}
    </div>
  );
};

export default Movies;
