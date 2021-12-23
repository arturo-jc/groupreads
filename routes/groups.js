const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, createGroup, findGroup } = require("../controllers/groups");
const { authenticate, validateGroup } = require("../middleware");

// api/groups

router.route("/")
    .get(authenticate, catchAsync(index))
    .post(authenticate, validateGroup, catchAsync(createGroup));

router.get("/:groupId", authenticate, catchAsync(findGroup))

module.exports = router;