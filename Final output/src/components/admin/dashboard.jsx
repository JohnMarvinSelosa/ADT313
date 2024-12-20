import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import AdminMovies from './movies/movies';
import Search from './search/search';
import './dashboard.css';

const AdminHomepage = () => {
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const [activeSection, setActiveSection] = useState('search');
    const navigate = useNavigate();
    const { logout, user } = useUser();

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/login');
        }
        setActiveSection('search');
    }, [user, navigate]);

    const handleLogoutClick = () => setLogoutConfirm(true);
    const handleConfirmLogout = () => {
        logout();
        navigate('/login');
    };
    const handleCancelLogout = () => setLogoutConfirm(false);

    return (
        <div className="admin-homepage">
            <header className="header">
                <nav className="nav-links">
                    <button 
                        onClick={() => setActiveSection('search')} 
                        className={activeSection === 'search' ? 'active' : ''}
                    >
                        SEARCH
                    </button>
                    <button 
                        onClick={() => setActiveSection('my-movies')} 
                        className={activeSection === 'my-movies' ? 'active' : ''}
                    >
                        SINEMOVIES
                    </button>
                </nav>

                <div className="logout-container">
                    {logoutConfirm ? (
                        <>
                            <button 
                                className="secondary"
                                onClick={handleCancelLogout}
                            >
                                Cancel
                            </button>
                            <button 
                                className="success"
                                onClick={handleConfirmLogout}
                            >
                                Confirm Logout
                            </button>
                        </>
                    ) : (
                        <button 
                            className="danger"
                            onClick={handleLogoutClick}
                        >
                            Logout
                        </button>
                    )}
                </div>
            </header>
            <main className="main-content">
                {activeSection === 'search' && <Search />}
                {activeSection === 'my-movies' && <AdminMovies />}
            </main>
        </div>
    );
};

export default AdminHomepage;


