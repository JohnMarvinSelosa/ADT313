import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserProvider } from "./contexts/UserContext";
import { AddMovieProvider } from './contexts/AddMovieContext';
import { ViewMovieProvider } from './contexts/ViewMovieContext';
import { UpdateMovieProvider } from './contexts/UpdateMovieContext';
import Login from "./components/login/login";
import Register from "./components/register/register";
import Homepage from "./components/homepage/homepage";
import "./App.css";

function App() {
  return (
    <div className="app-container">
      <div className="page-container">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/homepage" element={<Homepage />} />
        </Routes>
      </div>
    </div>
  );
}

function AppWrapper() {
  return (
    <Router>
      <UserProvider>
        <AddMovieProvider>
          <ViewMovieProvider>
            <UpdateMovieProvider>
              <App />
            </UpdateMovieProvider>
          </ViewMovieProvider>
        </AddMovieProvider>
      </UserProvider>
    </Router>
  );
}

export default AppWrapper;
