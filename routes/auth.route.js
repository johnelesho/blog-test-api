const authRoute = require("express").Router();
const {
  registerUser,
  loggedInUser,
  loginUser,
} = require("../controllers/auths.controllers");
const { protect } = require("../middlewares/auths.middleware");

// Register
authRoute.post("/register", registerUser);

// Login
authRoute.post("/login", loginUser);

// Login
authRoute.get("/user", protect, loggedInUser);

module.exports = authRoute;
