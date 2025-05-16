import { BrowserRouter, Link, Route,Navigate, Routes } from "react-router-dom";
import React from "react";
import SessionsPage from './pages/SessionsPage/Sessions';
import './App.css';
import MovieDetails from "./pages/MovieDetails/MovieDetails";
import BuyTicket from './pages/BuyTicket/BuyTicket'
import MainPage from './pages/MainPage/MainPage';
import LoginPage from "./pages/LoginPage/LoginPage";
import RegistrationPage from './pages/RegistrationPage/RegistrationPage'
import AccountPage from './pages/AccountPage/accountPage'
import SearchPage from './pages/SearchPage/SearchPage';
import SavePage from "./pages/SavePage/savePage";
import AdminMoviesPage from './pages/AdminMoviesPage/AdminMoviesPage';
import AddMoviePage from './pages/AdminMoviesPage/AddMoviePage';
import EditMoviePage from './pages/AdminMoviesPage/EditMoviePage';
import SearchResults from './pages/SearchResults';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="movie_detail/:id" element={<MovieDetails />} />
        <Route path="buy_button/:id" element={<BuyTicket />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/account/:id" element={<AccountPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/admin/movies" element={<AdminMoviesPage />} />
        <Route path="/admin/movies/add" element={<AddMoviePage />} />
        <Route path="/admin/movies/edit/:id" element={<EditMoviePage />} />
        <Route path="/search" element={<SearchResults />} />
        <Route path="/searchh" element={<SearchPage />} />
        <Route path="/saved" element={<SavePage />} />       
      </Routes>
    </BrowserRouter>
  );
}
export default App;