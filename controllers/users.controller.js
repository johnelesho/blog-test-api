const UserModel = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const PostModel = require("../models/Post.model.js");
const ResponseError = require("../utils/responseError.utils.js");

// @desc      Update User
// @route     POST /api/v1/user/:id
// @access    Private
exports.updateUser = async (req, res, next) => {
  let { id, password } = req.body;
  if (id === req.params.id) {
    if (password) {
      const salt = await bcrypt.genSalt(10);
      password = await bcrypt.hash(password, salt);
    }
    try {
      const updatedUser = await UserModel.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body,
        },
        { new: true }
      );
      // const { password, ...others } = updatedUser._doc;
      res.status(200).json({
        message: "Successfully Updated the user record",
        success: true,
        data: updatedUser,
      });
    } catch (err) {
      next(err);
    }
  } else {
    return next(new ResponseError("You can update only your account", 401));
  }
};

// @desc      Create User
// @route     POST /api/v1/user/:id
// @access    Private
exports.deleteUser = async (req, res, next) => {
  let { id } = req.body;
  if (id === req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);

      try {
        await PostModel.deleteMany({ username: user.username });

        await UserModel.findByIdAndDelete(req.params.id);
        // const { password, ...others } = deletedUser._doc;
        res.status(200).json({
          message: "Successfully deleted the user record",
          success: true,
        });
      } catch (err) {
        next(err);
      }
    } catch (err) {
      next(err);
    }
  } else {
    return next(new ResponseError("You can delete only your account", 401));
  }
};

// @desc      Get User
// @route     Get /api/v1/user/:id
// @access    public
exports.getUser = async (req, res, next) => {
  //   console.log(req.params);
  try {
    const user = await UserModel.findById(req.params.id);
    console.log(user);
    // const { password, ...others } = user._doc;
    res.status(203).json({
      message: "User record exist",
      success: true,
      data: user,
    });
  } catch (err) {
    next(err);
  }
};

// @desc      Get all users
// @route     POST /api/v1/user/
// @access    public
exports.getAllUser = async (req, res, next) => {
  //   console.log(req.params);
  try {
    let users = await UserModel.find();
    console.log(users);
    // users = users.map((blogUser) => {
    //   const { password, ...others } = blogUser._doc;
    //   return others;
    // });

    res.status(203).json({
      message: "All Users",
      success: true,
      data: users,
    });
  } catch (err) {
    next(err);
  }
};
