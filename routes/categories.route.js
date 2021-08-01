const categoryRouter = require("express").Router();
const categoryController = require("../controllers/category.controllers");

categoryRouter.post("/", categoryController.createCategory);

categoryRouter.get("/", categoryController.allCategory);

module.exports = categoryRouter;
