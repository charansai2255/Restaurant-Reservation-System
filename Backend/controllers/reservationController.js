import Reservation from "../models/Reservation.js";

export const createReservation = async (req, res) => {
  const { date, time, guests, name, email, phone, specialRequests } = req.body;

  try {
    // 🔥 CHECK if date + time already booked by ANY user
    const existingReservation = await Reservation.findOne({
      date,
      time,
      status: { $ne: "cancelled" } // ignore cancelled bookings
    });

    if (existingReservation) {
      return res.status(400).json({
        message: "This time slot is already booked. Please choose another time."
      });
    }

    const reservation = new Reservation({
      user: req.user._id,
      date,
      time,
      guests,
      name,
      email,
      phone,
      specialRequests,
      status: "pending"
    });

    await reservation.save();

    res.status(201).json(reservation);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};


// ✅ Get logged-in user's reservations
export const getMyReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find({ user: req.user._id });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Get ALL reservations (RESTAURANT)
export const getAllReservations = async (req, res) => {
  const reservations = await Reservation.find()
    .populate("user", "name email")
    .sort({ createdAt: -1 });

  res.json(reservations);
};


// ✅ DELETE reservation (USER or RESTAURANT)
export const deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({ message: "Reservation not found" });
    }

    // user can delete ONLY own reservation
    if (
      req.user.role === "user" &&
      reservation.user.toString() !== req.user._id.toString()
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await reservation.deleteOne();

    res.json({ message: "Reservation deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 🔥 Get booked slots by date
export const getBookedSlotsByDate = async (req, res) => {
  try {
    const { date } = req.params;

    const reservations = await Reservation.find({
      date,
      status: { $ne: "cancelled" }
    });

    const bookedTimes = reservations.map(r => r.time);

    res.json(bookedTimes);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
