const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { registerUser } = require("../controllers/users");
const { validateRegister } = require("../middleware");

// api/users

router.post("/", catchAsync(validateRegister), catchAsync(registerUser));

module.exports = router;