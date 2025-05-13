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
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<MainPage />} />
        <Route path="/sessions" element={<SessionsPage />} />
        <Route path="movie_detail/:id" element={<MovieDetails />} />
        <Route path="buy_button/:id" element={<BuyTicket />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegistrationPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/saved" element={<SavePage />} />
      </Routes>
    </BrowserRouter>
  );
}
export default App;