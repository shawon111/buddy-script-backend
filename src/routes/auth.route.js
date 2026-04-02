const express = require("express");
const router = express.Router();
const validateInput = require("../middlewares/validateInput.middleware");
const { registerSchema, loginSchema } = require("../utils/zodSchema");
const userController = require("../controllers/auth.controller");
const {userLogin, userRegistration} = userController

// User Registration
router.post('/register', validateInput(registerSchema), userRegistration)

// User Login
router.post('/login', validateInput(loginSchema), userLogin)

module.exports = router;