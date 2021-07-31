const CategoryModel = require("../models/Category.model");

// @desc      Create Category
// @route     POST /api/v1/category/
// @access    Private
exports.createCategory = async (req, res) => {
  const newCat = new CategoryModel(req.body);
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
};

// @desc      Login user
// @route     POST /api/v1/category
// @access    Public
exports.allCategory = async (req, res) => {
  try {
    const cats = await CategoryModel.find();
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
};
