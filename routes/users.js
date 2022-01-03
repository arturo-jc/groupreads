const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { registerUser, changePassword, updatePicture } = require("../controllers/users");
const { validateRegister, authenticate, ownsAccount } = require("../middleware");
const { storage } = require("../cloudinary")
const multer = require("multer");
const upload = multer({ storage });

// // api/users

router.post("/", catchAsync(validateRegister), catchAsync(registerUser));
router.put("/:userId/*", authenticate, ownsAccount)
router.put("/:userId/change-password", catchAsync(changePassword));
router.put("/:userId/update-picture", upload.single("file"), catchAsync(updatePicture))

module.exports = router;