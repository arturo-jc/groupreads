const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addBookmark, updateBookmark, deleteBookmark } = require("../controllers/bookmarks");
const { authenticate } = require("../middleware");

// api/groups/:groupId/books/:bookId/bookmarks

router.route("/")
    .get(authenticate, catchAsync(index))
    .post(authenticate, catchAsync(addBookmark))

router.route("/:bookmarkId")
    .put(authenticate, catchAsync(updateBookmark))
    .delete(authenticate, catchAsync(deleteBookmark))

module.exports = router;