import React from 'react';
import { Link } from 'react-router-dom';
import './Landing.css';

const Landing = () => {
  return (
    <div className="landing-home">
      <header className="home-header">
        <nav className="home-nav">
          <div className="home-logo">UserPost<span className="logo-accent">Explorer</span></div>
          <ul className="home-menu">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/users">Users</Link></li>
            <li><Link to="/posts">Posts</Link></li>
          </ul>
        </nav>
        <div className="home-hero">
          <h1>Welcome to UserPost Explorer</h1>
          <p>Browse users and posts with a modern, responsive React app.</p>
          <div className="home-cta">
            <Link to="/users" className="home-btn primary">Get Started</Link>
            <Link to="/posts" className="home-btn secondary">View Posts</Link>
          </div>
        </div>
      </header>
      <main className="home-main">
        <section className="home-features">
          <h2>Features</h2>
          <div className="features-list">
            <div className="feature">
              <span role="img" aria-label="users">👥</span>
              <h3>User Management</h3>
              <p>Browse, search, and view user details easily.</p>
            </div>
            <div className="feature">
              <span role="img" aria-label="posts">📝</span>
              <h3>Post Explorer</h3>
              <p>Search posts by ID, view content, and navigate quickly.</p>
            </div>
            <div className="feature">
              <span role="img" aria-label="responsive">📱</span>
              <h3>Responsive Design</h3>
              <p>Optimized for all devices and screen sizes.</p>
            </div>
          </div>
        </section>
      </main>
      <footer className="home-footer">
        <p>&copy; 2025 UserPost Explorer. Built with React & Tailwind CSS.</p>
      </footer>
    </div>
  );
};

export default Landing;