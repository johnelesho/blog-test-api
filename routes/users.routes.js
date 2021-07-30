const userRoute = require("express").Router();
const UserModel = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const PostModel = require("../models/Post.model.js");

// UPDATE USER
userRoute.put("/:id", async (req, res) => {
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
      const { password, ...others } = updatedUser._doc;
      res.status(203).json({
        message: "Successfully Updated the user record",
        error: false,
        data: others,
      });
    } catch (err) {
      res.status(500).json({
        message: err,
        error: true,
        data: null,
      });
    }
  } else {
    res.status(401).json({
      message: "You can update only your account",
      error: true,
      data: null,
    });
  }
});

userRoute.put("/:id", async (req, res) => {
  let { id, password } = req.body;
  if (id === req.params.id) {
    try {
      const user = await UserModel.findById(req.params.id);

      try {
        await Post.deleteMany({ username: user.username });

        const deletedUser = await UserModel.findByIdAndDelete(req.params.id);
        const { password, ...others } = deletedUser._doc;
        res.status(203).json({
          message: "Successfully deleted the user record",
          error: false,
          data: others,
        });
      } catch (err) {
        res.status(500).json({
          message: err,
          error: true,
          data: null,
        });
      }
    } catch (err) {
      res.status(404).json({
        message: err,
        error: true,
        data: null,
      });
    }
  } else {
    res.status(401).json({
      message: "You can delete only your account",
      error: true,
      data: null,
    });
  }
});

//GET USER
userRoute.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(203).json({
      message: "User record exist",
      error: false,
      data: others,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
});

module.exports = userRoute;
