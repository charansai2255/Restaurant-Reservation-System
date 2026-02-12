import express from "express";
import protect from "../middleware/authMiddleware.js";
import { restaurantOnly } from "../middleware/restaurentMiddleware.js";
import {
  getMenu,
  createMenuItem,
  deleteMenuItem,
} from "../controllers/menuController.js";

const router = express.Router();

// public
router.get("/", getMenu);

// restaurant only
router.post("/", protect, restaurantOnly, createMenuItem);
router.delete("/:id", protect, restaurantOnly, deleteMenuItem);

export default router;
