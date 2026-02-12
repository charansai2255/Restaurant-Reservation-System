import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { FaUser, FaStore } from 'react-icons/fa';
import axios from 'axios';
import './Auth.css';

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  
  const [accountType, setAccountType] = useState('user'); // 'user' or 'restaurant'
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    // Restaurant-specific fields
    restaurantName: '',
    restaurantAddress: '',
    cuisineType: ''
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }

    if (formData.password.length < 6) {
      toast.error('Password must be at least 6 characters long');
      return;
    }

    setLoading(true);

    try {
      // Replace with actual API endpoint
      // const response = await axios.post('http://localhost:5000/api/auth/signup', {
      //   ...formData,
      //   accountType
      // });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response
      const mockUser = {
        name: accountType === 'restaurant' ? formData.restaurantName : formData.name,
        email: formData.email,
        accountType: accountType,
        role: accountType === 'restaurant' ? 'admin' : 'user'
      };
      const mockToken = 'mock-jwt-token-12345';
      
      login(mockUser, mockToken);
      toast.success(`${accountType === 'restaurant' ? 'Restaurant' : 'Account'} created successfully!`);
      
      // Redirect based on account type
      if (accountType === 'restaurant') {
        navigate('/restaurant-dashboard');
      } else {
        navigate('/');
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-container">
        <div className="auth-card card">
          <h2>Create Account</h2>
          <p className="auth-subtitle">Join us for an exceptional experience</p>

          {/* Account Type Selection */}
          <div className="account-type-selector">
            <button
              type="button"
              className={`account-type-btn ${accountType === 'user' ? 'active' : ''}`}
              onClick={() => setAccountType('user')}
            >
              <FaUser className="account-icon" />
              <span>Customer</span>
            </button>
            <button
              type="button"
              className={`account-type-btn ${accountType === 'restaurant' ? 'active' : ''}`}
              onClick={() => setAccountType('restaurant')}
            >
              <FaStore className="account-icon" />
              <span>Restaurant</span>
            </button>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            {accountType === 'user' ? (
              // Customer Fields
              <>
                <div className="form-group">
                  <label htmlFor="name">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>
              </>
            ) : (
              // Restaurant Fields
              <>
                <div className="form-group">
                  <label htmlFor="restaurantName">Restaurant Name</label>
                  <input
                    type="text"
                    id="restaurantName"
                    name="restaurantName"
                    value={formData.restaurantName}
                    onChange={handleChange}
                    placeholder="Enter restaurant name"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Business Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="business@restaurant.com"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Business Phone</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="restaurantAddress">Restaurant Address</label>
                  <input
                    type="text"
                    id="restaurantAddress"
                    name="restaurantAddress"
                    value={formData.restaurantAddress}
                    onChange={handleChange}
                    placeholder="123 Main St, City, State"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cuisineType">Cuisine Type</label>
                  <select
                    id="cuisineType"
                    name="cuisineType"
                    value={formData.cuisineType}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select cuisine type</option>
                    <option value="italian">Italian</option>
                    <option value="french">French</option>
                    <option value="chinese">Chinese</option>
                    <option value="japanese">Japanese</option>
                    <option value="indian">Indian</option>
                    <option value="mexican">Mexican</option>
                    <option value="american">American</option>
                    <option value="mediterranean">Mediterranean</option>
                    <option value="fusion">Fusion</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </>
            )}

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="At least 6 characters"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Re-enter your password"
                required
              />
            </div>

            <button type="submit" className="btn btn-primary btn-block" disabled={loading}>
              {loading ? 'Creating Account...' : `Sign Up as ${accountType === 'restaurant' ? 'Restaurant' : 'Customer'}`}
            </button>
          </form>

          <div className="auth-footer">
            <p>Already have an account? <Link to="/login">Login here</Link></p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;