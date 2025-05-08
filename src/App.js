import React from "react";
// import MoviesList from "./MainPage/MoviesList";
import Header from "./header";
import "./App.css";


function App() {
  return (
    <div className="App bg-gray-100 min-h-screen flex flex-col">
      <header >
      <Header />
      </header>

      {/* <main className="flex-grow">
        <MoviesList />
      </main> */}

    </div>
  );
}

export default App;