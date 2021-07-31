const authRoute = require("express").Router();
const authController = require("../controllers/auths.controllers");

// Register
authRoute.post("/register", authController.registerUser);

// Login
authRoute.post("/login", authController.loginUser);

module.exports = authRoute;
