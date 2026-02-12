import apolloFish from "../assets/menu/apollofish.jpg";
import butterChicken from "../assets/menu/butter-chicken.jpg";
import chickenBiryani from "../assets/menu/chicken-biryani.jpg";
import chicken65 from "../assets/menu/chicken65.jpg";
import doubleKaMeetha from "../assets/menu/double-ka-meetha.jpg";
import muttonCurry from "../assets/menu/mutton-curry.jpg";
import muttonBiryani from "../assets/menu/mutton-biryani.jpg";
import paneerButterMasala from "../assets/menu/paneer-butter-masala.jpg";
import paneer65 from "../assets/menu/paneer65.jpg";
import qubaniKaMeetha from "../assets/menu/qubani-ka-meetha.jpg";
import vegDumBiryani from "../assets/menu/veg-dum-biryani.jpg";



import React, { useState, useEffect } from "react";
import "./Menu.css";

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);

  // 🍽️ Hyderabad / Telangana Style Menu Data (with real images)
  const mockMenuData = [
  // 🌶️ Starters
  {
    _id: "1",
    name: "Chicken 65",
    category: "Starters",
    price: 299,
    description: "Crispy Hyderabadi-style fried chicken",
    image: chicken65,
  },
  {
    _id: "2",
    name: "Paneer 65",
    category: "Starters",
    price: 249,
    description: "Fried paneer tossed in spicy Hyderabadi masala",
    image: paneer65,
  },
  {
    _id: "3",
    name: "Apollo Fish",
    category: "Starters",
    price: 349,
    description: "Boneless fish fried with chilli and garlic",
    image: apolloFish,
  },

  // 🍛 Biryanis
  {
    _id: "4",
    name: "Chicken Dum Biryani",
    category: "Biryani",
    price: 399,
    description: "Traditional Hyderabadi dum chicken biryani",
    image: chickenBiryani,
  },
  {
    _id: "5",
    name: "Mutton Dum Biryani",
    category: "Biryani",
    price: 499,
    description: "Slow-cooked mutton biryani with aromatic spices",
    image: muttonBiryani,
  },
  {
    _id: "6",
    name: "Veg Dum Biryani",
    category: "Biryani",
    price: 299,
    description: "Mixed vegetable biryani cooked in dum style",
    image: vegDumBiryani,
  },

  // 🍲 Curries
  {
    _id: "7",
    name: "Butter Chicken",
    category: "Curries",
    price: 349,
    description: "Creamy tomato-based chicken curry",
    image: butterChicken,
  },
  {
    _id: "8",
    name: "Mutton Curry",
    category: "Curries",
    price: 429,
    description: "Spicy Hyderabadi-style mutton curry",
    image: muttonCurry,
  },
  {
    _id: "9",
    name: "Paneer Butter Masala",
    category: "Curries",
    price: 299,
    description: "Rich and creamy paneer curry",
    image: paneerButterMasala,
  },

  // 🍨 Desserts
  {
    _id: "10",
    name: "Double Ka Meetha",
    category: "Desserts",
    price: 149,
    description: "Classic Hyderabadi bread dessert",
    image: doubleKaMeetha,
  },
  {
    _id: "11",
    name: "Qubani Ka Meetha",
    category: "Desserts",
    price: 159,
    description: "Apricot dessert served with cream",
    image: qubaniKaMeetha,
  },
];


  useEffect(() => {
    setTimeout(() => {
      setMenuItems(mockMenuData);
      setLoading(false);
    }, 500);
  }, []);

  const categories = [
    "All",
    "Starters",
    "Biryani",
    "Curries",
    "Desserts",
    
  ];

  const filteredItems =
    selectedCategory === "All"
      ? menuItems
      : menuItems.filter((item) => item.category === selectedCategory);

  if (loading) {
    return (
      <div className="menu-page">
        <div className="container">
          <div className="loading">Loading menu...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="menu-page">
      <div className="menu-header">
        <div className="container">
          <h1>Our Menu</h1>
          <p>Authentic Hyderabad & Telangana Cuisine</p>
        </div>
      </div>

      <div className="container">
        <div className="menu-categories">
          {categories.map((category) => (
            <button
              key={category}
              className={`category-btn ${
                selectedCategory === category ? "active" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="menu-grid grid grid-3">
          {filteredItems.map((item) => (
            <div key={item._id} className="menu-item card">
              <img
                src={item.image}
                alt={item.name}
                className="menu-item-image"
              />
              <div className="menu-item-content">
                <div className="menu-item-header">
                  <h3>{item.name}</h3>
                  <span className="price">₹{item.price}</span>
                </div>
                <p className="description">{item.description}</p>
                <span className="category-badge">{item.category}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Menu;
