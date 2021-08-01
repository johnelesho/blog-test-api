const mongoose = require("mongoose");
const PostSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Post must have a title"],
      unique: true,
    },
    slug: {
      type: String,
    },
    body: {
      type: String,
      required: [true, "post must have a body"],
    },
    photo: {
      type: String,
      required: false,
    },
    author: {
      type: String,
      required: [true, "Post must have an author"],
    },
    categories: {
      type: Array,
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", PostSchema);
