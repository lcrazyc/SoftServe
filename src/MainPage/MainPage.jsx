import React from "react";
import Header from "../components/header/header";
import Footer from "../components/footer/footer";
import FilmCard from "../components/FilmCard/FilmCard";
import filmsData from "../movies.json";

import "../App.css";
import "./MainPage.css";

const MainPage = () => {
  const currentFilms = filmsData.slice(0, 5);
  const premieres = filmsData.slice(5, 10);

  const scrollRow = (id, direction) => {
    const row = document.getElementById(id);
    if (row) {
      const scrollAmount = 240;
      row.scrollBy({
        left: direction === "right" ? scrollAmount : -scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const renderSection = (title, films, rowId) => (
    <section className="section">
      <h1>{title}</h1>
      <div className="films-row-section">
        <button className="scroll-button side-left" onClick={() => scrollRow(rowId, "left")}>
          <img src="./Icons/Left.svg" alt="←" />
        </button>

        <div className="films-row-wrapper">
          <div className="films-row" id={rowId}>
            {films.map((film) => (
              <FilmCard key={film.id} film={film} />
            ))}
          </div>
        </div>

        <button className="scroll-button side-right" onClick={() => scrollRow(rowId, "right")}>
          <img src="./Icons/Right.svg" alt="→" />
        </button>
      </div>
    </section>
  );

  return (
    <div className="App">
      <Header />
      <main>
        {renderSection("Актуальні фільми", currentFilms, "current-row")}
        {renderSection("Прем'єри", premieres, "premiere-row")}
      </main>
      <Footer />
    </div>
  );
};

export default MainPage;