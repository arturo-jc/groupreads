const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, createGroup, findGroup, deleteGroup, sendRequest, handleRequest, leaveGroup } = require("../controllers/groups");
const { authenticate, validateGroup, isGroupMember } = require("../middleware");

// api/groups

router.route("/")
    .get(authenticate, catchAsync(index))
    .post(authenticate, validateGroup, catchAsync(createGroup));

// Add middleware to DELETE that checks whether user is only member of group
// api/groups/:groupId
router.route("/:groupId")
    .get(authenticate, catchAsync(findGroup))
    .delete(authenticate, catchAsync(deleteGroup))

// api/groups/:groupId/send-request
router.put("/:groupId/request", authenticate, catchAsync(sendRequest))

// api/groups/:groupId/leave
router.put("/:groupId/leave", authenticate, catchAsync(leaveGroup))

// api/groups/:groupId/:action
router.put("/:groupId/:action", authenticate, catchAsync(isGroupMember), catchAsync(handleRequest))

module.exports = router;