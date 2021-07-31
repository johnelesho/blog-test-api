const postRoute = require("express").postRoute();
const PostModel = require("../models/Post.model");

//CREATE POST
postRoute.post("/", async (req, res) => {
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
});

//UPDATE POST
postRoute.put("/:id", async (req, res) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.username === req.body.username) {
      try {
        const updatedPost = await Post.findByIdAndUpdate(
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
});

//DELETE POST
postRoute.delete("/:id", async (req, res) => {
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
});

//GET POST
postRoute.get("/:id", async (req, res) => {
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
});

//GET ALL POSTS
postRoute.get("/", async (req, res) => {
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
});

module.exports = postRoute;
