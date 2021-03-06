const mongoose = require("mongoose");

const CommentSchema = mongoose.Schema(
  {
    post: {
      type: mongoose.Schema.ObjectId,
      ref: "Post",
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
