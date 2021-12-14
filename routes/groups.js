const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { createGroup } = require("../controllers/groups");
const { authenticate } = require("../middleware");

// api/groups

router.post("/", authenticate, catchAsync(createGroup));

module.exports = router;