import { useEffect, useState } from "react";
import axios from "axios";
import movies from '../../movies.json';
import { useParams, useNavigate } from "react-router-dom";
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
import "./MovieDetails.css";

const getDetails = async (data) => {
        try {
            const response = await axios.get('https://localhost:9999/api/Movies', {
                 params:{
                "id": data.id,  
                "poster_url": data.poster_url,
                "title": data.title,
                "description": data.description,
                "genres": data.genres,
                "rating": data.rating,
                "release_year": data.release_year,
                "director": data.director,
                "duration_minutes": data.duration_minutes,
                "trailer_url": data.trailer_url,
                "cast": data.cast
            },
            headers:{
                'Content-Type': 'application/json'
            }
        });
          localStorage.setItem("data", JSON.stringify(response.data));
          reloadPage();
          handleChangeState();
        } catch (error) {
        }
    };

const MovieDetails = () => {
  const { id } = useParams();
const navigate = useNavigate();
  const movie = movies.find((m) => m.id.toString() === id);
  return (
    <div className="movie-page-container">

      <Header />

      <div className="movie-page">
        <main className="movie-main">
          <section className="movie-content">
            <div className="movie-poster">
            <img src={data.poster_url} alt="" className="poster-img" />
            </div>

            <div className="movie-info">
              <div className="info-header">
                <h1 className="movie-title">{data.title}</h1>
                <button className="movie-save" onClick={() => navigate('/saved')}>
                  <img src="./Icons/Zakladku mini.svg" alt="Закладки" className="w-6" />
                </button>
              </div>

              <div className="genre-tags">
                {data.genres.map((g, i) => (
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
                    style={{ opacity: i < Math.round(data.rating) ? 1 : 0.3 }}
                  />
                ))}
                <p className="review-count">{Math.floor(data.rating * 25)} відгуків</p>
              </div>

              <div className="movie-frame" />

              <p className="movie-description">{data.description}</p>

              <button
                className="select-session-btn"
                onClick={() => navigate(`/sessions?movieId=${data.id}`)}>
                Обрати сеанс
                </button>
            </div>

            <aside className="movie-details">
              <div className="detail-block">
                <p className="detail-label">Рік виходу:</p>
                <p className="detail-value">{data.release_year}</p>
              </div>
              <div className="detail-block">
                <p className="detail-label">Режисер:</p>
                <p className="detail-value">{data.director}</p>
              </div>
              <div className="detail-block">
                <p className="detail-label">Час:</p>
                <p className="detail-value">{data.duration_minutes}</p>
              </div>
              <div className="detail-block">
                <p className="detail-label">Актори:</p>
                <p className="detail-value">{data.cast.join(", ")}</p>
              </div>
            </aside>
          </section>

          <section className="movie-trailer">
            <h1 className="trailer-title">Трейлер</h1>
            <div className="trailer-box">
              <iframe
                width="100%"
                height="315"
                src={data.trailer_url.replace("watch?v=", "embed/")}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </section>
        </main>
      </div>
      <Footer></Footer>
    </div>
  );
}

export default MovieDetails;