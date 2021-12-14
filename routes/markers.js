const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, addMarker, updateMarker, deleteMarker } = require("../controllers/markers")
const { authenticate } = require("../middleware");

// api/groups/:groupId/records/:recordId/markers

router.route("/")
    .get(authenticate, catchAsync(index))
    .post(authenticate, catchAsync(addMarker))

router.route("/:markerId")
    .put(authenticate, catchAsync(updateMarker))
    .delete(authenticate, catchAsync(deleteMarker))

module.exports = router;