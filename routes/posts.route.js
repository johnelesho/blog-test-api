const postRoute = require("express").Router();
const postController = require("../controllers/posts.controller");

//CREATE POST
postRoute.post("/", postController.createPost);

//GET ALL POSTS
postRoute.get("/", postController.getAllPost);

//Get all Comments on Post
postRoute.get("/:postId/comments", postController.getAllCommentOnPost);

//UPDATE POST
postRoute.put("/:id", postController.updatePost);

//DELETE POST
postRoute.delete("/:id", postController.deletePost);

//GET A SINGLE POST
postRoute.get("/:id", postController.getSinglePost);

// //Add Comment
// postRoute.post("/:id/comments", postController.createComment);

//Get a single Comment on Post
postRoute.get(
  "/:postId/comments/:commentId",
  postController.getASingleCommentOnPost
);

// //Edit a Comment
// postRoute.put("/:postId/comments/:commentId", postController.editComment);

module.exports = postRoute;
