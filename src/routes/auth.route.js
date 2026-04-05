const express = require("express");
const router = express.Router();
const validateInput = require("../middlewares/validateInput.middleware");
const { registerSchema, loginSchema } = require("../utils/zodSchema");
const userController = require("../controllers/auth.controller");
const authMiddleware = require("../middlewares/auth.middleware");
const {userLogin, userRegistration, refreshAccessToken, getUserDetails} = userController

// User Registration
router.post('/register', validateInput(registerSchema), userRegistration)

// User Login
router.post('/login', validateInput(loginSchema), userLogin)

// Get User Details
router.get('/me', authMiddleware, getUserDetails)

// Refresh Access Token
router.post('/refresh-token', refreshAccessToken)

module.exports = router;