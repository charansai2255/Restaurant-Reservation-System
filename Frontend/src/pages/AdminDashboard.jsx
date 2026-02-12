import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import { FaTrash } from "react-icons/fa";
import axios from "axios";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔒 Restaurant-only access
  useEffect(() => {
    if (!isAuthenticated || user?.role !== "restaurant") {
      toast.error("Access denied");
      navigate("/");
      return;
    }

    fetchReservations();
  }, [isAuthenticated, user, navigate]);

  const fetchReservations = async () => {
    try {
      const res = await axios.get(
        "http://localhost:5000/api/reservations/all"
      );
      setReservations(res.data);
    } catch (error) {
      toast.error("Failed to load reservations");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this reservation?")) return;

    try {
      await axios.delete(
        `http://localhost:5000/api/reservations/${id}`
      );
      setReservations(reservations.filter(r => r._id !== id));
      toast.success("Reservation deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  if (loading) {
    return (
      <div className="admin-dashboard">
        <div className="loading">Loading reservations...</div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Restaurant Dashboard</h1>
        <p>Total Reservations: {reservations.length}</p>
      </div>

      {reservations.length === 0 ? (
        <p className="empty-message">No reservations found</p>
      ) : (
        <div className="table-responsive card">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Time</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Guests</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {reservations.map((r) => (
                <tr key={r._id}>
                  <td>{new Date(r.date).toLocaleDateString()}</td>
                  <td>{r.time}</td>
                  <td>{r.name}</td>
                  <td>{r.email}</td>
                  <td>{r.phone}</td>
                  <td>{r.guests}</td>
                  <td>
                    <button
                      className="btn-action btn-delete"
                      onClick={() => handleDelete(r._id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
