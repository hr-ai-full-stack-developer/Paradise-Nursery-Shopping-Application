import React, { useState } from 'react';
import '../styles/App.css';

/**
 * App.jsx - Main Landing Page Component
 * Displays Paradise Nursery landing page with company name and Get Started button
 */
const App = () => {
  const [showFeatures, setShowFeatures] = useState(false);

  const handleGetStarted = () => {
    setShowFeatures(true);
    const element = document.querySelector('.features-section');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="app-container">
      {/* Header Navigation */}
      <header className="header">
        <div className="logo">🌿 Paradise Nursery</div>
        <nav>
          <ul className="nav-links">
            <li><a href="#home">Home</a></li>
            <li><a href="#products">Products</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Landing Page Hero Section */}
      <section className="landing-content">
        <h1 className="company-title">Paradise Nursery</h1>
        <p className="company-subtitle">Your Green Paradise Awaits</p>
        <p className="company-description">
          Welcome to Paradise Nursery, your ultimate destination for premium plants and gardening supplies.
          Discover a world of green, where nature meets convenience. Start your gardening journey today!
        </p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </section>

      {/* Features Section */}
      {showFeatures && (
        <section className="features-section">
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">🌱</div>
              <h3>Premium Plants</h3>
              <p>Hand-picked selection of healthy, thriving plants for every skill level.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📦</div>
              <h3>Fast Delivery</h3>
              <p>Quick and reliable shipping to your doorstep with care instructions.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">💚</div>
              <h3>Expert Support</h3>
              <p>Get professional gardening advice and plant care tips from our experts.</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">🌍</div>
              <h3>Eco-Friendly</h3>
              <p>Sustainable practices and recyclable packaging for a better planet.</p>
            </div>
          </div>
        </section>
      )}

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 Paradise Nursery. Growing your green dreams. | All Rights Reserved</p>
      </footer>
    </div>
  );
};

export default App;
