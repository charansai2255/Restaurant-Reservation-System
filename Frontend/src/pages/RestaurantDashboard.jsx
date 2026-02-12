import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAuth } from '../context/AuthContext';
import { FaCalendar, FaClock, FaUsers, FaCheck, FaTimes, FaTrash, FaUtensils, FaChartLine } from 'react-icons/fa';
import axios from 'axios';
import './RestaurantDashboard.css';

const RestaurantDashboard = () => {
  const navigate = useNavigate();
  const { isAuthenticated, isRestaurant, user } = useAuth();
  const [reservations, setReservations] = useState([]);
  const [filteredReservations, setFilteredReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    today: 0,
    confirmed: 0,
    pending: 0,
    cancelled: 0
  });



  useEffect(() => {
    if (!isAuthenticated || !isRestaurant) {
      navigate('/');
      toast.error('Access denied. Restaurant account required.');
      return;
    }

    // Simulate API call
    setTimeout(() => {
      setReservations(mockRestaurantReservations);
      setFilteredReservations(mockRestaurantReservations);
      calculateStats(mockRestaurantReservations);
      setLoading(false);
    }, 500);
  }, [isAuthenticated, isRestaurant, navigate]);

  const calculateStats = (data) => {
    const today = new Date().toISOString().split('T')[0];
    setStats({
      total: data.length,
      today: data.filter(r => r.date === today).length,
      confirmed: data.filter(r => r.status === 'confirmed').length,
      pending: data.filter(r => r.status === 'pending').length,
      cancelled: data.filter(r => r.status === 'cancelled').length
    });
  };

  const handleFilterChange = (status) => {
    setFilterStatus(status);
    if (status === 'all') {
      setFilteredReservations(reservations);
    } else if (status === 'today') {
      const today = new Date().toISOString().split('T')[0];
      setFilteredReservations(reservations.filter(r => r.date === today));
    } else {
      setFilteredReservations(reservations.filter(r => r.status === status));
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const updatedReservations = reservations.map(res =>
        res._id === id ? { ...res, status: newStatus } : res
      );
      setReservations(updatedReservations);
      handleFilterChange(filterStatus);
      calculateStats(updatedReservations);
      toast.success(`Reservation ${newStatus}`);
    } catch (error) {
      toast.error('Failed to update status');
    }
  };

  const handleDeleteReservation = async (id) => {
    if (!window.confirm('Are you sure you want to delete this reservation?')) {
      return;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 300));
      const updatedReservations = reservations.filter(res => res._id !== id);
      setReservations(updatedReservations);
      handleFilterChange(filterStatus);
      calculateStats(updatedReservations);
      toast.success('Reservation deleted');
    } catch (error) {
      toast.error('Failed to delete reservation');
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="restaurant-dashboard">
        <div className="container">
          <div className="loading">Loading dashboard...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="restaurant-dashboard">
      <div className="dashboard-header">
        <div className="container">
          <div className="header-content">
            <div className="header-text">
              <h1><FaUtensils /> {user?.restaurantName || 'Restaurant'} Dashboard</h1>
              <p>Manage your reservations and track performance</p>
            </div>
            <div className="header-actions">
              <button className="btn btn-secondary">
                <FaChartLine /> View Analytics
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        {/* Stats Section */}
        <div className="stats-section">
          <div className="stat-card card">
            <div className="stat-icon total">
              <FaCalendar />
            </div>
            <div className="stat-content">
              <h3>Total Reservations</h3>
              <p className="stat-number">{stats.total}</p>
            </div>
          </div>
          
          <div className="stat-card card">
            <div className="stat-icon today">
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>Today's Bookings</h3>
              <p className="stat-number">{stats.today}</p>
            </div>
          </div>
          
          <div className="stat-card card confirmed">
            <div className="stat-icon">
              <FaCheck />
            </div>
            <div className="stat-content">
              <h3>Confirmed</h3>
              <p className="stat-number">{stats.confirmed}</p>
            </div>
          </div>
          
          <div className="stat-card card pending">
            <div className="stat-icon">
              <FaClock />
            </div>
            <div className="stat-content">
              <h3>Pending</h3>
              <p className="stat-number">{stats.pending}</p>
            </div>
          </div>
        </div>

        {/* Filter Section */}
        <div className="filter-section">
          <button
            className={`filter-btn ${filterStatus === 'all' ? 'active' : ''}`}
            onClick={() => handleFilterChange('all')}
          >
            All Reservations
          </button>
          <button
            className={`filter-btn ${filterStatus === 'today' ? 'active' : ''}`}
            onClick={() => handleFilterChange('today')}
          >
            Today
          </button>
          <button
            className={`filter-btn ${filterStatus === 'confirmed' ? 'active' : ''}`}
            onClick={() => handleFilterChange('confirmed')}
          >
            Confirmed
          </button>
          <button
            className={`filter-btn ${filterStatus === 'pending' ? 'active' : ''}`}
            onClick={() => handleFilterChange('pending')}
          >
            Pending
          </button>
          <button
            className={`filter-btn ${filterStatus === 'cancelled' ? 'active' : ''}`}
            onClick={() => handleFilterChange('cancelled')}
          >
            Cancelled
          </button>
        </div>

        {/* Reservations Table */}
        <div className="reservations-table card">
          <h2 className="table-title">
            {filterStatus === 'all' ? 'All Reservations' : 
             filterStatus === 'today' ? "Today's Reservations" : 
             `${filterStatus.charAt(0).toUpperCase() + filterStatus.slice(1)} Reservations`}
          </h2>
          
          {filteredReservations.length === 0 ? (
            <div className="empty-message">
              <FaCalendar size={50} color="#ccc" />
              <p>No reservations found</p>
            </div>
          ) : (
            <div className="table-responsive">
              <table>
                <thead>
                  <tr>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Customer</th>
                    <th>Contact</th>
                    <th>Guests</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredReservations.map(reservation => (
                    <tr key={reservation._id}>
                      <td data-label="Date">{formatDate(reservation.date)}</td>
                      <td data-label="Time">{reservation.time}</td>
                      <td data-label="Customer">
                        <div className="customer-info">
                          <strong>{reservation.customerName}</strong>
                          {reservation.specialRequests && (
                            <small className="special-note">{reservation.specialRequests}</small>
                          )}
                        </div>
                      </td>
                      <td data-label="Contact">
                        <div className="contact-info">
                          <div>{reservation.customerEmail}</div>
                          <div>{reservation.customerPhone}</div>
                        </div>
                      </td>
                      <td data-label="Guests">
                        <div className="guests-badge">
                          <FaUsers /> {reservation.guests}
                        </div>
                      </td>
                      <td data-label="Status">
                        <span className={`status-badge status-${reservation.status}`}>
                          {reservation.status}
                        </span>
                      </td>
                      <td data-label="Actions">
                        <div className="action-buttons">
                          {reservation.status === 'pending' && (
                            <button
                              className="btn-action btn-confirm"
                              onClick={() => handleStatusUpdate(reservation._id, 'confirmed')}
                              title="Confirm"
                            >
                              <FaCheck />
                            </button>
                          )}
                          {reservation.status !== 'cancelled' && (
                            <button
                              className="btn-action btn-cancel"
                              onClick={() => handleStatusUpdate(reservation._id, 'cancelled')}
                              title="Cancel"
                            >
                              <FaTimes />
                            </button>
                          )}
                          <button
                            className="btn-action btn-delete"
                            onClick={() => handleDeleteReservation(reservation._id)}
                            title="Delete"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantDashboard;