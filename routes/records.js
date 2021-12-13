const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addRecord, showRecord, updateRecord, deleteRecord } = require("../controllers/records");

// api/groups/:groupId/records

router.route("/")
    .get(catchAsync(index))
    .post(catchAsync(addRecord))

router.route("/:recordId")
    .get(catchAsync(showRecord))
    .put(catchAsync(updateRecord))
    .delete(catchAsync(deleteRecord))

module.exports = router;