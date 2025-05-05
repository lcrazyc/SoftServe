import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { FaFacebookF, FaEnvelope, FaPhone } from "react-icons/fa";
import axios from "axios";
axios.get(`${import.meta.env.VITE_API_URL}/api/movies`)

const MovieCard = ({ movie }) => (
  <Card className="bg-black text-white w-40 md:w-48 rounded-xl overflow-hidden">
    <div className="bg-gray-800 h-48 w-full flex items-center justify-center">
      {movie.poster_url ? (
        <img
          src={movie.poster_url}
          alt={movie.title}
          className="h-full w-full object-cover"
        />
      ) : (
        <div className="bg-checkerboard h-32 w-32" />
      )}
    </div>
    <CardContent className="p-2 text-sm">
      <div className="font-bold mb-1 truncate">{movie.title}</div>
      <div className="flex items-center text-xs text-gray-300 mb-1">
        {[...Array(Math.round(movie.rating || 0))].map((_, i) => (
          <Star key={i} size={12} className="text-yellow-400" />
        ))}
        <span className="ml-1">{movie.rating || "0.0"}</span>
      </div>
      <div className="text-xs text-gray-400 mb-2">
        {movie.duration_minutes} хв / {movie.release_year} рік
      </div>
      <Button className="w-full text-xs mb-1">Детальніше про фільм</Button>
      <Button className="w-full text-xs" variant="secondary">Купити квиток</Button>
    </CardContent>
  </Card>
);

const Section = ({ title, movies }) => (
  <div className="my-8">
    <h2 className="text-white text-xl font-bold mb-4">{title}</h2>
    <div className="flex gap-4 overflow-x-auto pb-2">
      {movies.map((movie) => (
        <MovieCard key={movie.id} movie={movie} />
      ))}
    </div>
  </div>
);

export default function MoviePage() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    // Підключення до backend API, який отримує фільми з бази даних
    axios
      .get("http://localhost:3001/api/movies")
      .then((response) => setMovies(response.data))
      .catch((err) => console.error("Error fetching movies:", err));
  }, []);

  return (
    <div className="bg-gray-900 min-h-screen text-white">
      <header className="flex justify-between items-center px-4 py-2 bg-gray-800">
        <div className="text-cyan-400 font-bold">●</div>
        <input
          type="text"
          placeholder="Пошук..."
          className="px-2 py-1 rounded bg-gray-700 text-white"
        />
        <div className="flex gap-3">
          <div className="text-cyan-400">🔖</div>
          <div className="text-white">👤</div>
          <div className="text-white">≡</div>
        </div>
      </header>

      <main className="px-4">
        <Section title="Актуальні фільми" movies={movies.slice(0, 6)} />
        <Section title="Прем'єри" movies={movies.slice(6, 12)} />
      </main>

      <footer className="flex justify-center gap-6 py-4 border-t border-gray-700">
        <FaEnvelope className="text-cyan-400 text-xl" />
        <FaFacebookF className="text-cyan-400 text-xl" />
        <FaPhone className="text-cyan-400 text-xl" />
      </footer>
    </div>
  );
}

// Додайте цей CSS клас у глобальні стилі або tailwind.config.js
// .bg-checkerboard {
//   background-image: linear-gradient(45deg, #fff 25%, transparent 25%),
//     linear-gradient(-45deg, #fff 25%, transparent 25%),
//     linear-gradient(45deg, transparent 75%, #fff 75%),
//     linear-gradient(-45deg, transparent 75%, #fff 75%);
//   background-size: 20px 20px;
//   background-position: 0 0, 0 10px, 10px -10px, -10px 0px;
// }
