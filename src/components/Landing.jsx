import React from 'react';
import { Link } from 'react-router-dom';
import '../Landing.css';

const Landing = () => {
  return (
    <div className="landing">
      <header className="landing-header">
        <div className="container">
          <h1 className="landing-title">React User & Post Explorer</h1>
          <p className="landing-subtitle">
            A modern React application for browsing users and their posts with advanced search capabilities
          </p>
        </div>
      </header>

      <main className="landing-main">
        <div className="container">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h2>User Management</h2>
              <p>
                Browse through a comprehensive list of users with detailed information including 
                names, emails, phone numbers, and websites.
              </p>
              <ul className="feature-list">
                <li>Real-time search by name or email</li>
                <li>Keyboard navigation with arrow keys</li>
                <li>Responsive grid layout</li>
                <li>Loading states and error handling</li>
              </ul>
              <Link to="/users" className="feature-button">
                Explore Users →
              </Link>
            </div>

            <div className="feature-card">
              <div className="feature-icon">📝</div>
              <h2>Post Explorer</h2>
              <p>
                Dive into individual posts with full content display, search by post ID, 
                and seamless navigation between posts.
              </p>
              <ul className="feature-list">
                <li>Search posts by ID</li>
                <li>Previous/Next post navigation</li>
                <li>Clean, readable layout</li>
                <li>Keyboard shortcuts support</li>
              </ul>
              <Link to="/users" className="feature-button">
                Start Exploring →
              </Link>
            </div>
          </div>

          <div className="tech-section">
            <h2>Built with Modern Technologies</h2>
            <div className="tech-grid">
              <div className="tech-item">
                <div className="tech-icon">⚛️</div>
                <h3>React 18</h3>
                <p>Latest React features with hooks and functional components</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">🎨</div>
                <h3>Modern CSS</h3>
                <p>Flexbox, Grid, and responsive design principles</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">🔍</div>
                <h3>Advanced Search</h3>
                <p>Real-time filtering with keyboard navigation</p>
              </div>
              <div className="tech-item">
                <div className="tech-icon">📱</div>
                <h3>Responsive Design</h3>
                <p>Optimized for desktop, tablet, and mobile devices</p>
              </div>
            </div>
          </div>

          <div className="demo-section">
            <h2>Key Features</h2>
            <div className="demo-grid">
              <div className="demo-item">
                <h3>🎯 User Search</h3>
                <p>Type to filter users by name or email in real-time</p>
              </div>
              <div className="demo-item">
                <h3>⌨️ Keyboard Navigation</h3>
                <p>Use arrow keys to navigate and Enter to select</p>
              </div>
              <div className="demo-item">
                <h3>📄 Post Browsing</h3>
                <p>Search posts by ID and navigate between them</p>
              </div>
              <div className="demo-item">
                <h3>⚡ Fast & Responsive</h3>
                <p>Optimized performance with loading states</p>
              </div>
            </div>
          </div>

          <div className="cta-section">
            <h2>Ready to Explore?</h2>
            <p>Start browsing users and their posts with our intuitive interface</p>
            <div className="cta-buttons">
              <Link to="/users" className="cta-button primary">
                Get Started
              </Link>
              <Link to="/users" className="cta-button secondary">
                View Demo
              </Link>
            </div>
          </div>
        </div>
      </main>

      <footer className="landing-footer">
        <div className="container">
          <p>&copy; 2024 React User & Post Explorer. Built with ❤️ using React.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing; 