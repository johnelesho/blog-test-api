const userRoute = require("express").Router();
const userController = require("../controllers/users.controller");

// UPDATE USER
userRoute.put("/:id", userController.updateUser);

// DELETE USER
userRoute.delete("/:id", userController.deleteUser);

//GET USER
userRoute.get("/:id", userController.getUser);

//GET ALL USERS
userRoute.get("/", userController.getAllUser);

module.exports = userRoute;
