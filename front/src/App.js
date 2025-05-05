import React from 'react';
import movies from './movies.json';  // assuming movies.json is in the same directory as your component


const Movies = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {movies.map((movie) => (
        <div key={movies.id} className="rounded-2xl shadow-lg p-4 bg-white">
          <img src={movies.poster} alt={movies.title} className="rounded-xl w-full h-60 object-cover mb-4" />
          <h2 className="text-xl font-semibold">{movies.title}</h2>
          <p className="text-sm text-gray-600">{movies.description.slice(0, 150)}...</p>
          <div className="mt-2">
            <span className="text-sm font-medium">Жанр: </span>{movies.genre.join(', ')}
          </div>
          <div className="mt-1 text-sm">
            <span className="font-medium">Рік:</span> {movies.year}
            <br />
            <span className="font-medium">Рейтинг:</span> {movies.rating ?? 'Немає'}
          </div>
          <a href={movies.trailer} target="_blank" rel="noopener noreferrer" className="text-blue-600 mt-2 inline-block">
            Дивитися трейлер
          </a>
        </div>
      ))}
    </div>
  );
};

export default Movies;
