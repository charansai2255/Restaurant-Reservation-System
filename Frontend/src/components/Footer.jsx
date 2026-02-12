import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>La Maison</h3>
            <p>Experience fine dining at its best. Reserve your table today and enjoy an unforgettable culinary journey.</p>
            <div className="social-icons">
              <a href="#" aria-label="Facebook"><FaFacebook /></a>
              <a href="#" aria-label="Instagram"><FaInstagram /></a>
              <a href="#" aria-label="Twitter"><FaTwitter /></a>
            </div>
          </div>

          <div className="footer-section">
            <h4>Contact Us</h4>
            <div className="contact-info">
              <p><FaPhone /> +1 (555) 123-4567</p>
              <p><FaEnvelope /> info@lamaison.com</p>
              <p><FaMapMarkerAlt /> 123 Culinary Street, Food City, FC 12345</p>
            </div>
          </div>

          <div className="footer-section">
            <h4>Opening Hours</h4>
            <div className="hours">
              <p><strong>Monday - Friday:</strong> 11:00 AM - 10:00 PM</p>
              <p><strong>Saturday - Sunday:</strong> 10:00 AM - 11:00 PM</p>
            </div>
          </div>
        </div>

        <div className="footer-bottom">
          <p>&copy; 2026 La Maison Restaurant. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;