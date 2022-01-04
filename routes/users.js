const express = require("express");
const router = express.Router({ mergeParams: true });
const catchAsync = require("../utils/catchAsync");
const { registerUser, changePassword, updatePicture, deleteAccount } = require("../controllers/users");
const { validateRegister, authenticate, isPasswordValid, ownsAccount } = require("../middleware");
const { storage } = require("../cloudinary")
const multer = require("multer");
const upload = multer({ storage });

// // api/users

router.post("/", catchAsync(validateRegister), catchAsync(registerUser));
router.put("/:userId/change-password", authenticate, ownsAccount, catchAsync(isPasswordValid), catchAsync(changePassword));
router.put("/:userId/update-picture", authenticate, ownsAccount, upload.single("file"), catchAsync(updatePicture))
router.delete("/:userId", authenticate, ownsAccount, catchAsync(isPasswordValid), catchAsync(deleteAccount))

module.exports = router;