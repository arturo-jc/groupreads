const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addComment, updateComment, deleteComment } = require("../controllers/comments");
const { authenticate } = require("../middleware");

// api/groups/:groupId/books/:bookId/posts/:postId/comments

router.route("/")
    .get(authenticate, catchAsync(index))
    .post(authenticate, catchAsync(addComment))

router.route("/:commentId")
    .put(authenticate, catchAsync(updateComment))
    .delete(authenticate, catchAsync(deleteComment))

module.exports = router;