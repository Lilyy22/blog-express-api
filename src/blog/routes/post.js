const router = require("express").Router();
const {
  createPost,
  addCommentToPost,
  getAllPosts,
  getPostById,
  deleteCommentToPost,
} = require("../controllers/postController");
const isAuthenticated = require("../../auth/middleware/authMiddleware");

router.post("/", createPost);
router.post("/:id/comment", isAuthenticated, addCommentToPost);
router.get("/:id", isAuthenticated, getPostById);
router.get("/", getAllPosts);
router.delete(
  "/:postid/comment/:commentid",
  isAuthenticated,
  deleteCommentToPost
);

module.exports = router;
