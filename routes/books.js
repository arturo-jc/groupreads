const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { addBook, showBook, updateBook, deleteBook } = require("../controllers/books");
const { authenticate } = require("../middleware");

// Route route: api/books

router.post("/", authenticate, catchAsync(addBook))

router.route("/:bookId")
    .get(catchAsync(showBook))
    .put(authenticate, catchAsync(updateBook))
    .delete(authenticate, catchAsync(deleteBook))

module.exports = router;