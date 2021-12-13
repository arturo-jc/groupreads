const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addMarker, updateMarker, deleteMarker } = require("../controllers/markers")

// api/groups/:groupId/records/:recordId/markers

router.route("/")
    .get(catchAsync(index))
    .post(catchAsync(addMarker))

router.route("/:bookmarkId")
    .put(catchAsync(updateMarker))
    .delete(catchAsync(deleteMarker))

module.exports = router;