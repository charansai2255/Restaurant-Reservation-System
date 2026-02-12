import mongoose from "mongoose";

const menuItemSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    category: String,
    price: Number,
    description: String,
    image: String,
  },
  { timestamps: true }
);

export default mongoose.model("MenuItem", menuItemSchema);
