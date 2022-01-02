const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addMarker, updateMarker, deleteMarker } = require("../controllers/markers")
const { authenticate, isGroupMember, validateMarker } = require("../middleware");

// api/groups/:groupId/records/:recordId/markers

router.use(authenticate, catchAsync(isGroupMember))

router.route("/")
    .get(catchAsync(index))
    .post(catchAsync(validateMarker), catchAsync(addMarker))

router.route("/:markerId")
    .put(catchAsync(validateMarker), catchAsync(updateMarker))
    .delete(catchAsync(deleteMarker))

module.exports = router;