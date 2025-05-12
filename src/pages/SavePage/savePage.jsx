import React, { useState } from "react";
import Header from '../../components/header/header'; 
import Footer from '../../components/footer/footer'; 
import FilmCard from "../../components/FilmCard/FilmCard";
import filmsData from "../../movies.json";
import "./savePage.css";

const SavePage = () => {
  const [genre, setGenre] = useState("");
  const [year, setYear] = useState("");
  const [rating, setRating] = useState(""); 

  const filteredFilms = filmsData.filter(film => {
    return (
      (genre === "" || film.genre === genre) &&
      (year === "" || film.year.toString() === year) &&
      (rating === "" || (
        Number(film.rating) >= Number(rating) &&
        Number(film.rating) < Number(rating) + 1
      ))
    );
  });

  return (
    <div className="save-container">
      <Header />
      <main className="save-main">
        <h1>Збережені фільми</h1>

        <div className="save-films">
          {filteredFilms.map(film => (
            <FilmCard key={film.id} film={film} />
          ))}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default SavePage;