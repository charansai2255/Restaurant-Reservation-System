import express from "express";
import protect from "../middleware/authMiddleware.js";
import { restaurantOnly } from "../middleware/restaurentMiddleware.js";
import {
  createReservation,
  getMyReservations,
  getAllReservations,
  deleteReservation, // ✅ IMPORT FIX
} from "../controllers/reservationController.js";

const router = express.Router();

// USER
router.post("/", protect, createReservation);
router.get("/my", protect, getMyReservations);

// RESTAURANT
router.get("/all", protect, restaurantOnly, getAllReservations);

// DELETE (user or restaurant)
router.delete("/:id", protect, deleteReservation);

router.get("/booked/:date", protect, getBookedSlotsByDate);

export default router;
