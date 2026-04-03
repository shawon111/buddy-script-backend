const express = require('express');
const router = express.Router();
const authMiddleware = require("../middlewares/auth.middleware");

const uploadController = require("../controllers/upload.controller");
const { imageUploadsignature } = uploadController;

// get image upload signature
router.get('/image', authMiddleware, imageUploadsignature);

module.exports = router;