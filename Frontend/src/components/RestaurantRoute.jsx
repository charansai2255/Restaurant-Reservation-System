import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RestaurantRoute = ({ children }) => {
  const { user } = useAuth();

  if (!user || user.role !== "restaurant") {
    return <Navigate to="/login" />;
  }

  return children;
};

export default RestaurantRoute;
