const express = require("express");
const router = express.Router();
const validateInput = require("../middlewares/validateInput.middleware");
const { registerSchema, loginSchema } = require("../utils/zodSchema");
const userController = require("../controllers/auth.controller");
const {userLogin, userRegistration, refreshAccessToken, getUserDetails} = userController

// User Registration
router.post('/register', validateInput(registerSchema), userRegistration)

// User Login
router.post('/login', validateInput(loginSchema), userLogin)

// Get User Details
router.get('/me', getUserDetails)

// Refresh Access Token
router.post('/refresh-token', refreshAccessToken)

module.exports = router;