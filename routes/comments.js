const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addComment, updateComment, deleteComment } = require("../controllers/comments")

// api/groups/:groupId/books/:bookId/posts/:postId/comments

router.route("/")
    .get(catchAsync(index))
    .post(catchAsync(addComment))

router.route("/:commentId")
    .put(catchAsync(updateComment))
    .delete(catchAsync(deleteComment))

module.exports = router;