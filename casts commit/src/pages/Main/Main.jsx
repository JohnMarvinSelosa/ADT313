import React from 'react';
import { Outlet, Link, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/context';

const Main = () => {
  const { auth, setAuth } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem('accessToken');
    navigate('/');
  };

  return (
    <div className="main-layout">
      <nav className="main-nav">
        <ul>
          <li>
            <Link to="/main/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/main/movies">Movies</Link>
          </li>
          <li>
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default Main;
