const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { index, createGroup, findGroup, deleteGroup, sendRequest, handleRequest, leaveGroup } = require("../controllers/groups");
const { authenticate, validateGroup, isGroupMember, isOnlyGroupMember } = require("../middleware");

router.use(authenticate)

// api/groups

router.route("/")
    .get(catchAsync(index))
    .post(validateGroup, catchAsync(createGroup));

// api/groups/:groupId
router.route("/:groupId")
    .get(catchAsync(findGroup))
    .delete(catchAsync(isOnlyGroupMember), catchAsync(deleteGroup))

// api/groups/:groupId/send-request
router.put("/:groupId/request", catchAsync(sendRequest))

// api/groups/:groupId/leave
router.put("/:groupId/leave", catchAsync(leaveGroup))

// api/groups/:groupId/:action
router.put("/:groupId/:action", catchAsync(isGroupMember), catchAsync(handleRequest))

module.exports = router;