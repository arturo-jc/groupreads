const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { getCurrentUser, getToken } = require("../controllers/auth");
const { authenticate, validateLogin } = require("../middleware")

router.route("/")
    .get(authenticate, catchAsync(getCurrentUser))
    .post(catchAsync(validateLogin), catchAsync(getToken))

module.exports = router;