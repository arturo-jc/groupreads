const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addPost, updatePost, deletePost } = require("../controllers/posts")

// api/groups/:groupId/books/:bookId/posts

router.route("/")
    .get(catchAsync(index))
    .post(catchAsync(addPost))

router.route("/:postId")
    .put(catchAsync(updatePost))
    .delete(catchAsync(deletePost))

module.exports = router;