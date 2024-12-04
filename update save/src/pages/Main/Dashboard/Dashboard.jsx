import React from 'react';
import './Dashboard.css';

function Dashboard() {
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>Dashboard</h1>
        <p>Welcome to the dashboard. Here are your insights!</p>
      </header>
      <nav className="dashboard-nav">
        <ul>
          <li><a href="#home">Home</a></li>
          <li><a href="#profile">Profile</a></li>
          <li><a href="#settings">Settings</a></li>
          <li><a href="#logout">Logout</a></li>
        </ul>
      </nav>
      <main className="dashboard-main">
        <h2>Overview</h2>
        <p>This is where you can see an overview of your data, stats, and other details.</p>
      </main>
    </div>
  );
}

export default Dashboard;
