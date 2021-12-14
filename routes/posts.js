const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addPost, updatePost, deletePost } = require("../controllers/posts");
const { authenticate } = require("../middleware");
// api/groups/:groupId/books/:bookId/posts

router.route("/")
    .get(authenticate, catchAsync(index))
    .post(authenticate, catchAsync(addPost))

router.route("/:postId")
    .put(authenticate, catchAsync(updatePost))
    .delete(authenticate, catchAsync(deletePost))

module.exports = router;