const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, createGroup } = require("../controllers/groups");
const { authenticate, validateGroup } = require("../middleware");

// api/groups

router.route("/")
    .get(authenticate, catchAsync(index))
    .post(authenticate, validateGroup, catchAsync(createGroup));

module.exports = router;