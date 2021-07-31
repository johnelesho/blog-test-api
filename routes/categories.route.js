const CategoryRoute = require("express").Router();
const categoryController = require("../controllers/category.controllers");

router.post("/", categoryController.createCategory);

router.get("/", categoryController.allCategory);

module.exports = router;
