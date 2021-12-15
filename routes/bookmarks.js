const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addBookmark, updateBookmark, deleteBookmark } = require("../controllers/bookmarks");
const { authenticate, ownsBookmark, isGroupMember, validateBookmark } = require("../middleware");

// api/groups/:groupId/books/:bookId/bookmarks

router.route("/")
    .get(authenticate, catchAsync(isGroupMember), catchAsync(index))
    .post(authenticate, catchAsync(validateBookmark), catchAsync(isGroupMember), catchAsync(addBookmark))

router.route("/:bookmarkId")
    .put(authenticate, catchAsync(validateBookmark), catchAsync(isGroupMember), catchAsync(ownsBookmark), catchAsync(updateBookmark))
    .delete(authenticate, catchAsync(isGroupMember), catchAsync(ownsBookmark), catchAsync(deleteBookmark))

module.exports = router;