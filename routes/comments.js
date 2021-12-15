const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addComment, updateComment, deleteComment } = require("../controllers/comments");
const { authenticate, isCommentAuthor, isGroupMember, validateComment } = require("../middleware");

// api/groups/:groupId/books/:bookId/posts/:postId/comments

router.route("/")
    .get(authenticate, catchAsync(isGroupMember), catchAsync(index))
    .post(authenticate, validateComment, catchAsync(isGroupMember), catchAsync(addComment))

router.route("/:commentId")
    .put(authenticate, validateComment, catchAsync(isGroupMember), catchAsync(isCommentAuthor), catchAsync(updateComment))
    .delete(authenticate, catchAsync(isGroupMember), catchAsync(isCommentAuthor), catchAsync(deleteComment))

module.exports = router;