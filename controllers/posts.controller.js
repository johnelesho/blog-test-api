const PostModel = require("../models/Post.model.js");
const CommentModel = require("../models/comments.model");
const ResponseError = require("../utils/responseError.utils.js");

// @desc      Create Posts
// @route     POST /api/v1/post/
// @access    Private
exports.createPost = async (req, res, next) => {
  const newPost = new PostModel(req.body);
  try {
    const savedPost = await newPost.save();
    res.status(200).json({
      message: "New Post Added",
      error: false,
      data: savedPost,
    });
  } catch (err) {
    next(err);
  }
};

// @desc      Update Post
// @route     PUT /api/v1/posts/:id
// @access    Private
exports.updatePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.author === req.body.author) {
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
        next(err);
      }
    } else {
      return next(new ResponseError("You can not update this post", 401));
    }
  } catch (err) {
    next(err);
  }
};

/*
// @desc      Add comment to a Post
// @route     PUT /api/v1/posts/:id/comments
// @access    Public
exports.createComment = async (req, res, next) => {
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
    next(err);
  }
};


// @desc      Edit a comment
// @route     PUT /api/v1/posts/:id/comments/:id
// @access    Public
exports.editComment = async (req, res, next) => {
  const { author, body } = req.body;
  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      req.params.id,
      {
        "comments.author": author,
      },
      { $set: { "comments.$.body": body } },
      { new: true }
    );
    res.status(203).json({
      message: "Comment Added",
      error: false,
      data: updatedPost,
    });
  } catch (err) {
    next(err);
  }
};

*/

// @desc      Delete Posts
// @route     DELETE /api/v1/posts/:id
// @access    Private
exports.deletePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);
    if (post.author === req.body.author) {
      try {
        await post.delete();
        await CommentModel.deleteMany({ postId: req.params.id });

        res.status(200).json({
          message: "Post has been deleted...",
          error: false,
          data: null,
        });
      } catch (err) {
        next(err);
      }
    } else {
      return next(new ResponseError("You can not delete this post", 401));
    }
  } catch (err) {
    next(err);
  }
};

// @desc      Get a single Posts
// @route     POST /api/v1/post/:id
// @access    Public
exports.getSinglePost = async (req, res, next) => {
  try {
    const post = await PostModel.findById(req.params.id);

    if (post.length > 0) {
      res.status(200).json({
        message: "Post Found",
        error: false,
        data: post,
      });
    } else {
      return next(new ResponseError("No post found for user", 404));
    }
  } catch (err) {
    next(err);
  }
};

// @desc      Get all Post
// @route     Get /api/v1/posts/
// @access    Public
exports.getAllPost = async (req, res, next) => {
  const author = req.query.author;
  const catName = req.query.cat;
  try {
    let posts;
    if (author) {
      posts = await PostModel.find({ author });
    } else if (catName) {
      posts = await Post.find({
        categories: {
          $in: [catName],
        },
      });
    } else {
      posts = await PostModel.find();
    }
    if (posts.length > 0) {
      res.status(200).json({
        message: "All Post Matching query",
        error: false,
        data: posts,
      });
    } else {
      return next(new ResponseError("No post matching query was found", 404));
    }
  } catch (err) {
    next(err);
  }
};

// @desc      Get all Comments on a post
// @route     POST /api/v1/posts/:postId/comments
// @access    Public
exports.getAllCommentOnPost = async (req, res, next) => {
  try {
    const comments = await CommentModel.find({ postId: req.params.postId });
    console.log(comments);
    if (comments.length > 0) {
      res.status(200).json({
        message: `Comments on post with id ${req.params.postId}`,
        error: false,
        data: comments,
      });
    } else {
      return next(new ResponseError("No Comments found for post", 404));
    }
  } catch (err) {
    next(err);
  }
};

// @desc      Get a single Comment on a post
// @route     Get /api/v1/posts/:postId/comments/:commentId
// @access    Public
exports.getASingleCommentOnPost = async (req, res, next) => {
  try {
    const comments = await CommentModel.find({
      _id: req.params.commentId,
      postId: req.params.postId,
    });
    // console.log(comments);
    // console.log(comments.length);
    if (comments.length > 0) {
      res.status(200).json({
        message: `Comment found`,
        error: false,
        data: comments,
      });
    } else {
      return next(new ResponseError("Comment not found", 404));
    }
  } catch (err) {
    next(err);
  }
};
