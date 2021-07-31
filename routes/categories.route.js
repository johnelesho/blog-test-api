const CategoryRoute = require("express").Router();
const CategoryModel = require("../models/Category.model");

router.post("/", async (req, res) => {
  const newCat = new Category(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json({
      message: "New Category Added",
      error: false,
      data: savedCat,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
});

router.get("/", async (req, res) => {
  try {
    const cats = await Category.find();
    res.status(200).json({
      message: "Category",
      error: false,
      data: cats,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
});

module.exports = router;
