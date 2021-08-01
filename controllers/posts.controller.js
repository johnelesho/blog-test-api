const UserModel = require("../models/User.model.js");
const bcrypt = require("bcrypt");
const PostModel = require("../models/Post.model.js");

// @desc      Create Posts
// @route     POST /api/v1/post/
// @access    Private
exports.createPost = async (req, res) => {
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      message: "New Post Added",
      error: false,
      data: savedPost,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
};

// @desc      Update Post
// @route     PUT /api/v1/posts/:id
// @access    Private
exports.updatePost = async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await PostModel.findByIdAndUpdate(
          req.params.id,
          {
            $set: req.body,
          },
          { new: true }
        );
        res.status(203).json({
          message: "Post Updated",
          error: false,
          data: updatedPost,
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
        message: "Post cannot be found",
        error: true,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
};

// @desc      Add comment to a Post
// @route     PUT /api/v1/posts/:id/comments
// @access    Public
exports.createComment = async (req, res) => {
  //   const { author, body } = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: req.body },
      },
      { new: true }
    );
    res.status(203).json({
      message: "Comment Added",
      error: false,
      data: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
};

// @desc      Update Post
// @route     PUT /api/v1/posts/:id/comments
// @access    Public
exports.createComment = async (req, res) => {
  //   const { author, body } = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        $push: { comments: req.body },
      },
      { new: true }
    );
    res.status(203).json({
      message: "Comment Added",
      error: false,
      data: updatedPost,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
};

// @desc      Delete Posts
// @route     DELETE /api/v1/posts/:id
// @access    Private
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        await post.delete();
        res.status(200).json({
          message: "Post has been deleted...",
          error: false,
          data: null,
        });
      } catch (err) {
        res.status(500).json({
          message: err,
          error: true,
          data: others,
        });
      }
    } else {
      res.status(401).json({
        message: "You can delete only your own post",
        error: true,
        data: null,
      });
    }
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
};

// @desc      Get a single Posts
// @route     POST /api/v1/post/:id
// @access    Public
exports.getSinglePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      message: "Post Found",
      error: false,
      data: post,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
};

// @desc      Get all Post
// @route     POST /api/v1/post/
// @access    Public
exports.getAllPost = async (req, res) => {
  const username = req.query.user;
  const catName = req.query.cat;
  try {
    let posts;
    if (username) {
      posts = await Post.find({ username });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await Post.find();
    }
    res.status(200).json({
      message: "All Posts matching query",
      error: false,
      data: posts,
    });
  } catch (err) {
    res.status(500).json({
      message: err,
      error: true,
      data: null,
    });
  }
};
