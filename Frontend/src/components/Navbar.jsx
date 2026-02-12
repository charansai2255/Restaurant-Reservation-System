import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import logo from "../assets/logo.png";
import "./Navbar.css";

const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container container">
        
        {/* ✅ LOGO + BRAND NAME */}
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="DineEase Logo" className="navbar-logo-img" />
          <span className="navbar-logo-text">DineEase</span>
        </Link>

        <ul className="nav-menu">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/menu">Menu</Link>
          </li>

          {/* USER */}
          {isAuthenticated && user?.role === "user" && (
            <>
              <li className="nav-item">
                <Link className="nav-link" to="/reservations">Book Table</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/my-reservations">My Reservations</Link>
              </li>
            </>
          )}

          {/* RESTAURANT */}
          {isAuthenticated && user?.role === "restaurant" && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Restaurant Dashboard</Link>
            </li>
          )}

          {/* AUTH */}
          {!isAuthenticated ? (
            <li className="nav-item">
              <Link className="nav-link" to="/login">Login</Link>
            </li>
          ) : (
            <li className="nav-user">
              <FaUser className="user-icon" />
              <span className="username">{user.name}</span>
              <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
