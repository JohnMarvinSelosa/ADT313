import React from 'react';
import { useRouteError, Link } from 'react-router-dom';

export default function RouteError() {
  const error = useRouteError();

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      textAlign: 'center',
      padding: '20px'
    }}>
      <h1 style={{ fontSize: '2em', color: '#d32f2f', marginBottom: '20px' }}>
        {error.status === 404 ? '404 - Page Not Found' : 'Oops! Something went wrong'}
      </h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>
        {error.statusText || error.message || 'The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.'}
      </p>
      <Link to="/" style={{
        textDecoration: 'none',
        padding: '10px 20px',
        backgroundColor: '#1976d2',
        color: 'white',
        borderRadius: '4px',
        transition: 'background-color 0.3s'
      }}>
        Go Back Home
      </Link>
    </div>
  );
}
