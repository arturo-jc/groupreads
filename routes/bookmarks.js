const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addBookmark, updateBookmark, deleteBookmark } = require("../controllers/bookmarks");
const { authenticate, ownsBookmark, isGroupMember, validateBookmark } = require("../middleware");

// api/groups/:groupId/books/:bookId/bookmarks

router.use(authenticate, catchAsync(isGroupMember))

router.route("/")
    .get(catchAsync(index))
    .post(catchAsync(validateBookmark), catchAsync(addBookmark))

router.route("/:bookmarkId")
    .all(catchAsync(ownsBookmark))
    .put(catchAsync(validateBookmark), catchAsync(updateBookmark))
    .delete(catchAsync(deleteBookmark))

module.exports = router;