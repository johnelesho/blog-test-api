const CommentModel = require("../models/comments.model");
const PostModel = require("../models/Post.model");
const ResponseError = require("../utils/responseError.utils");

// @desc      Add Comment to a post
// @route     POST /api/v1/comments
// @access    Private
exports.createComment = async (req, res, next) => {
  const comment = new CommentModel(req.body);
  try {
    const savedComment = await comment.save();
    res.status(200).json({
      message: `New Comment Added to post`,
      success: true,
      data: savedComment,
    });
  } catch (err) {
    next(err);
  }
};

// @desc      Delete comments
// @route     DELETE /api/v1/comment/:commentId
// @access    Private
exports.deleteComment = async (req, res, next) => {
  try {
    await CommentModel.findByIdAndDelete(req.params.commentId);
    res.status(200).json({
      message: "Comment has been deleted...",
      success: true,
    });
  } catch (err) {
    next(err);
  }
};

// @desc      Edit comments
// @route     PUT /api/v1/comment/:commentId
// @access    Private
exports.editComment = async (req, res, next) => {
  try {
    const updatedComment = await CommentModel.findByIdAndUpdate(
      req.params.commentId,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json({
      message: "Comment has been updated...",
      success: true,
      data: updatedComment,
    });
  } catch (err) {
    next(err);
  }
};
