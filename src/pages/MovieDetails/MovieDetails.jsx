import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import "./MovieDetails.css";

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`https://localhost:9999/api/Movies/${id}`);
        setMovie(response.data);
      } catch (error) {
        console.error("Помилка:", error);
      }
    };

    fetchMovie();
  }, [id]);

  if (!movie) {
    return <div>Завантаження...</div>;
  }

  return (
    <div className="movie-page-container">
      <Header />
      <div className="movie-page">
        <main className="movie-main">
          <section className="movie-content">
            <div className="movie-poster">
              <img src={movie.poster_url} alt="" className="poster-img" />
            </div>

            <div className="movie-info">
              <div className="info-header">
                <h1 className="movie-title">{movie.title}</h1>
                <button className="movie-save" onClick={() => navigate('/saved')}>
                  <img src="../../Icons/ZakladkuMini.svg" alt="Закладки" className="w-6" />
                </button>
              </div>

              <div className="genre-tags">
                {movie.genres?.split(',').map((g, i) => (
                  <span key={i} className="genre-tag">{g.trim()}</span>
                ))}
              </div>

              <div className="movie-rating">
                {[...Array(5)].map((_, i) => (
                  <img
                    key={i}
                    src="/Icons/Star.svg"
                    alt="Зірка"
                    className="w-5"
                    style={{ opacity: i < Math.round(movie.rating) ? 1 : 0.3 }}
                  />
                ))}
                <p className="review-count">{Math.floor(movie.rating * 25)} відгуків</p>
              </div>

              <div className="movie-frame" />
              <p className="movie-description">{movie.description}</p>

              <button
                className="select-session-btn"
                onClick={() => navigate(`/sessions?movieId=${movie.id}`)}
              >
                Обрати сеанс
              </button>
            </div>

            <aside className="movie-details">
              <div className="detail-block">
                <p className="detail-label">Рік виходу:</p>
                <p className="detail-value">{movie.release_year}</p>
              </div>
              <div className="detail-block">
                <p className="detail-label">Режисер:</p>
                <p className="detail-value">{movie.director}</p>
              </div>
              <div className="detail-block">
                <p className="detail-label">Час:</p>
                <p className="detail-value">{movie.duration_minutes} хв</p>
              </div>
              <div className="detail-block">
                <p className="detail-label">Актори:</p>
                <p className="detail-value">{movie.cast}</p>
              </div>
            </aside>
          </section>

          <section className="movie-trailer">
            <h1 className="trailer-title">Трейлер</h1>
            <div className="trailer-box">
              <iframe
                width="100%"
                height="315"
                src={movie.trailer_url?.replace("watch?v=", "embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        </main>
      </div>
      <Footer />
    </div>
  );
};

export default MovieDetails;
