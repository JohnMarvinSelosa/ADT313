import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { UserProvider } from './contexts/UserContext';
import { AddMovieProvider } from './contexts/AddMovieContext';
import { ViewMovieProvider } from './contexts/ViewMovieContext';
import { UpdateMovieProvider } from './contexts/UpdateMovieContext';
import { ViewClientMovieProvider } from './contexts/ViewClientMovieContext';
import AdminHomepage from './components/admin/dashboard';
import Client from './components/client/client';
import Login from './components/login/login';
import Register from './components/register/register';
import './App.css';

function AppContent() {
  return (
    <div className="page-container">
      <Routes>
      <Route path="/" element={<Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/admin" element={<AdminHomepage />} />
        <Route 
          path="/client" 
          element={
          <ViewClientMovieProvider>
            <Client />
          </ViewClientMovieProvider>
          } 
        />
      </Routes>
    </div>
  );
}


function App() {
  return (
    <Router>
      <UserProvider>
        <AddMovieProvider>
          <ViewMovieProvider>
            <UpdateMovieProvider>
              <AppContent />
            </UpdateMovieProvider>
          </ViewMovieProvider>
        </AddMovieProvider>
      </UserProvider>
    </Router>
  );
}

export default App;

