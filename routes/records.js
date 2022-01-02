const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addRecord, showRecord, deleteRecord } = require("../controllers/records");
const { authenticate, isGroupMember, validateRecord, ownsRecord } = require("../middleware");

// api/groups/:groupId/records
router.use(authenticate, catchAsync(isGroupMember))

router.route("/")
    .get(catchAsync(index))
    .post(validateRecord, catchAsync(addRecord))

router.route("/:recordId")
    .get(catchAsync(showRecord))
    .delete(catchAsync(ownsRecord), catchAsync(deleteRecord))

module.exports = router;