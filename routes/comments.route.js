const commentRoute = require("express").Router();
const commentController = require("../controllers/comments.controller");

//CREATE COMMENT
commentRoute.post("/", commentController.createComment);

//UPDATE COMMENTS ON A POST
commentRoute.put("/:commentId", commentController.editComment);

//DELETE COMMENT ON A POST
commentRoute.delete("/:commentId", commentController.deleteComment);

// //GET COMMENT ON A POST
// commentRoute.delete("/:commentId/post", commentController.getCommentOnPost);

module.exports = commentRoute;
