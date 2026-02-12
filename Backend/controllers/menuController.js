import MenuItem from "../models/Menuitem.js";

export const getMenu = async (req, res) => {
  const items = await MenuItem.find();
  res.json(items);
};

export const createMenuItem = async (req, res) => {
  const item = await MenuItem.create(req.body);
  res.status(201).json(item);
};

export const deleteMenuItem = async (req, res) => {
  await MenuItem.findByIdAndDelete(req.params.id);
  res.json({ message: "Item deleted" });
};
