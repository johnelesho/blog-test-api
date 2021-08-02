const mongoose = require("mongoose");
const slugify = require("slugify");
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

PostSchema.pre("save", function (next) {
  this.slug = slugify(this.title, { lower: true });
  next();
});

PostSchema.pre("remove", async function (next) {
  console.log(`Comments being removed from Post ${this._id}`);
  await this.model("Comment").deleteMany({ postId: this._id });
  next();
});
module.exports = mongoose.model("Post", PostSchema);
