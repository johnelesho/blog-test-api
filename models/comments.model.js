const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    postId: {
      type: String,
      required: [true, "Comment must be associated to a Post"],
    },
    author: {
      type: String,
      required: [true, "Comments must have an author"],
    },
    body: {
      type: String,
      required: [true, "Comments must have a body"],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Comment", CommentSchema);
