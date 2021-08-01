const postRoute = require("express").Router();
const postController = require("../controllers/posts.controller");

//CREATE POST
postRoute.post("/", postController.createPost);

//Add Comment
postRoute.post("/:id/comments", postController.createComment);

//UPDATE POST
postRoute.put("/:id", postController.updatePost);

//DELETE POST
postRoute.delete("/:id", postController.deletePost);

//GET A SINGLE POST
postRoute.get("/:id", postController.getSinglePost);

//GET ALL POSTS
postRoute.get("/", postController.getAllPost);

module.exports = postRoute;
