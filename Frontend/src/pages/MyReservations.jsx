import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { FaCalendar, FaClock, FaUsers, FaTrash } from "react-icons/fa";
import axios from "axios";
import "./MyReservations.css";

const MyReservations = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Auth + role guard
  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
      return;
    }

    if (user?.role !== "user") {
      toast.error("Only users can view reservations");
      navigate("/");
      return;
    }

    fetchReservations();
  }, [isAuthenticated, user, navigate]);

  const fetchReservations = async () => {
    try {
      const { data } = await axios.get(
        "http://localhost:5000/api/reservations/my"
      );
      setReservations(data);
    } catch (error) {
      toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  const handleCancelReservation = async (id) => {
    if (!window.confirm("Cancel this reservation?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/reservations/${id}`
      );

      setReservations((prev) =>
        prev.filter((res) => res._id !== id)
      );
      toast.success("Reservation cancelled");
    } catch (error) {
      toast.error("Failed to cancel reservation");
    }
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString(undefined, {
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  if (loading) {
    return (
      <div className="my-reservations-page">
        <div className="container">
          <div className="loading">Loading your reservations...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="my-reservations-page">
      <div className="reservations-header">
        <div className="container">
          <h1>My Reservations</h1>
          <p>Manage your bookings</p>
        </div>
      </div>

      <div className="container">
        {reservations.length === 0 ? (
          <div className="empty-state card">
            <h2>No Reservations Yet</h2>
            <p>Book your first table now!</p>
            <button
              className="btn btn-primary"
              onClick={() => navigate("/reservations")}
            >
              Make a Reservation
            </button>
          </div>
        ) : (
          <div className="reservations-list">
            {reservations.map((r) => (
              <div key={r._id} className="reservation-card card">
                <div className="reservation-header">
                  <span className="status-badge status-confirmed">
                    {r.status || "confirmed"}
                  </span>
                  <button
                    className="btn-delete"
                    onClick={() => handleCancelReservation(r._id)}
                  >
                    <FaTrash />
                  </button>
                </div>

                <div className="reservation-details">
                  <div className="detail-item">
                    <FaCalendar className="icon" />
                    <span>{formatDate(r.date)}</span>
                  </div>

                  <div className="detail-item">
                    <FaClock className="icon" />
                    <span>{r.time}</span>
                  </div>

                  <div className="detail-item">
                    <FaUsers className="icon" />
                    <span>{r.guests} Guests</span>
                  </div>
                </div>

                {r.specialRequests && (
                  <div className="special-requests">
                    <strong>Special Requests:</strong>
                    <p>{r.specialRequests}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyReservations;
