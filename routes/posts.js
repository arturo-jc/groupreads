const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addPost, updatePost, deletePost } = require("../controllers/posts");
const { authenticate, isPostAuthor, isGroupMember, validatePost } = require("../middleware");

// api/groups/:groupId/books/:bookId/posts

router.use(authenticate, catchAsync(isGroupMember))

router.route("/")
    .get(catchAsync(index))
    .post(validatePost, catchAsync(addPost))

router.route("/:postId")
    .all(catchAsync(isPostAuthor))
    .put(validatePost, catchAsync(updatePost))
    .delete(catchAsync(deletePost))

module.exports = router;