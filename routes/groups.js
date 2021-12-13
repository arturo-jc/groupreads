const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { createGroup } = require("../controllers/groups")

// api/groups

router.post("/", catchAsync(createGroup))

module.exports = router;