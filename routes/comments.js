const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addComment, updateComment, deleteComment } = require("../controllers/comments");
const { authenticate, isCommentAuthor, isGroupMember, validateComment } = require("../middleware");

// api/groups/:groupId/books/:bookId/posts/:postId/comments

router.use(authenticate, catchAsync(isGroupMember))

router.route("/")
    .get(catchAsync(index))
    .post(validateComment, catchAsync(addComment))

router.route("/:commentId")
    .all(catchAsync(isCommentAuthor))
    .put(validateComment, catchAsync(updateComment))
    .delete(catchAsync(deleteComment))

module.exports = router;