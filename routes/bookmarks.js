const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addBookmark, updateBookmark, deleteBookmark } = require("../controllers/bookmarks")

// api/groups/:groupId/books/:bookId/bookmarks

router.route("/")
    .get(catchAsync(index))
    .post(catchAsync(addBookmark))

router.route("/:bookmarkId")
    .put(catchAsync(updateBookmark))
    .delete(catchAsync(deleteBookmark))

module.exports = router;