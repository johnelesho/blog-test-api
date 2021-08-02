const userRoute = require("express").Router();
const userController = require("../controllers/users.controller");
const { protect } = require("../middlewares/auths.middleware");

// UPDATE USER
userRoute.put("/:id", protect, userController.updateUser);

// DELETE USER
userRoute.delete("/:id", protect, userController.deleteUser);

//GET USER
userRoute.get("/:id", userController.getUser);

//GET ALL USERS
userRoute.get("/", userController.getAllUser);

module.exports = userRoute;
