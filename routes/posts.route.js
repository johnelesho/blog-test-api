const postRoute = require("express").Router();
const postController = require("../controllers/posts.controller");
const { protect } = require("../middlewares/auths.middleware");

postRoute
  .route("/")
  .post(protect, postController.createPost)
  .get(postController.getAllPost);

//CREATE POST
// postRoute.post("/", protect, postController.createPost);

//GET ALL POSTS
// postRoute.get("/", postController.getAllPost);

postRoute
  .route("/:id")
  .get(postController.getSinglePost)
  .put(protect, postController.updatePost)
  .delete(protect, postController.deletePost);

//UPDATE POST
// postRoute.put("/:id", protect, postController.updatePost);

//GET A SINGLE POST
// postRoute.get("/:id", postController.getSinglePost);

//DELETE POST
// postRoute.delete("/:id", protect, postController.deletePost);

//UPDATE POST - Add category
postRoute.put("/:id/category", protect, postController.addCategory);

// //Add Comment
// postRoute.post("/:id/comments", postController.createComment);

//Get all Comments on Post
postRoute.get("/:postId/comments", postController.getAllCommentOnPost);

//Get a single Comment on Post
postRoute.get(
  "/:postId/comments/:commentId",
  postController.getASingleCommentOnPost
);

// //Edit a Comment
// postRoute.put("/:postId/comments/:commentId", postController.editComment);

module.exports = postRoute;
