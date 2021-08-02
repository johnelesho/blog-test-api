const CategoryModel = require("../models/Category.model");
const ResponseError = require("../utils/responseError.utils");

// @desc      Create Category
// @route     POST /api/v1/category/
// @access    Private
exports.createCategory = async (req, res, next) => {
  const newCat = new CategoryModel(req.body);
  try {
    const savedCat = await newCat.save();
    res.status(200).json({
      message: "New Category Added",
      success: true,
      data: savedCat,
    });
  } catch (err) {
    next(err);
  }
};

// @desc      Get all category
// @route     GET /api/v1/category
// @access    Public
exports.allCategory = async (req, res, next) => {
  try {
    const cats = await CategoryModel.find();
    res.status(200).json({
      message: "Category",
      success: true,
      data: cats,
    });
  } catch (err) {
    next(err);
  }
};
