const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addMarker, updateMarker, deleteMarker } = require("../controllers/markers")
const { authenticate, isGroupMember } = require("../middleware");

// api/groups/:groupId/records/:recordId/markers

router.route("/")
    .get(authenticate, catchAsync(isGroupMember), catchAsync(index))
    .post(authenticate, catchAsync(isGroupMember), catchAsync(addMarker))

router.route("/:markerId")
    .put(authenticate, catchAsync(isGroupMember), catchAsync(updateMarker))
    .delete(authenticate, catchAsync(isGroupMember), catchAsync(deleteMarker))

module.exports = router;