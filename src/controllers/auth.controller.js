const { registerUser, loginUser } = require("../services/auth.service");
const catchAsync = require("../utils/catchAsync");
const responseFn = require("../utils/responseFn");
const setAuthCookie = require("../utils/setAuthCookie");

// Register User
const userRegistration = catchAsync(async (req, res) => {
    const userdata = req.body;
    const user = await registerUser(userdata);
    // Set cookies for access and refresh tokens
    setAuthCookie(res, 'refreshToken', user.tokens, 7 * 24 * 60 * 60 * 1000);
    setAuthCookie(res, 'accessToken', user.tokens, 15 * 60 * 1000);
    responseFn(res, 201, true, user.data, "User registered successfully");
});

// Login User
const userLogin = catchAsync(async (req, res) => {
        const { email, password } = req.body;
        const userInfo = await loginUser(email, password);

        // Set cookies for access and refresh tokens
        setAuthCookie(res, 'refreshToken', userInfo.tokens, 7 * 24 * 60 * 60 * 1000);
        setAuthCookie(res, 'accessToken', userInfo.tokens, 15 * 60 * 1000);

        responseFn(res, 200, true, userInfo.data, "User logged in successfully");
});

module.exports = {
    userRegistration,
    userLogin
};
