const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, createGroup, findGroup, deleteGroup } = require("../controllers/groups");
const { authenticate, validateGroup } = require("../middleware");

// api/groups

router.route("/")
    .get(authenticate, catchAsync(index))
    .post(authenticate, validateGroup, catchAsync(createGroup));

// Add middleware to DELETE that checks whether user is only member of group
// api/groups
router.route("/:groupId")
    .get(authenticate, catchAsync(findGroup))
    .delete(authenticate, catchAsync(deleteGroup))

module.exports = router;