const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addBook, showBook, updateBook, deleteBook } = require("../controllers/books");

// Route route: api/books

router.post("/", catchAsync(addBook))

router.route("/:bookId")
    .get(catchAsync(showBook))
    .put(catchAsync(updateBook))
    .delete(catchAsync(deleteBook))

module.exports = router;