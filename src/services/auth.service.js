const jwt = require('jsonwebtoken');
const User = require('../models/auth.model');
const bcrypt = require('bcryptjs');

// Token Generation
const generateToken = (payload, expires) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: expires });
}

// Token Verification
const verifyToken = (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
}

// Access and Refresh Token Generation
const generateAccessToken = (payload) => {
    return generateToken(payload, '15m');
}

const generateRefreshToken = (payload) => {
    return generateToken(payload, '7d');
}

// Token Refreshing
const refreshTokens = async (refreshToken) => {
    try {
        const decoded = verifyToken(refreshToken);
        // check user exists
        const user = await User.findById(decoded.id);
        if (!user) {
            throw new Error('User not found');
        }

        return generateAccessToken({ id: decoded.id });
    } catch (error) {
        throw new Error('Invalid or expired refresh token');
    }
}


// Token Decoding
const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        throw new Error('Invalid token');
    }
}

// Password Hashing
const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
}

// User Registration
const registerUser = async (user) => {
    const { firstName, lastName, email, password } = user;
    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        throw new Error('Email already in use');
    }
    // Hash password and create user
    const hashedPassword = await hashPassword(password);
    const createUser = await User.create({ firstName, lastName, email, password: hashedPassword });
    if (!createUser) {
        throw new Error('User registration failed');
    }
    // Generate tokens
    const accessToken = generateAccessToken({ id: createUser._id });
    const refreshToken = generateRefreshToken({ id: createUser._id });
    const userInfo = {
        data: {
            firstName: createUser.firstName,
            lastName: createUser.lastName,
            _id: createUser._id
        },
        tokens: {
            accessToken,
            refreshToken
        }
    }
    return userInfo;
}

// User Login
const loginUser = async (email, password) => {
    const user = await User.findOne({ email }).select({ password: 1, firstName: 1, lastName: 1 });
    if (!user) {
        throw new Error('User not found');
    }
    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    // Generate tokens
    const accessToken = generateAccessToken({ id: user._id });
    const refreshToken = generateRefreshToken({ id: user._id });
    const userInfo = {
        data: {
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        },
        tokens: {
            accessToken,
            refreshToken
        }
    }
    return userInfo;
}

module.exports = {
    generateAccessToken,
    generateRefreshToken,
    verifyToken,
    decodeToken,
    refreshTokens,
    registerUser,
    loginUser
};
