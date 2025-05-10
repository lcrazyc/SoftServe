import React from "react";
import movie from "../movies.json";
import "./MovieDetails.css";

const MovieDetail = () => {
  return (
    <div className="movie-page">
      <main className="movie-main">
        <section className="movie-content">
          <div className="movie-poster">
          <img src={movie.poster} alt="" className="poster-img" />
          </div>

          <div className="movie-info">
            <div className="info-header">
              <p className="movie-title">{movie.title}</p>
              <button className="movie-save">
                <img src="./Icons/Zakladku mini.svg" alt="Закладки" className="w-6" />
              </button>
            </div>

            <div className="genre-tags">
              {movie.genre.map((g, i) => (
                <span key={i} className="genre-tag">{g}</span>
              ))}
            </div>

            <div className="movie-rating">
              {[...Array(5)].map((_, i) => (
                <img
                  key={i}
                  src="./Icons/Star.svg"
                  alt="Зірка"
                  className="w-5"
                  style={{ opacity: i < Math.round(movie.rating) ? 1 : 0.3 }}
                />
              ))}
              <p className="review-count">{Math.floor(movie.rating * 25)} відгуків</p>
            </div>

            <div className="movie-frame" />

            <p className="movie-description">{movie.description}</p>

            <button className="select-session-btn">
              Обрати сеанс
            </button>
          </div>

          <aside className="movie-details">
            <div className="detail-block">
              <p className="detail-label">Рік виходу:</p>
              <p className="detail-value">{movie.year}</p>
            </div>
            <div className="detail-block">
              <p className="detail-label">Режисер:</p>
              <p className="detail-value">{movie.director}</p>
            </div>
            <div className="detail-block">
              <p className="detail-label">Час:</p>
              <p className="detail-value">{movie.duration}</p>
            </div>
            <div className="detail-block">
              <p className="detail-label">Актори:</p>
              <p className="detail-value">{movie.cast.join(", ")}</p>
            </div>
          </aside>
        </section>

        <section className="movie-trailer">
          <p className="trailer-title">Трейлер</p>
          <div className="trailer-box">
            <iframe
              width="100%"
              height="315"
              src={movie.trailer.replace("watch?v=", "embed/")}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      </main>
    </div>
  );
}

export default MovieDetail;
