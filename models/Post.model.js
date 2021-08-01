const mongoose = require("mongoose");

const commentSchema = mongoose.Schema(
  {
    author: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
      required: false,
    },
    comments: {
      type: [commentSchema],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
