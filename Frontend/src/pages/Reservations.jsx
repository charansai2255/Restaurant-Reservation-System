import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
import "./Reservations.css";

const Reservations = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useAuth();

  const [formData, setFormData] = useState({
    date: "",
    time: "",
    guests: "2",
    name: "",
    email: "",
    phone: "",
    specialRequests: "",
  });

  const [loading, setLoading] = useState(false);

  // ✅ Autofill name & email from logged in user
  useEffect(() => {
    if (user) {
      setFormData((prev) => ({
        ...prev,
        name: user.name || "",
        email: user.email || "",
      }));
    }
  }, [user]);

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value,
  });

  if (e.target.name === "date") {
    fetchBookedSlots(e.target.value);
  }
};


  const handleSubmit = async (e) => {
    e.preventDefault();

    // 🔒 Auth check
    if (!isAuthenticated || !user) {
      toast.info("Please login to make a reservation");
      return navigate("/login");
    }

    // 🔒 Role check (restaurants cannot book)
    if (user.role !== "user") {
      toast.error("Only users can make reservations");
      return;
    }

    setLoading(true);

    try {
      await axios.post("http://localhost:5000/api/reservations", formData);

      toast.success("Reservation created successfully!");
      navigate("/my-reservations");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to create reservation"
      );
    } finally {
      setLoading(false);
    }
  };

  // Generate time slots
  const timeSlots = [];
  for (let hour = 11; hour <= 21; hour++) {
    timeSlots.push(`${hour}:00`);
    if (hour !== 21) timeSlots.push(`${hour}:30`);
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="reservations-page">
      <div className="reservations-header">
        <div className="container">
          <h1>Reserve Your Table</h1>
          <p>Book your dining experience in just a few clicks</p>
        </div>
      </div>

      <div className="container">
        <div className="reservation-content">
          <div className="reservation-form-wrapper">
            <form className="reservation-form card" onSubmit={handleSubmit}>
              <h2>Reservation Details</h2>

              <div className="form-row">
                <div className="form-group">
                  <label>Date *</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    min={today}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Time *</label>
                  <select
                   id="time"
                   name="time"
                   value={formData.time}
                   onChange={handleChange}
                       required
>
                      <option value="">Select time</option>

                         {timeSlots.map((slot) => (
                                  <option
                                 key={slot}
                         value={slot}
                               disabled={bookedSlots.includes(slot)}
    >
                         {slot} {bookedSlots.includes(slot) ? "(Booked)" : ""}
                              </option>
                   ))}
                </select>

                </div>
              </div>

              <div className="form-group">
                <label>Guests *</label>
                <select
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? "Guest" : "Guests"}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Full Name *</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Email *</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Phone *</label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Special Requests</label>
                <textarea
                  name="specialRequests"
                  value={formData.specialRequests}
                  onChange={handleChange}
                  rows="4"
                />
              </div>

              <button
                type="submit"
                className="btn btn-primary btn-block"
                disabled={loading}
              >
                {loading ? "Processing..." : "Confirm Reservation"}
              </button>
            </form>
          </div>

          <div className="reservation-info">
            <div className="info-card card">
              <h3>Important Information</h3>
              <ul>
                <li>Arrive within 15 minutes</li>
                <li>Cancel up to 24 hours before</li>
                <li>For parties above 8, call us</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const [bookedSlots, setBookedSlots] = useState([]);

const fetchBookedSlots = async (selectedDate) => {
  try {
    const { data } = await axios.get(
      `http://localhost:5000/api/reservations/booked/${selectedDate}`,
      {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      }
    );

    setBookedSlots(data);
  } catch (error) {
    console.error("Error fetching booked slots");
  }
};


export default Reservations;
