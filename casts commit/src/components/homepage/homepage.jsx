import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from '../../contexts/UserContext';
import Search from './search/search';
import Movies from './movies/movies';
import './homepage.css';

const Homepage = () => {
    const [logoutConfirm, setLogoutConfirm] = useState(false);
    const [activeSection, setActiveSection] = useState('search');
    const navigate = useNavigate();
    const { logout } = useUser();

    const handleLogoutClick = () => {
        setLogoutConfirm(true);
    };

    const handleConfirmLogout = () => {
        logout();
        navigate('/');
    };

    const handleCancelLogout = () => {
        setLogoutConfirm(false);
    };

    const renderSectionContent = () => {
        switch (activeSection) {
            case 'search':
                return <Search />;
            case 'my-movies':
                return <Movies />;
            default:
                return <Search />;
        }
    };

    return (
        <div className="homepage">
            <header className="top-panel">
                <nav className="nav-links">
                    {['search', 'my-movies'].map(section => (
                        <button 
                            key={section}
                            onClick={() => setActiveSection(section)} 
                            className={`nav-button ${activeSection === section ? 'active' : ''}`}
                        >
                            {section.replace('-', ' ').toUpperCase()}
                        </button>
                    ))}
                </nav>
                <div className="logout-section">
                    {logoutConfirm ? (
                        <div className="logout-confirm">
                            <p>Are you sure you want to log out?</p>
                            <div className="logout-actions">
                                <button 
                                    className="cancel-button"
                                    onClick={handleCancelLogout}
                                >
                                    CANCEL
                                </button>
                                <button 
                                    className="logout-button confirm"
                                    onClick={handleConfirmLogout}
                                >
                                    CONFIRM
                                </button>
                            </div>
                        </div>
                    ) : (
                        <button 
                            className="logout-button"
                            onClick={handleLogoutClick}
                        >
                            LOGOUT
                        </button>
                    )}
                </div>
            </header>
            <main className="bottom-panel">
                <div className="content-header">
                    <h1>{activeSection.replace('-', ' ').toUpperCase()} SECTION</h1>
                </div>
                <div className="content-container">
                    {renderSectionContent()}
                </div>
            </main>
        </div>
    );
};

export default Homepage;
