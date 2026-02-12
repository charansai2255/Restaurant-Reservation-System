import React from "react";
import { Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { AuthProvider } from "./context/AuthContext";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";
import MyReservations from "./pages/MyReservations";
import LoginDual from "./pages/LoginDual";
import SignupDual from "./pages/SignupDual";
import AdminDashboard from "./pages/AdminDashboard";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import AdminRoute from "./components/AdminRoute";


function App() {
  return (
    <AuthProvider>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/login" element={<LoginDual />} />
        <Route path="/signup" element={<SignupDual />} />

        {/* Restaurant Dashboard (Protected) */}
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminDashboard />
            </AdminRoute>
          }
        />
      </Routes>

      <Footer />
      <ToastContainer position="top-right" autoClose={3000} />
    </AuthProvider>
  );
}

export default App;
