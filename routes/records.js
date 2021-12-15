const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addRecord, showRecord, updateRecord, deleteRecord } = require("../controllers/records");
const { authenticate, isGroupMember, validateRecord } = require("../middleware");

// api/groups/:groupId/records

router.route("/")
    .get(authenticate, catchAsync(isGroupMember), catchAsync(index))
    .post(authenticate, validateRecord, catchAsync(isGroupMember), catchAsync(addRecord))

router.route("/:recordId")
    .get(authenticate, catchAsync(isGroupMember), catchAsync(showRecord))
    .put(authenticate, validateRecord, catchAsync(isGroupMember), catchAsync(updateRecord))
    .delete(authenticate, catchAsync(isGroupMember), catchAsync(deleteRecord))

module.exports = router;