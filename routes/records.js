const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addRecord, showRecord, updateRecord, deleteRecord } = require("../controllers/records");
const { authenticate } = require("../middleware");

// api/groups/:groupId/records

router.route("/")
    .get(authenticate, catchAsync(index))
    .post(authenticate, catchAsync(addRecord))

router.route("/:recordId")
    .get(authenticate, catchAsync(showRecord))
    .put(authenticate, catchAsync(updateRecord))
    .delete(authenticate, catchAsync(deleteRecord))

module.exports = router;