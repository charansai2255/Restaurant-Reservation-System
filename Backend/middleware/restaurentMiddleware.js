const restaurantOnly = (req, res, next) => {
  if (req.user && req.user.role === "restaurant") {
    return next();
  }

  return res.status(403).json({
    message: "Access denied. Restaurant account required.",
  });
};

export { restaurantOnly };
