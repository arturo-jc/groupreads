const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addPost, updatePost, deletePost } = require("../controllers/posts");
const { authenticate, isPostAuthor, isGroupMember } = require("../middleware");

// api/groups/:groupId/books/:bookId/posts

router.route("/")
    .get(authenticate, catchAsync(isGroupMember), catchAsync(index))
    .post(authenticate, catchAsync(isGroupMember), catchAsync(addPost))

router.route("/:postId")
    .put(authenticate, catchAsync(isGroupMember), catchAsync(isPostAuthor), catchAsync(updatePost))
    .delete(authenticate, catchAsync(isGroupMember), catchAsync(isPostAuthor), catchAsync(deletePost))

module.exports = router;