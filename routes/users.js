const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { registerUser, changePassword } = require("../controllers/users");
const { validateRegister, authenticate } = require("../middleware");

// api/users

router.post("/", catchAsync(validateRegister), catchAsync(registerUser));
router.put("/:userId", authenticate, catchAsync(changePassword));

module.exports = router;