import React from 'react';
import { Link } from 'react-router-dom';
import { FaUtensils, FaClock, FaAward, FaConciergeBell } from 'react-icons/fa';
import './Home.css';
import logo from "../assets/logo.png";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-overlay">
          <div className="hero-content">
            <h1 className="hero-title">Welcome to DineEase</h1>
            <p className="hero-subtitle">
              Experience culinary excellence in an unforgettable atmosphere
            </p>
            <div className="hero-buttons">
              <Link to="/reservations" className="btn btn-primary">
                Book a Table
              </Link>
              <Link to="/menu" className="btn btn-secondary">
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="features section">
        <div className="container">
          <h2 className="section-title">Why Choose Us</h2>
          <p className="section-subtitle">
            Discover what makes La Maison special
          </p>

          <div className="features-grid grid grid-4">
            <div className="feature-card card">
              <div className="feature-icon">
                <FaUtensils />
              </div>
              <h3>Exquisite Cuisine</h3>
              <p>Crafted by world-renowned chefs using the finest ingredients</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <FaClock />
              </div>
              <h3>Easy Reservations</h3>
              <p>Book your table online in seconds with our simple system</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <FaAward />
              </div>
              <h3>Award Winning</h3>
              <p>Recognized for excellence in fine dining and hospitality</p>
            </div>

            <div className="feature-card card">
              <div className="feature-icon">
                <FaConciergeBell />
              </div>
              <h3>Premium Service</h3>
              <p>Attentive staff dedicated to making your experience perfect</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="about-section section">
        <div className="container">
          <div className="about-content">
            <div className="about-text">
              <h2 className="section-title">Our Story</h2>
              <p>
                Since 2010, DineEase has been a cornerstone of fine dining excellence.
                Our passion for creating memorable culinary experiences drives everything we do.
              </p>
              <p>
                From farm-fresh ingredients to innovative cooking techniques, we combine
                tradition with creativity to deliver dishes that delight all senses.
              </p>
              <Link to="/menu" className="btn btn-primary">
                Explore Our Menu
              </Link>
            </div>

            {/* ✅ LOGO REPLACEMENT */}
            <div className="about-image">
              <div className="image-placeholder">
                <img
                  src={logo}
                  alt="DineEase Logo"
                  className="about-logo"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <div className="cta-content">
            <h2>Ready to Experience Excellence?</h2>
            <p>Reserve your table now and embark on a culinary journey</p>
            <Link
              to="/reservations"
              className="btn btn-primary btn-large"
            >
              Make a Reservation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
