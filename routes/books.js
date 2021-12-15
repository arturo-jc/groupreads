const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { addBook, showBook, updateBook, deleteBook } = require("../controllers/books");
const { authenticate, ownsBook, validateBook } = require("../middleware");

// Route route: api/books

router.post("/", authenticate, validateBook, catchAsync(addBook))

router.route("/:bookId")
    .get(catchAsync(showBook))
    .put(authenticate, validateBook, catchAsync(ownsBook), catchAsync(updateBook))
    .delete(authenticate, catchAsync(ownsBook), catchAsync(deleteBook))

module.exports = router;